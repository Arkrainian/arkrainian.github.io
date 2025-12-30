import React from 'react';
import { resumeData } from '../../data/resumeData';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const { personalInfo } = resumeData;
  const [langIndex, setLangIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [titleLangIndex, setTitleLangIndex] = useState(0);
  const [isTitleFading, setIsTitleFading] = useState(false);

  const titleLanguages = [
    { lang: 'English', text: "Krish's Domain" },
    { lang: 'Japanese', text: 'クリシュのドメイン' },
    { lang: 'Spanish', text: 'Dominio de Krish' },
    { lang: 'German', text: 'Krishs Domäne' },
    { lang: 'Russian', text: 'Домен Криша' },
    { lang: 'Dutch', text: "Krish's Domein" },
    { lang: 'Hindi', text: 'कृष का डोमेन' }
  ];

  const languages = [
    {
      name: 'JavaScript',
      render: () => (
        <>
          <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}
          <br />
          &nbsp;&nbsp;name: <span className="string">"Krish Sathyan"</span>,
          <br />
          &nbsp;&nbsp;role: <span className="string">"{personalInfo.title}"</span>,
          <br />
          &nbsp;&nbsp;skills: [<span className="string">"Python"</span>, <span className="string">"C++"</span>, <span className="string">"React"</span>]
          <br />
          {'}'};
        </>
      )
    },
    {
      name: 'Python',
      render: () => (
        <>
          <span className="variable">developer</span> = {'{'}
          <br />
          &nbsp;&nbsp;<span className="string">"name"</span>: <span className="string">"Krish Sathyan"</span>,
          <br />
          &nbsp;&nbsp;<span className="string">"role"</span>: <span className="string">"{personalInfo.title}"</span>,
          <br />
          &nbsp;&nbsp;<span className="string">"skills"</span>: [<span className="string">"Python"</span>, <span className="string">"C++"</span>, <span className="string">"React"</span>]
          <br />
          {'}'}
        </>
      )
    },
    {
      name: 'C++',
      render: () => (
        <>
          <span className="keyword">struct</span> <span className="variable">Developer</span> {'{'}
          <br />
          &nbsp;&nbsp;string name = <span className="string">"Krish Sathyan"</span>;
          <br />
          &nbsp;&nbsp;string role = <span className="string">"{personalInfo.title}"</span>;
          <br />
          &nbsp;&nbsp;vector&lt;string&gt; skills = {'{'}<span className="string">"Python"</span>, <span className="string">"C++"</span>, <span className="string">"React"</span>{'}'};
          <br />
          {'}'};
        </>
      )
    },
    {
      name: 'Lua',
      render: () => (
        <>
          <span className="keyword">local</span> <span className="variable">developer</span> = {'{'}
          <br />
          &nbsp;&nbsp;name = <span className="string">"Krish Sathyan"</span>,
          <br />
          &nbsp;&nbsp;role = <span className="string">"{personalInfo.title}"</span>,
          <br />
          &nbsp;&nbsp;skills = {'{'}<span className="string">"Python"</span>, <span className="string">"C++"</span>, <span className="string">"React"</span>{'}'}
          <br />
          {'}'}
        </>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      // Start both fades at the same time
      setIsFading(true);
      setIsTitleFading(true);

      setTimeout(() => {
        // Update both indices
        setLangIndex((prev) => (prev + 1) % languages.length);
        setTitleLangIndex((prev) => (prev + 1) % titleLanguages.length);

        // End both fades
        setIsFading(false);
        setIsTitleFading(false);
      }, 800);
    }, 5000);

    return () => clearInterval(timer);
  }, [languages.length, titleLanguages.length]);

  return (
    <>
      <div className="page-transition">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">Available for hire</div>
            <h1 className="hero-title">
              <span className={`gradient-text ${isTitleFading ? 'title-fading-out' : 'title-fading-in'}`}>
                {titleLanguages[titleLangIndex].text}
              </span>
            </h1>
            <h2 className="hero-subtitle">{personalInfo.title}</h2>
            <p className="hero-description">{personalInfo.summary}</p>

            <div className="hero-actions">
              <Link to="/about" className="btn btn-primary">
                About Me
              </Link>
              <Link to="/projects" className="btn btn-primary">
                View Work
              </Link>
            </div>

            <div className="hero-visual-inline">
              <div className="profile-card glass-panel">
                <div className="card-header">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className={`card-content ${isFading ? 'fading-out' : 'fading-in'}`}>
                  <code>
                    {languages[langIndex].render()}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="me-at-work-card glass-panel">
              <h3 className="card-title">{personalInfo.meAtWork.title}</h3>
              <div className="media-container">
                {personalInfo.meAtWork.type === 'video' ? (
                  personalInfo.meAtWork.url.includes('youtube.com') || personalInfo.meAtWork.url.includes('youtu.be') ? (
                    <iframe
                      src={personalInfo.meAtWork.url}
                      title="Work Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video src={personalInfo.meAtWork.url} autoPlay loop muted playsInline />
                  )
                ) : (
                  <img src={personalInfo.meAtWork.url} alt={personalInfo.meAtWork.title} />
                )}
              </div>
              <p className="media-description">{personalInfo.meAtWork.description}</p>
            </div>
          </div>
        </section>

        <style>{`
          .hero-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4rem;
            position: relative;
            z-index: 10;
          }

          .hero-content {
            flex: 1;
          }

          .hero-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: rgba(56, 189, 248, 0.1);
            color: var(--accent-primary);
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(56, 189, 248, 0.2);
          }

          .hero-title {
            font-family: var(--font-display);
            font-size: 4rem;
            line-height: 1.1;
            margin-bottom: 1rem;
          }

          .hero-subtitle {
            font-family: var(--font-display);
            font-size: 2rem;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
          }

          .hero-description {
            font-size: 1.125rem;
            color: var(--text-secondary);
            margin-bottom: 2.5rem;
            max-width: 500px;
          }

          .hero-actions {
            display: flex;
            gap: 1rem;
            margin-bottom: 3rem;
          }

          .hero-visual {
            flex: 1;
            display: flex;
            justify-content: center;
            position: relative;
          }

          .profile-card {
            width: 100%;
            max-width: 400px;
            padding: 1.5rem;
            transform: rotate(-1deg);
            transition: transform 0.3s ease;
            margin-top: 2rem;
          }

          .profile-card:hover {
            transform: rotate(0deg) scale(1.02);
          }

          .me-at-work-card {
            width: 100%;
            max-width: 450px;
            padding: 1.5rem;
            transition: all 0.3s ease;
          }

          .me-at-work-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent-primary);
          }

          .card-title {
            font-family: var(--font-display);
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: var(--text-primary);
          }

          .media-container {
            width: 100%;
            aspect-ratio: 16/9;
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 1rem;
            background: rgba(0, 0, 0, 0.2);
          }

          .media-container img, .media-container video, .media-container iframe {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: none;
          }

          .media-description {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.5;
          }

          .card-header {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }

          .red { background: #ff5f56; }
          .yellow { background: #ffbd2e; }
          .green { background: #27c93f; }

          .card-content {
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .fading-in {
            animation: codeFadeIn 0.8s ease forwards;
          }

          .fading-out {
            animation: codeFadeOut 0.8s ease forwards;
          }

          @keyframes codeFadeIn {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes codeFadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(10px); }
          }

          .title-fading-in {
            animation: titleFadeIn 0.8s ease forwards;
          }

          .title-fading-out {
            animation: titleFadeOut 0.8s ease forwards;
          }

          @keyframes titleFadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes titleFadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(10px); }
          }

          .keyword { color: #c678dd; }
          .variable { color: #e5c07b; }
          .string { color: #98c379; }

          @media (max-width: 1024px) {
            .hero-section {
              flex-direction: column-reverse;
              text-align: center;
              justify-content: center;
              padding-top: 2rem;
              gap: 2rem;
            }

            .hero-title {
              font-size: 3rem;
            }

            .hero-subtitle {
              font-size: 1.5rem;
            }

            .hero-description, .hero-actions {
              margin-left: auto;
              margin-right: auto;
            }
            
            .hero-actions {
              justify-content: center;
              flex-wrap: wrap;
            }

            .hero-visual {
              width: 100%;
            }

            .profile-card, .me-at-work-card {
              max-width: 100%;
              transform: none !important;
            }
          }

          @media (max-width: 480px) {
            .hero-title {
              font-size: 2.2rem;
            }
            
            .hero-actions {
              flex-direction: column;
              width: 100%;
            }
            
            .hero-actions .btn {
              width: 100%;
              justify-content: center;
            }
          }

          .floating-contact-btn {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.75rem;
            border-radius: 50px;
            text-decoration: none;
            color: white;
            font-weight: 600;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            box-shadow: 0 10px 30px rgba(56, 189, 248, 0.4);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
          }

          .floating-contact-btn:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 20px 40px rgba(56, 189, 248, 0.6);
            border-color: rgba(255, 255, 255, 0.3);
          }

          @media (max-width: 768px) {
            .floating-contact-btn {
              bottom: 1.5rem;
              right: 1.5rem;
              padding: 0.8rem 1.4rem;
              font-size: 0.95rem;
            }
          }
        `}</style>
      </div>
      <Link to="/contact" className="floating-contact-btn btn-primary">
        <span>Contact Me</span>
        <ArrowRight size={18} />
      </Link>
    </>
  );
};

export default Home;
