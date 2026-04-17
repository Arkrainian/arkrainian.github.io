import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navigation from './Navigation';
import Background3D from './Background3D';
import FlyingCodeBackground from './FlyingCodeBackground';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <svg className="progress-ring" width="50" height="50">
            <circle
              className="progress-ring-circle"
              stroke="var(--accent-primary)"
              strokeWidth="3"
              fill="transparent"
              r="22"
              cx="25"
              cy="25"
              style={{
                strokeDasharray: '138.2',
                strokeDashoffset: 138.2 - (138.2 * scrollProgress) / 100
              }}
            />
          </svg>
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="app-container">
      <Background3D />
      <FlyingCodeBackground />
      <Navigation />
      <main className="main-content">
        <div className="content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <ScrollToTop />

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
        
        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1000;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .scroll-to-top:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
        }

        .progress-ring {
          position: absolute;
          transform: rotate(-90deg);
        }

        .progress-ring-circle {
          transition: stroke-dashoffset 0.1s linear;
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
            padding-bottom: 90px;
          }
          
          .scroll-to-top {
            bottom: 6rem; /* Avoid overlap with bottom nav */
            right: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
