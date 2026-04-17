import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mfaEnabled, setMfaEnabled] = useState(false);
    const [needsMfa, setNeedsMfa] = useState(false);
    const [mfaSkipped, setMfaSkipped] = useState(false);

    useEffect(() => {
        console.log("AuthContext: Initializing...");

        // Safety timeout to ensure loading never hangs forever
        const timeout = setTimeout(() => {
            if (loading) {
                console.warn("AuthContext: Initialization timed out after 12s. Forcing loading false.");
                setLoading(false);
            }
        }, 12000);

        // Check active sessions and sets the user
        const checkUser = async () => {
            console.log("AuthContext: Performing initial session check...");
            try {
                // Use a faster check first
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) {
                    console.error("AuthContext: getSession error:", error.message);
                }

                if (session) {
                    console.log("AuthContext: Valid session active.");
                    setUser(session.user);
                    // Do MFA check in background
                    supabase.auth.mfa.listFactors().then(({ data, error: mfaError }) => {
                        if (!mfaError) setMfaEnabled(data?.totp?.length > 0);
                    }).catch(() => { });
                } else {
                    console.log("AuthContext: No active session.");
                    setUser(null);
                }
            } catch (err) {
                console.error("AuthContext: Unexpected error in checkUser:", err);
            } finally {
                setLoading(false);
                if (timeout) clearTimeout(timeout);
            }
        };

        checkUser();
        console.log("AuthContext: State listener attached.");

        // Listen for changes on auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("AuthContext: Auth State Change Event:", event);

            if (event === 'SIGNED_OUT') {
                console.log("AuthContext: User signed out, clearing state.");
                setUser(null);
                setMfaEnabled(false);
                setNeedsMfa(false);
                setLoading(false);
                return;
            }

            try {
                setUser(session?.user ?? null);

                if (session?.user) {
                    // Check Authenticator Assurance Level (AAL)
                    const aal = session.user.app_metadata?.aal || 'aal1';
                    console.log(`AuthContext: Current AAL: ${aal}`);

                    const { data: factors, error: mfaError } = await supabase.auth.mfa.listFactors();
                    const hasMfa = factors?.totp?.length > 0;

                    setMfaEnabled(hasMfa);

                    // If account has MFA but session is only AAL1, we need verification
                    if (hasMfa && aal === 'aal1') {
                        setNeedsMfa(true);
                    } else {
                        setNeedsMfa(false);
                    }
                } else {
                    setMfaEnabled(false);
                    setNeedsMfa(false);
                }
            } catch (err) {
                console.error("AuthContext: Auth state change error:", err);
            } finally {
                setLoading(false);
                if (timeout) clearTimeout(timeout);
            }
        });

        return () => {
            subscription.unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Check if MFA is required
        const { data: factors } = await supabase.auth.mfa.listFactors();
        if (factors?.totp?.length > 0) {
            setNeedsMfa(true);
        }

        return data;
    };

    const refreshMFA = async () => {
        try {
            const { data, error: mfaError } = await supabase.auth.mfa.listFactors();
            if (!mfaError) {
                setMfaEnabled(data?.totp?.length > 0);
                return data?.totp?.length > 0;
            }
        } catch (e) {
            console.warn("AuthContext: refreshMFA failed", e);
        }
        return false;
    };

    const verifyOTP = async (factorId, code) => {
        console.log("AuthContext: [1/2] Creating MFA challenge...");
        try {
            const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
            if (challengeError) throw challengeError;
            console.log("AuthContext: [2/2] Challenge created, verifying code...", challengeData.id);

            const { data: verifyData, error: verifyError } = await supabase.auth.mfa.verify({
                factorId,
                challengeId: challengeData.id,
                code
            });
            if (verifyError) throw verifyError;

            console.log("AuthContext: Verification confirmed by Supabase.");
            setNeedsMfa(false);
            refreshMFA().catch(() => { });
            return verifyData;
        } catch (err) {
            console.error("AuthContext: MFA verification failed:", err);
            throw err;
        }
    };

    const signOut = async () => {
        console.log("AuthContext: Emergency SignOut triggered...");
        try {
            // Non-blocking call to Supabase
            supabase.auth.signOut().catch(e => console.error("Background SignOut error:", e));

            // Immediate local cleanup
            localStorage.clear();
            sessionStorage.clear();
            setUser(null);
            setMfaEnabled(false);
            setNeedsMfa(false);

            console.log("AuthContext: Local state cleared, redirecting...");
            window.location.href = '/';
        } catch (err) {
            console.error("AuthContext: Sign out error:", err.message);
            window.location.href = '/';
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut,
            mfaEnabled,
            needsMfa,
            setNeedsMfa,
            verifyOTP,
            refreshMFA,
            mfaSkipped,
            setMfaSkipped
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
