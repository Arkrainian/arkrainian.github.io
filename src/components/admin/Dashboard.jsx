import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MFAEnrollment from './MFAEnrollment';
import { Shield, ShieldCheck, Database, FileEdit } from 'lucide-react';

const Dashboard = () => {
  const { mfaEnabled } = useAuth();
  const [showMFAEnrollment, setShowMFAEnrollment] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Security Overview Card */}
        <div className="dash-card glass-panel">
          <div className="dash-card-header">
            {mfaEnabled ? (
              <ShieldCheck className="status-icon secured" size={24} />
            ) : (
              <Shield className="status-icon warning" size={24} />
            )}
            <h3>Account Security</h3>
          </div>
          <div className="dash-card-content">
            <p>
              Two-Factor Authentication is <strong>{mfaEnabled ? 'Enabled' : 'Disabled'}</strong>.
            </p>
            {!mfaEnabled && !showMFAEnrollment && (
              <button
                className="btn btn-outline"
                style={{ marginTop: '1rem' }}
                onClick={() => setShowMFAEnrollment(true)}
              >
                Setup 2FA Now
              </button>
            )}
            {showMFAEnrollment && (
              <div className="mfa-embedded">
                <MFAEnrollment onComplete={() => setShowMFAEnrollment(false)} />
              </div>
            )}

            <div className="troubleshooting" style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>Login issues?</p>
              <button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.href = '/';
                }}
                style={{
                  fontSize: '0.7rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Hard Reset Session (Emergency Log Out)
              </button>
            </div>
          </div>
        </div>

        {/* Content Management Card */}
        <div className="dash-card glass-panel">
          <div className="dash-card-header">
            <Database size={24} />
            <h3>Data Sync Status</h3>
          </div>
          <div className="dash-card-content">
            <p>System is currently running on <strong>Static JSON</strong>.</p>
            <div className="sync-info">
              <span className="info-badge">In Progress</span>
              <p className="subtext">Migrating local data to Supabase...</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dash-card glass-panel full-width">
          <div className="dash-card-header">
            <FileEdit size={24} />
            <h3>Recent Items</h3>
          </div>
          <div className="dash-card-content">
            <p className="empty-state">No dynamic items yet. Complete the database migration to start editing live.</p>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .dash-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dash-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--accent-primary);
        }

        .dash-card-header h3 {
          color: white;
          font-size: 1.1rem;
        }

        .status-icon.secured { color: #10b981; }
        .status-icon.warning { color: #f59e0b; }

        .dash-card-content {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .sync-info {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border-left: 3px solid var(--accent-primary);
        }

        .info-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(56, 189, 248, 0.1);
          color: var(--accent-primary);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .subtext {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .empty-state {
          padding: 3rem;
          text-align: center;
          opacity: 0.5;
          font-style: italic;
        }

        .mfa-embedded {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
