import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { resumeData } from '../../data/resumeData';
import { ExternalLink, Github, Info, ArrowRight, Presentation, Video } from 'lucide-react';

const Projects = () => {
  const videoRefs = useRef([]);

  // Pause all videos when component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      videoRefs.current.forEach(video => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };
  }, []);

  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  return (
    <div className="page-transition">
      <h2 className="section-title">Projects</h2>

      <div className="projects-grid">
        {resumeData.projects
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((project, index) => (
            <div key={project.id} className="project-card glass-panel">
              {project.media && (
                <div className="project-media">
                  {project.media.type === 'video' ? (
                    isYouTubeUrl(project.media.url) ? (
                      <iframe
                        src={project.media.url}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        ref={el => videoRefs.current[index] = el}
                        controls
                        preload="metadata"
                      >
                        <source src={project.media.url} type="video/quicktime" />
                        <source src={project.media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )
                  ) : (
                    <img src={project.media.url} alt={project.title} />
                  )}
                </div>
              )}
              <div className="project-info-wrapper">
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <Link to={`/projects/${project.id}`} className="learn-more-btn">
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="project-actions">
                  {project.links?.code && (
                    <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="icon-btn" title="View Code">
                      <Github size={20} />
                    </a>
                  )}
                  {project.links?.video && (
                    <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Watch Video">
                      <Video size={20} />
                    </a>
                  )}
                  {project.links?.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.links?.presentation && (
                    <a href={project.links.presentation} target="_blank" rel="noopener noreferrer" className="icon-btn" title="See Presentation">
                      <Presentation size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <style>{`
        .section-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin-bottom: 3rem;
          position: relative;
          display: inline-block;
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

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .project-card {
          padding: 0;
          display: flex;
          flex-direction: row; /* Switch to horizontal layout for wider look */
          min-height: 220px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        @media (max-width: 600px) {
          .project-card {
            flex-direction: column;
          }
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .project-media {
          width: 40%; /* Fixed width for media in horizontal layout */
          min-width: 200px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: none;
        }

        @media (max-width: 600px) {
          .project-media {
            width: 100%;
            aspect-ratio: 16/9;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
        }

        .project-media img, .project-media iframe {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
        }

        .project-info-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .project-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .project-description {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.5;
          font-size: 0.95rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .tech-tag {
          font-size: 0.75rem;
          padding: 0.2rem 0.6rem;
          background: rgba(56, 189, 248, 0.1);
          color: var(--accent-primary);
          border-radius: 20px;
          border: 1px solid rgba(56, 189, 248, 0.1);
        }

        .learn-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          color: var(--accent-primary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          opacity: 0.8;
        }

        .learn-more-btn:hover {
          opacity: 1;
          gap: 0.75rem;
        }

        .learn-more-btn span {
          position: relative;
        }

        .learn-more-btn span::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: var(--accent-primary);
          transition: width 0.3s ease;
        }

        .learn-more-btn:hover span::after {
          width: 100%;
        }

        .project-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1.25rem;
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .icon-btn:hover {
          color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
};

export default Projects;
