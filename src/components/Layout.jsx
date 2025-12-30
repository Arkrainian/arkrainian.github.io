import React from 'react';
import Navigation from './Navigation';
import Background3D from './Background3D';
import FlyingCodeBackground from './FlyingCodeBackground';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Background3D />
      <FlyingCodeBackground />
      <Navigation />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
        }

        .main-content {
          flex: 1;
          margin-left: var(--nav-width);
          transition: margin-left 0.3s ease;
          padding: 2rem;
          min-height: 100vh;
          position: relative;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        /* Background Effects */
        .main-content::before {
          content: '';
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }
        
        .main-content::after {
          content: '';
          position: fixed;
          bottom: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 1.5rem;
            padding-bottom: 90px; /* Space for refined bottom nav */
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
