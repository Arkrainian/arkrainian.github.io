import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MFAChallenge = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { verifyOTP } = useAuth();

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Get the TOTP factor ID
            const { data: factors, error: listError } = await supabase.auth.mfa.listFactors();
            if (listError) throw listError;

            const factor = factors.totp[0]; // Assuming only one TOTP factor
            if (!factor) throw new Error("No MFA factor found");

            await verifyOTP(factor.id, code);
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card glass-panel"
            >
                <div className="login-header">
                    <ShieldCheck className="login-icon" size={32} />
                    <h2>Two-Factor Auth</h2>
                    <p>Enter the 6-digit code from your authenticator app</p>
                </div>

                <form onSubmit={handleVerify} className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                            style={{ textAlign: 'center', fontSize: '2rem', letterSpacing: '0.5rem' }}
                            required
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary glow-on-hover"
                        disabled={loading || code.length !== 6}
                    >
                        {loading ? 'Verifying...' : 'Unlock Dashboard'}
                    </button>
                </form>
            </motion.div>

            <style>{`
        /* Reusing styles from Login or shared CSS */
        .login-container { display: flex; align-items: center; justify-content: center; min-height: 80vh; padding: 2rem; }
        .login-card { width: 100%; max-width: 400px; padding: 2.5rem; text-align: center; }
        .login-header { margin-bottom: 2rem; }
        .login-icon { color: var(--accent-primary); margin-bottom: 1rem; }
        .login-header h2 { font-family: var(--font-display); font-size: 1.75rem; margin-bottom: 0.5rem; }
        .login-header p { color: var(--text-secondary); font-size: 0.9rem; }
        .login-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-group input { padding: 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; color: white; width: 100%; }
        .input-group input:focus { outline: none; border-color: var(--accent-primary); }
        .error-message { display: flex; align-items: center; gap: 0.5rem; color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; text-align: left; }
      `}</style>
        </div>
    );
};

export default MFAChallenge;
