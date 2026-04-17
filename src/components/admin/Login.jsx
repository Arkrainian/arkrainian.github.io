import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, needsMfa } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      // Give AuthContext a moment to process the session
      setTimeout(() => {
        if (needsMfa) {
          navigate('/mfa');
        } else {
          navigate('/admin');
        }
      }, 600);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in and no MFA barrier
  const { user, loading: authLoading } = useAuth();
  React.useEffect(() => {
    if (!authLoading && user && !needsMfa) {
      navigate('/admin');
    }
  }, [user, authLoading, needsMfa, navigate]);

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card glass-panel"
      >
        <div className="login-header">
          <LogIn className="login-icon" size={32} />
          <h2>Admin Login</h2>
          <p>Secure authentication required</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </motion.div>

      <style jsx>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
          text-align: center;
        }

        .login-header {
          margin-bottom: 2rem;
        }

        .login-icon {
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }

        .login-header h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .input-group input {
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.85rem;
        }

        .btn-primary {
          padding: 1rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Login;
