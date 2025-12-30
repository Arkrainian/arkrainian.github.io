import React, { useState, useRef } from 'react';
import { resumeData } from '../../data/resumeData';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imagePosition, setImagePosition] = useState('right');

  const handleMouseEnter = (eduId, event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    // If card is on right half of screen, show image on right
    // If card is on left half, show image on left
    const cardCenter = rect.left + rect.width / 2;
    const position = cardCenter > windowWidth / 2 ? 'right' : 'left';

    setHoveredCard(eduId);
    setImagePosition(position);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="page-transition">
      <h2 className="section-title">Education</h2>

      <div className="education-container">
        <section className="education-section">
          <h3 className="category-title">Currently Enrolled</h3>
          <div className="education-grid">
            {resumeData.education.filter(e => e.status === 'enrolled').map((edu, index) => (
              <div
                key={edu.id}
                className="edu-card glass-panel enrolled-card"
                onMouseEnter={(e) => handleMouseEnter(edu.id, e)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="edu-icon enrolled-icon">
                  <GraduationCap size={32} />
                </div>
                <div className="edu-content">
                  {edu.url ? (
                    <a href={edu.url} target="_blank" rel="noopener noreferrer" className="edu-school-link">
                      <h3 className="edu-school">{edu.school}</h3>
                    </a>
                  ) : (
                    <h3 className="edu-school">{edu.school}</h3>
                  )}
                  <p className="edu-degree">{edu.degree}</p>
                  <span className="edu-year">In Progress</span>
                </div>
                {edu.image && hoveredCard === edu.id && (
                  <div className={`edu-image-overlay ${imagePosition}`}>
                    <img src={edu.image} alt={edu.school} className="edu-image" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="education-section">
          <h3 className="category-title">Completed</h3>
          <div className="education-grid">
            {resumeData.education.filter(e => e.status === 'completed').map((edu, index) => (
              <div
                key={edu.id}
                className="edu-card glass-panel"
                onMouseEnter={(e) => handleMouseEnter(edu.id, e)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="edu-icon">
                  <GraduationCap size={32} />
                </div>
                <div className="timeline-content glass-panel">
                  <div className="edu-header">
                    <h3 className="edu-degree">{edu.degree || "High School Diploma"}</h3>
                    <span className="edu-year">{edu.year}</span>
                  </div>
                  {edu.url ? (
                    <a href={edu.url} target="_blank" rel="noopener noreferrer" className="edu-school-link">
                      <h4 className="edu-school">{edu.school}</h4>
                    </a>
                  ) : (
                    <h4 className="edu-school">{edu.school}</h4>
                  )}
                </div>
                {edu.image && hoveredCard === edu.id && (
                  <div className={`edu-image-overlay ${imagePosition}`}>
                    <img src={edu.image} alt={edu.school} className="edu-image" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .education-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .category-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .category-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .edu-card {
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
        }

        .edu-card:hover {
          transform: translateY(-5px);
          background: rgba(30, 41, 59, 0.8);
          border-color: var(--accent-primary);
        }

        .enrolled-card {
          border-left: 3px solid var(--accent-secondary);
        }

        .edu-icon {
          width: 60px;
          height: 60px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .enrolled-icon {
          background: rgba(129, 140, 248, 0.1);
          color: var(--accent-secondary);
        }

        .edu-content {
          flex: 1;
        }

        .edu-school {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .edu-degree {
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .edu-year {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          font-size: 0.875rem;
          color: var(--accent-secondary);
        }

        .edu-school-link {
          text-decoration: none;
          color: inherit;
          transition: color 0.2s ease;
        }

        .edu-school-link:hover .edu-school {
          color: var(--accent-primary);
        }

        .edu-card {
          position: relative;
          overflow: visible;
        }

        .edu-image-overlay {
          position: absolute;
          top: 50%;
          transform: translateY(-50%) scale(0);
          width: 250px;
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 2px solid var(--accent-primary);
        }

        .edu-image-overlay.right {
          right: -20px;
        }

        .edu-image-overlay.left {
          left: -20px;
        }

        .edu-image-overlay.right {
          transform: translateY(-50%) scale(1);
          opacity: 1;
          right: -270px;
        }

        .edu-image-overlay.left {
          transform: translateY(-50%) scale(1);
          opacity: 1;
          left: -270px;
        }

        .edu-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .edu-image-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Education;
