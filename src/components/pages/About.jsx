import React, { useRef } from 'react';
import { resumeData } from '../../data/resumeData';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import './About.css';

const About = () => {
  const { about, personalInfo } = resumeData;
  const timelineRef = useRef(null);

  const scrollTimeline = (direction) => {
    if (timelineRef.current) {
      const scrollAmount = 400;
      timelineRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="page-transition about-page">
      <h2 className="section-title">About Me</h2>

      {/* Backstory Section */}
      <section className="backstory-section glass-panel">
        <div className="backstory-badge">My Story</div>
        <div className="backstory-grid">
          <div className="backstory-text-col">
            <h3 className="backstory-title">From Scratch to <span className="gradient-text">Simulations</span></h3>
            {about.backstory?.map((paragraph, index) => (
              <p key={index} className="backstory-text">
                {paragraph}
              </p>
            ))}

            {/* Location and Role removed as requested */}
          </div>

          <div className="backstory-media-col">
            <div className="media-card glass-panel">
              <div className="media-header">
                <Bookmark size={16} className="media-icon" />
                <span>Featured Project: Character Physics</span>
              </div>
              <div className="media-container">
                {personalInfo.meAtWork?.type === 'video' ? (
                  <iframe
                    src={personalInfo.meAtWork.url}
                    title="Work Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img src={personalInfo.meAtWork?.url} alt="Work Demo" />
                )}
              </div>
              <p className="media-caption">
                {personalInfo.meAtWork?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Timeline Section (...) */}
      <section className="timeline-section">
        <div className="section-header-row">
          <h3 className="sub-title">My Journey</h3>
        </div>

        <div className="timeline-wrapper-outer">
          <button onClick={() => scrollTimeline('left')} className="scroll-btn left"><ChevronLeft size={20} /></button>
          <button onClick={() => scrollTimeline('right')} className="scroll-btn right"><ChevronRight size={20} /></button>
          <div className="timeline-container" ref={timelineRef}>
            <div className="timeline-wrapper">
              <div className="timeline-line"></div>
              {about.timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot-container">
                    <div className="timeline-dot"></div>
                  </div>
                  <div className="timeline-content glass-panel">
                    <span className="timeline-year">{item.year}</span>
                    {item.image && (
                      <div className="image-placeholder">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="timeline-image"
                          loading="lazy"
                          onLoad={(e) => e.target.classList.add('loaded')}
                        />
                      </div>
                    )}
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section (...) */}
      <section className="hobbies-section">
        <h3 className="sub-title">Beyond the Code</h3>
        <div className="hobbies-grid">
          {about.hobbies.map((hobby, index) => (
            <div key={index} className="hobby-card glass-panel">
              <div className="hobby-icon">{hobby.icon}</div>
              <div className="hobby-info">
                <h4 className="hobby-name">{hobby.name}</h4>
                <p className="hobby-desc">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .about-page {
          padding-top: 100px;
          padding-bottom: 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          margin-bottom: 4rem;
          font-size: 3.5rem;
          letter-spacing: -0.02em;
        }

        /* Backstory Styling */
        .backstory-section {
          position: relative;
          padding: 4rem;
          margin-bottom: 8rem;
          overflow: hidden;
        }

        .backstory-badge {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(56, 189, 248, 0.1);
          color: var(--accent-primary);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .backstory-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .backstory-title {
          font-family: var(--font-display);
          font-size: 2.2rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .backstory-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .backstory-meta {
          display: flex;
          gap: 3rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meta-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .meta-value {
          font-family: var(--font-display);
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .media-card {
          padding: 1rem;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .media-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.5rem 1rem 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 1rem;
        }

        .media-icon {
          color: var(--accent-primary);
        }

        .media-container {
          width: 100%;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .media-container iframe, 
        .media-container img {
          width: 100% !important;
          height: 100% !important;
        }

        .media-caption {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
          padding: 0 0.5rem;
          font-style: italic;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .sub-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          color: var(--text-primary);
          position: relative;
          display: inline-block;
        }

        .sub-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--accent-primary);
        }

        .scroll-controls {
          display: flex;
          gap: 1rem;
        }

        .scroll-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .scroll-btn:hover {
          background: var(--accent-primary);
          color: #000;
          border-color: var(--accent-primary);
        }

        /* Timeline Styles */
        .timeline-section {
          margin-bottom: 6rem;
          position: relative;
        }

        .timeline-container {
          overflow-x: auto;
          padding: 2rem 0;
          padding-bottom: 3rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative;
        }

        .timeline-container::-webkit-scrollbar {
          display: none;
        }

        .timeline-wrapper {
          display: flex;
          gap: 3rem;
          position: relative;
          min-width: max-content;
          padding: 6rem 50px 2rem 50px;
        }

        .timeline-line {
          position: absolute;
          top: 6.7rem; /* Fine-tuned to align perfectly with dots */
          left: 50px;
          right: 50px;
          height: 2px;
          background: var(--accent-primary);
          opacity: 0.2;
          z-index: 1;
        }

        .timeline-item {
          flex: 0 0 350px;
          position: relative;
          z-index: 2;
        }

        .timeline-dot-container {
          width: 100%;
          display: flex;
          justify-content: center;
          position: absolute;
          top: 0.7rem; /* Position relative to the top of the item */
          left: 0;
          transform: translateY(-50%); /* Centers the dot exactly on the line */
        }

        .timeline-dot {
          width: 14px;
          height: 14px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 20px var(--accent-primary);
          border: 2px solid var(--background-deep);
        }

        .timeline-content {
          padding: 1.5rem;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .timeline-year {
          font-weight: 700;
          color: var(--accent-primary);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .timeline-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
          opacity: 0;
          transition: opacity 0.5s ease;
          will-change: opacity;
        }

        .timeline-image.loaded {
          opacity: 1;
        }

        .image-placeholder {
          width: 100%;
          height: 180px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .timeline-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .timeline-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Hobbies Styles */
        .hobbies-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 4rem;
        }

        .hobbies-section .sub-title {
          margin-bottom: 3rem;
        }

        .hobbies-section .sub-title::after {
          left: 50%;
          transform: translateX(-50%);
        }

        .hobbies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          justify-content: center;
        }

        .hobby-card {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 2.5rem;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease;
          text-align: left;
          will-change: transform;
          height: 100%;
        }

        .hobby-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 30px rgba(56, 189, 248, 0.1);
        }

        .hobby-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .hobby-name {
          font-family: var(--font-display);
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .hobby-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1.05rem;
        }

        @media (max-width: 1024px) {
          .backstory-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .backstory-text-col {
            order: 2;
          }

          .backstory-media-col {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .backstory-section {
            padding: 2rem;
          }

          .backstory-title {
            font-size: 1.8rem;
          }

          .backstory-meta {
            flex-direction: column;
            gap: 1.5rem;
          }

          .section-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .scroll-controls {
            display: none;
          }

          .timeline-container {
            overflow-x: visible;
            padding: 0;
          }

          .timeline-wrapper {
            flex-direction: column;
            min-width: 100%;
            padding: 2rem 0;
            gap: 2rem;
          }

          .timeline-line {
            top: 0;
            bottom: 0;
            left: 20px;
            right: auto;
            width: 2px;
            height: 100%;
          }

          .timeline-item {
            flex: 1;
            width: 100%;
            padding-left: 3rem;
            text-align: left;
          }

          .timeline-dot-container {
            width: auto;
            left: 20px;
            top: 1.5rem;
            transform: translate(-50%, -50%);
          }

          .timeline-content {
            text-align: left;
            align-items: flex-start;
          }

          .hobbies-grid {
            grid-template-columns: 1fr;
          }

          .hobby-card {
            padding: 1.5rem;
            flex-direction: column;
            gap: 1rem;
          }

          .hobby-icon {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
