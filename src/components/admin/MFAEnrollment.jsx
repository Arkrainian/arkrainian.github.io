import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { ClipboardCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MFAEnrollment = ({ onComplete }) => {
    const { verifyOTP } = useAuth();
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [factorId, setFactorId] = useState('');

    const [status, setStatus] = useState('');

    const startEnrollment = async () => {
        setLoading(true);
        setError('');
        setStatus('Connecting to Supabase...');
        console.log("MFAEnrollment: Requesting QR code...");

        try {
            // 1. HAPPY PATH: Try to enroll immediately
            // This bypasses the blocking listFactors call that causes hangs
            const uniqueName = `Admin-${Date.now()}`;
            const { data, error: enrollError } = await supabase.auth.mfa.enroll({
                factorType: 'totp',
                friendlyName: uniqueName
            });

            // 2. ERROR RECOVERY: If factor already exists, purge and retry
            if (enrollError) {
                if (enrollError.message.includes("already exists") || enrollError.status === 422) {
                    setStatus('Resolving previous setup...');
                    console.log("MFAEnrollment: Conflict detected, cleaning up factors...");
                    const { data: listData } = await supabase.auth.mfa.listFactors();
                    if (listData?.all) {
                        for (const f of listData.all) {
                            await supabase.auth.mfa.unenroll({ factorId: f.id });
                        }

                        // Retry enrollment after cleanup
                        setStatus('Retrying setup...');
                        const retry = await supabase.auth.mfa.enroll({
                            factorType: 'totp',
                            friendlyName: uniqueName
                        });
                        if (retry.error) throw retry.error;

                        setFactorId(retry.data.id);
                        setQrCode(retry.data.totp.qr_code);
                        setSecret(retry.data.totp.secret);
                    } else {
                        throw enrollError;
                    }
                } else if (enrollError.status === 403 || enrollError.message.includes('403')) {
                    throw new Error("403 Forbidden: Ensure 'Email Confirmation' is DISABLED in Supabase Auth settings.");
                } else {
                    throw enrollError;
                }
            } else if (data) {
                setFactorId(data.id);
                setQrCode(data.totp.qr_code);
                setSecret(data.totp.secret);
            }
            setStatus('');
            console.log("MFAEnrollment: Setup ready.");
        } catch (err) {
            console.error("MFAEnrollment Error:", err.message);
            setError(err.message);
            setStatus('');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (code.length < 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError('');
        setStatus('Starting verification...');

        try {
            console.log("MFAEnrollment: --- VERIFICATION ATTEMPT START ---");
            console.log("MFAEnrollment: Factor to verify:", factorId);

            // Create a 25s timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Supabase is not responding. This usually means a network blockage or slow connection. Please try clicking 'Confirm' again.")), 25000)
            );

            // Race the verification against the timeout
            setStatus('Step 1/2: Sending code...');
            await Promise.race([
                verifyOTP(factorId, code),
                timeoutPromise
            ]);

            console.log("MFAEnrollment: Verification logical success.");
            setStatus('Step 2/2: Finishing up...');

            if (onComplete) {
                console.log("MFAEnrollment: Closing enrollment UI.");
                setTimeout(onComplete, 300);
            }

        } catch (err) {
            console.error("MFAEnrollment Error Handle:", err.message);
            setError(err.message || 'Verification failed. Please try again.');
            setStatus('');
        } finally {
            setLoading(false);
            console.log("MFAEnrollment: --- VERIFICATION ATTEMPT END ---");
        }
    };

    if (!qrCode) {
        return (
            <div className="mfa-setup">
                <h3>Secure your account</h3>
                <p>Enable Multi-Factor Authentication to keep your dashboard safe.</p>
                <button className="btn btn-primary" onClick={startEnrollment} disabled={loading}>
                    {loading ? (status || 'Working...') : 'Setup Authenticator'}
                </button>
                {status && <p style={{ fontSize: '0.8rem', color: 'gray', marginTop: '0.5rem' }}>{status}</p>}
                {error && <p className="error" style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.85rem' }}>{error}</p>}
            </div>
        );
    }

    return (
        <div className="mfa-enroll">
            <h3>Setup Authenticator</h3>
            <p>Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>

            <div className="qr-container">
                <img src={qrCode} alt="MFA QR Code" />
            </div>

            <div className="secret-box">
                <code>{secret}</code>
                <button onClick={() => navigator.clipboard.writeText(secret)} title="Copy secret">
                    <ClipboardCheck size={16} />
                </button>
            </div>

            <form onSubmit={handleVerify} className="verify-form">
                <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Verifying...' : 'Confirm Setup'}
                </button>
            </form>

            <style>{`
        .mfa-enroll { text-align: center; }
        .qr-container { background: white; padding: 1rem; border-radius: 12px; display: inline-block; margin: 1.5rem 0; }
        .qr-container img { width: 200px; height: 200px; display: block; }
        .secret-box { display: flex; align-items: center; justify-content: center; gap: 1rem; background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: 8px; margin-bottom: 2rem; }
        .secret-box code { font-size: 0.8rem; letter-spacing: 0.1rem; }
        .verify-form { display: flex; flex-direction: column; gap: 1rem; max-width: 300px; margin: 0 auto; }
        .verify-form input { padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; text-align: center; font-size: 1.2rem; }
        .error { color: #ef4444; font-size: 0.85rem; }
      `}</style>
        </div>
    );
};

export default MFAEnrollment;
