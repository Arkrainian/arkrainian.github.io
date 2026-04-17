import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, User } from 'lucide-react';

const AdminLayout = () => {
  const { user, loading, mfaEnabled, needsMfa, signOut, mfaSkipped } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="admin-loading" style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0a0a0a',
        color: 'white',
        gap: '1.5rem'
      }}>
        <div className="loader"></div>
        <p>Verifying session...</p>
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--text-secondary)',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // If not logged in at all, go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If MFA is enabled but not verified, and NOT skipped by dev
  if (mfaEnabled && needsMfa && !mfaSkipped) {
    return <Navigate to="/mfa" replace />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar glass-panel">
        <div className="sidebar-header">
          <div className="admin-avatar">
            <User size={20} />
          </div>
          <div className="admin-info">
            <span className="admin-name">Admin</span>
            <span className="admin-status">Authorized</span>
          </div>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className={`admin-nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/settings" className={`admin-nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>

        <button className="admin-logout" onClick={signOut}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header glass-panel">
          <h1>Management Portal</h1>
          <div className="breadcrumb">Admin / Dashboard</div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
          color: white;
        }

        .admin-sidebar {
          width: 260px;
          height: 100vh;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 0;
          position: sticky;
          top: 0;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .admin-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-info {
          display: flex;
          flex-direction: column;
        }

        .admin-name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .admin-status {
          font-size: 0.75rem;
          color: var(--accent-primary);
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .admin-nav-item:hover, .admin-nav-item.active {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .admin-nav-item.active {
          color: var(--accent-primary);
        }

        .admin-logout {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          color: #ef4444;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 2rem;
        }

        .admin-logout:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .admin-main {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-header h1 {
          font-family: var(--font-display);
          font-size: 1.5rem;
        }

        .breadcrumb {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          gap: 1rem;
        }

        .loader {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top-color: var(--accent-primary);
          animation: spin 1s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AdminLayout;
