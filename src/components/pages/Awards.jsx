import React, { useState } from 'react';
import { Trophy, Star, Award, ExternalLink, Info, X } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

const iconMap = {
  trophy: <Trophy size={32} />,
  star: <Star size={32} />,
  award: <Award size={32} />,
};

const Awards = () => {
  const [selectedAward, setSelectedAward] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const closeModal = () => setSelectedAward(null);
  const closeEnlarged = () => setEnlargedImage(null);

  return (
    <div className="page-transition">
      <h2 className="section-title">Awards & Honors</h2>

      <div className="awards-grid">
        {resumeData.awards?.map((award) => (
          <div key={award.id} className="award-card glass-panel">
            <div className="award-icon-container">
              {iconMap[award.icon] || <Trophy size={32} />}
            </div>
            <div className="award-content">
              <div className="award-header">
                <h3 className="award-title">{award.title}</h3>
                <span className="award-year">{award.year}</span>
              </div>
              <h4 className="award-issuer">{award.issuer}</h4>
              <p className="award-description">{award.description}</p>

              <div className="award-actions">
                {award.details && (
                  <button
                    className="more-details-btn"
                    onClick={() => setSelectedAward(award)}
                  >
                    <Info size={16} />
                    <span>More Details</span>
                  </button>
                )}

                {award.link && (
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="award-link"
                  >
                    <ExternalLink size={16} />
                    <span>Visit Link</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedAward && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                {iconMap[selectedAward.icon] || <Trophy size={32} />}
              </div>
              <div>
                <h3 className="modal-title">{selectedAward.title}</h3>
                <p className="modal-issuer">{selectedAward.issuer}</p>
              </div>
            </div>

            <div className="modal-body">
              {selectedAward.details?.text && (
                <p className="modal-text">{selectedAward.details.text}</p>
              )}

              {selectedAward.details?.media && selectedAward.details.media.length > 0 && (
                <div className="modal-media-grid">
                  {selectedAward.details.media.map((item, index) => {
                    const isYouTubeUrl = item.url.includes('youtube.com') || item.url.includes('youtu.be');
                    return (
                      <div key={index} className="modal-media-item">
                        {item.type === 'video' ? (
                          isYouTubeUrl ? (
                            <iframe
                              src={item.url}
                              title={`${selectedAward.title} video`}
                              frameBorder="0"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="modal-media"
                            />
                          ) : (
                            <video controls src={item.url} className="modal-media" />
                          )
                        ) : (
                          <img
                            src={item.url}
                            alt="Award highlight"
                            className="modal-media clickable-image"
                            onClick={() => setEnlargedImage(item.url)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enlarged Image Lightbox */}
      {enlargedImage && (
        <div className="lightbox-overlay" onClick={closeEnlarged}>
          <button className="lightbox-close" onClick={closeEnlarged}>
            <X size={32} />
          </button>
          <img
            src={enlargedImage}
            alt="Enlarged view"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        .section-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin-bottom: 3rem;
          position: relative;
          display: inline-block;
          color: var(--text-primary);
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 4px;
          background: var(--accent-primary);
          border-radius: 2px;
        }

        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .awards-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .award-card {
          padding: 2rem;
          display: flex;
          gap: 1.5rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
          align-items: flex-start;
        }

        .award-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          background: rgba(30, 41, 59, 0.6);
        }

        .award-icon-container {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(250, 204, 21, 0.1); /* Gold tint */
          color: #facc15; /* Gold icon */
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(250, 204, 21, 0.2);
          box-shadow: inset 0 0 20px rgba(250, 204, 21, 0.05);
        }
        
        .award-card:hover .award-icon-container {
           box-shadow: 0 0 15px rgba(250, 204, 21, 0.3), inset 0 0 20px rgba(250, 204, 21, 0.1);
           transform: scale(1.05);
           transition: all 0.3s ease;
        }

        .award-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .award-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .award-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .award-year {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          font-size: 0.85rem;
          color: var(--accent-secondary);
          white-space: nowrap;
        }

        .award-issuer {
          color: var(--accent-primary);
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .award-description {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .award-actions {
          display: flex;
          gap: 1.5rem;
          margin-top: auto;
          align-items: center;
        }

        .more-details-btn, .award-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          opacity: 0.8;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
        }

        .more-details-btn:hover, .award-link:hover {
          opacity: 1;
          gap: 0.75rem;
          color: #facc15;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          background: rgba(15, 23, 42, 0.85); /* Slightly darker, solid backdrop */
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          transform: rotate(90deg);
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1.5rem;
        }

        .modal-icon {
          color: #facc15;
          background: rgba(250, 204, 21, 0.1);
          padding: 1rem;
          border-radius: 16px;
          border: 1px solid rgba(250, 204, 21, 0.2);
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .modal-issuer {
          color: var(--accent-primary);
          font-size: 1.1rem;
        }

        .modal-text {
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 2rem;
        }

        .modal-media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .modal-media-item {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
          aspect-ratio: 16/9;
          background: rgba(0, 0, 0, 0.3);
        }

        .modal-media {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: rgba(0, 0, 0, 0.2);
        }

        .clickable-image {
          cursor: zoom-in;
          transition: transform 0.3s ease;
        }

        .clickable-image:hover {
          transform: scale(1.02);
        }

        /* Lightbox Styles */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
          cursor: zoom-out;
        }

        .lightbox-image {
          max-width: 95vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }

        .lightbox-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2001;
        }

        .lightbox-close:hover {
          background: rgba(239, 68, 68, 0.4);
          transform: rotate(90deg);
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }

        @keyframes slideUp { 
          from { 
            opacity: 0; 
            transform: translateY(40px) scale(0.9) rotateX(-10deg); 
            filter: blur(5px);
          } 
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotateX(0); 
            filter: blur(0);
          } 
        }

        @media (max-width: 600px) {
            .modal-content {
                padding: 1.5rem;
            }
            .modal-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
            .award-actions {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
            }
        }
      `}</style>
    </div>
  );
};

export default Awards;
