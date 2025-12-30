import React, { useState } from 'react';
import { resumeData } from '../../data/resumeData';
import { Mail, Github, Linkedin, Twitter, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
    const { personalInfo } = resumeData;
    const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://formsubmit.co/ajax/krishsathyan@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('SUCCESS');
                e.target.reset(); // Clear form
            } else {
                setStatus('ERROR');
            }
        } catch (error) {
            console.error("Form submission error", error);
            setStatus('ERROR');
        }
    };

    return (
        <div className="page-transition">
            <h2 className="section-title">Contact Me</h2>

            <div className="contact-container">
                <div className="contact-info glass-panel">
                    <h3 className="contact-subtitle">Get in Touch</h3>
                    <p className="contact-text">
                        I'm currently available for freelance work and full-time positions.
                        If you have a project that needs some creative touch, let's talk.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <Mail size={20} />
                            </div>
                            <div className="contact-content">
                                <span className="contact-label">Email</span>
                                <a href={`mailto:${personalInfo.email}`} className="contact-value">{personalInfo.email}</a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <MapPin size={20} />
                            </div>
                            <div className="contact-content">
                                <span className="contact-label">Location</span>
                                <span className="contact-value">{personalInfo.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                            <Github size={20} />
                        </a>
                        <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                            <Linkedin size={20} />
                        </a>
                        <a href={personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form glass-panel">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" required disabled={status === 'SUBMITTING'} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your Email" required disabled={status === 'SUBMITTING'} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" placeholder="Your Message" required disabled={status === 'SUBMITTING'}></textarea>
                    </div>

                    {/* Hidden fields for configuration */}
                    <input type="hidden" name="_subject" value="New submission from Resume App!" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value="https://arkrainian.github.io/#/contact" />

                    <div className="form-footer">
                        {status === 'SUCCESS' ? (
                            <div className="status-message success">
                                <CheckCircle size={20} />
                                <span>Message sent successfully! I'll get back to you soon.</span>
                            </div>
                        ) : status === 'ERROR' ? (
                            <div className="status-message error">
                                <AlertCircle size={20} />
                                <span>Something went wrong. Please try emailing me directly.</span>
                            </div>
                        ) : (
                            <button type="submit" className="btn btn-primary" disabled={status === 'SUBMITTING'}>
                                {status === 'SUBMITTING' ? 'Sending...' : 'Send Message'}
                                {!status === 'SUBMITTING' && <Send size={18} style={{ marginLeft: '8px' }} />}
                            </button>
                        )}
                    </div>
                </form>
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

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2rem;
        }

        .glass-panel {
          padding: 2rem;
        }

        .contact-subtitle {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .contact-text {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .contact-content {
          display: flex;
          flex-direction: column;
        }

        .contact-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .contact-value {
          color: var(--text-primary);
          font-weight: 500;
        }
        
        a.contact-value:hover {
            color: var(--accent-primary);
        }

        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: auto;
        }
        
        .social-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            transition: all 0.3s ease;
        }
        
        .social-btn:hover {
            background: var(--accent-primary);
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px var(--accent-glow);
        }

        .contact-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-group label {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .form-group input,
        .form-group textarea {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 0.75rem;
            color: var(--text-primary);
            font-family: var(--font-main);
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
        }

        .form-footer {
            margin-top: 1rem;
        }

        .status-message {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            border-radius: 8px;
            font-weight: 500;
            animation: fadeIn 0.3s ease;
        }

        .status-message.success {
            background: rgba(34, 197, 94, 0.1);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .status-message.error {
            background: rgba(239, 68, 68, 0.1);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            .contact-container {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
        </div>
    );
};

export default Contact;
