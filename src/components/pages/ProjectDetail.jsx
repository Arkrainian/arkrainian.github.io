import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resumeData } from '../../data/resumeData';
import { ChevronLeft, Github, ExternalLink, Presentation, Video } from 'lucide-react';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = resumeData.projects.find(p => p.id === parseInt(id));
    const videoRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Pause video when component unmounts (user navigates away)
    useEffect(() => {
        return () => {
            if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
            }
        };
    }, []);

    const isYouTubeUrl = (url) => {
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    if (!project) {
        return (
            <div className="page-transition">
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2 className="section-title">Project Not Found</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        The project you are looking for does not exist in our galaxy.
                    </p>
                    <Link to="/projects" className="back-link">
                        <ChevronLeft size={20} />
                        Return to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-transition project-detail-page">
            <Link to="/projects" className="back-link">
                <ChevronLeft size={20} />
                Back to Projects
            </Link>

            <div className="project-detail-container">
                <div className="glass-panel detail-card">
                    <header className="detail-header">
                        <h2 className="project-title-large">{project.title}</h2>
                        <div className="project-tech-detail">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="tech-tag-large">{tech}</span>
                            ))}
                        </div>
                    </header>

                    {project.media && (
                        <div className="detail-media">
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
                                        ref={videoRef}
                                        controls
                                        preload="metadata"
                                    >
                                        <source src={project.media.url} type="video/mp4" />
                                        <source src={project.media.url} type="video/quicktime" />
                                        Your browser does not support the video tag.
                                    </video>
                                )
                            ) : (
                                <img src={project.media.url} alt={project.title} />
                            )}
                        </div>
                    )}

                    <div className="detail-body">
                        <div className="description-section">
                            <h3 className="sub-title">Overview</h3>
                            <div className="detailed-paragraph">
                                {project.details.split('\n\n').map((paragraph, index) => (
                                    <p key={index} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {project.certificate && (
                            <div className="certificate-section">
                                <h3 className="sub-title">Credential</h3>
                                <div className="certificate-container glass-panel">
                                    <img
                                        src={project.certificate.url}
                                        alt="Certificate"
                                        className="certificate-image"
                                    />
                                    <p className="certificate-caption">{project.certificate.caption}</p>
                                </div>
                            </div>
                        )}

                        <div className="actions-section">
                            {project.links?.code && (
                                <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="action-btn code-btn">
                                    <Github size={18} />
                                    View Repository
                                </a>
                            )}
                            {project.links?.video && (
                                <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="action-btn video-btn">
                                    <Video size={18} />
                                    Watch Recording
                                </a>
                            )}
                            {project.links?.presentation && (
                                <a href={project.links.presentation} target="_blank" rel="noopener noreferrer" className="action-btn presentation-btn">
                                    <Presentation size={18} />
                                    See Slides
                                </a>
                            )}
                            {project.links?.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="action-btn demo-btn">
                                    <ExternalLink size={18} />
                                    Launch Project
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .project-detail-page {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 2rem;
                    min-height: 80vh;
                    display: flex;
                    flex-direction: column;
                }

                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    text-decoration: none;
                    margin-bottom: 2rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    width: fit-content;
                }

                .back-link:hover {
                    color: var(--accent-primary);
                    transform: translateX(-5px);
                }

                .project-detail-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .detail-card {
                    padding: 4rem;
                    width: 100%;
                    max-width: 900px;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                }

                .project-title-large {
                    font-family: var(--font-display);
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    margin-bottom: 2rem;
                    background: linear-gradient(to right, #fff, var(--accent-primary));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .project-tech-detail {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-bottom: 3.5rem;
                    justify-content: center;
                }

                .tech-tag-large {
                    font-size: 0.9rem;
                    padding: 0.4rem 1.2rem;
                    background: rgba(56, 189, 248, 0.08);
                    color: var(--accent-primary);
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    border-radius: 20px;
                    font-weight: 500;
                }

                .detail-media {
                    width: 100%;
                    aspect-ratio: 16/9;
                    border-radius: 16px;
                    overflow: hidden;
                    margin-bottom: 4rem;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .detail-media img, .detail-media iframe, .detail-media video {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border: none;
                }

                .description-section {
                    text-align: left;
                }

                .sub-title {
                    font-family: var(--font-display);
                    font-size: 1.5rem;
                    margin-bottom: 2rem;
                    color: var(--text-primary);
                    opacity: 0.9;
                    position: relative;
                    display: inline-block;
                }

                .sub-title::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 40px;
                    height: 2px;
                    background: var(--accent-primary);
                }

                .detailed-paragraph {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: var(--text-secondary);
                    margin-bottom: 3rem;
                }

                .actions-section {
                    display: flex;
                    gap: 1.5rem;
                    padding-top: 3rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    justify-content: center;
                }

                .action-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem 2.5rem;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .code-btn {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--text-primary);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .code-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }

                .demo-btn {
                    background: var(--accent-primary);
                    color: #000;
                }

                .demo-btn:hover {
                    filter: brightness(1.1);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(56, 189, 248, 0.3);
                }

                .video-btn, .presentation-btn {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--text-primary);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .video-btn:hover, .presentation-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                    border-color: var(--accent-primary);
                }

                .certificate-section {
                    text-align: left;
                    margin-top: 4rem;
                }

                .certificate-container {
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .certificate-image {
                    width: 100%;
                    max-height: 500px;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }

                .certificate-caption {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    font-style: italic;
                    text-align: center;
                    opacity: 0.8;
                }

                @media (max-width: 768px) {
                    .detail-card {
                        padding: 2rem;
                    }
                    .project-title-large {
                        font-size: 2rem;
                    }
                    .actions-section {
                        flex-direction: column;
                    }
                    .action-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectDetail;
