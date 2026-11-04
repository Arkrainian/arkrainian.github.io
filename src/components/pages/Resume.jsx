import React from 'react';
import { resumeData } from '../../data/resumeData';
import { Printer, User, GraduationCap, Briefcase, Trophy, Cpu, Star, Code } from 'lucide-react';

const Resume = () => {
  const { personalInfo, experience, education, skills, awards, projects, pdfResumeData } = resumeData;

  const {
    layout = {},
    content = {}
  } = pdfResumeData || {};

  const handlePrint = () => {
    window.print();
  };

  const strengthsList = content.strengths || [
    "Analytical",
    "Innovative",
    "Problem Solver",
    "Detail-Oriented",
    "Collaborative",
    "Adaptable",
    "Systems Thinker",
    "Resourceful",
    "Fast Learner",
    "Creative",
    "Methodical",
    "Self-Motivated"
  ];

  // Divide experience into left and right columns for optimal 1-page US Letter layout
  // PDF swaps Freelance Game Dev (id 1) for PULSE; the site still lists both
  const pdfExperience = experience.filter(exp => exp.id !== 1);
  const expLeft = pdfExperience.slice(0, 2); // LA Metro & PULSE Regional Director
  const expRight = pdfExperience.slice(2);   // AI Consultant & Volunteer

  const displayProjects = projects.filter(p => [2, 13, 3].includes(p.id));
  const displayAwards = awards.filter(a => [10, 9, 7, 5, 11].includes(a.id));

  // Skills formatted for Kickresume progress bars
  const programmingSkills = [
    { name: "Python / AI & ML", level: 100 },
    { name: "Generative AI & LLMs", level: 80 },
    { name: "C++ / Physics", level: 90 },
    { name: "Luau & Java Systems", level: 88 },
    { name: "Web (React / JS / CSS)", level: 95 }
  ];

  const designToolsSkills = [
    { name: "Graphic Design & Branding", level: 95 },
    { name: "UI/UX & Digital Media", level: 90 },
    { name: "Data Science & R Analytics", level: 85 },
    { name: "Git & Cybersecurity (Linux)", level: 88 }
  ];

  return (
    <div className="resume-container">
      <div className="resume-controls no-print">
        <button onClick={handlePrint} className="btn btn-primary">
          <Printer size={18} />
          Print 1-Page PDF (US Letter)
        </button>
        <div className="print-hint-box">
          <p className="print-hint"><strong>Print Setting:</strong> Paper Size: <strong>US Letter</strong> | Margins: <strong>None</strong> | Background Graphics: <strong>ON</strong></p>
        </div>
      </div>

      <div className="resume-paper">
        {/* Kickresume Header Banner - Deep Slate Blue with Electric Blue Accents */}
        <div className="kr-header-banner">
          <div className="kr-header-decor-left"></div>
          <h1>Krish Sathyan</h1>
          <div className="kr-header-decor-right"></div>
        </div>

        {/* Contact Info Sub-Bar */}
        <div className="kr-contact-bar">
          <span>{personalInfo.email}</span>
          <span className="kr-bar-sep">|</span>
          <span>{personalInfo.location}</span>
          <span className="kr-bar-sep">|</span>
          <span>{personalInfo.socials.github}</span>
        </div>

        {/* 2-Column Resume Content Grid */}
        <div className="kr-grid">
          {/* Left Column */}
          <div className="kr-col">
            {/* Profile Section */}
            <section className="kr-section">
              <h3 className="kr-section-title">
                <User size={15} className="kr-title-icon" /> Profile
              </h3>
              <p className="kr-text">{personalInfo.summary}</p>
            </section>

            {/* Work Experience Section (Left Column) */}
            <section className="kr-section">
              <h3 className="kr-section-title">
                <Briefcase size={15} className="kr-title-icon" /> Work Experience
              </h3>
              {expLeft.map((exp) => (
                <div key={exp.id} className="kr-item">
                  <div className="kr-item-date">
                    📅 {exp.period} 📍 Los Angeles, CA
                  </div>
                  <h4 className="kr-item-title">{exp.role}</h4>
                  <div className="kr-item-sub">{exp.company}</div>
                  <ul className="kr-bullet-list">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Education & Certifications Section */}
            <section className="kr-section">
              <h3 className="kr-section-title">
                <GraduationCap size={15} className="kr-title-icon" /> Education & Certifications
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="kr-item">
                  <div className="kr-item-header">
                    <h4 className="kr-item-title">{edu.degree || edu.school}</h4>
                    <span className="kr-item-date-inline">{edu.year}</span>
                  </div>
                  <div className="kr-item-sub">{edu.school}</div>
                  {edu.description && (
                    <p className="kr-item-desc">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          </div>

          {/* Right Column */}
          <div className="kr-col">
            {/* Additional Work Experience */}
            {expRight.length > 0 && (
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Briefcase size={15} className="kr-title-icon" /> Additional Experience
                </h3>
                {expRight.map((exp) => (
                  <div key={exp.id} className="kr-item">
                    <div className="kr-item-date">
                      📅 {exp.period}
                    </div>
                    <h4 className="kr-item-title">{exp.role}</h4>
                    <div className="kr-item-sub">{exp.company}</div>
                    <ul className="kr-bullet-list">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* Key Technical Projects */}
            <section className="kr-section">
              <h3 className="kr-section-title">
                <Code size={15} className="kr-title-icon" /> Key Projects
              </h3>
              {displayProjects.map((proj) => (
                <div key={proj.id} className="kr-item">
                  <h4 className="kr-item-title">{proj.title}</h4>
                  <p className="kr-item-desc">{proj.description}</p>
                  <div className="kr-tech-pills">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="kr-tech-pill">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Awards & Honors */}
            <section className="kr-section">
              <h3 className="kr-section-title">
                <Trophy size={15} className="kr-title-icon" /> Awards & Honors
              </h3>
              {displayAwards.slice(0, 4).map((award) => (
                <div key={award.id} className="kr-award-item-compact">
                  <span className="kr-item-title">"{award.title}"</span>
                  <span className="kr-item-date-inline">{award.year}</span>
                </div>
              ))}
            </section>

            {/* Skills & Proficiency (Blue Progress Bars) */}
            <section className="kr-section">
              <h3 className="kr-section-title">
                <Cpu size={15} className="kr-title-icon" /> Technical Skills
              </h3>
              <div className="kr-skill-cat-title">COMPUTER & SYSTEMS SKILLS</div>
              <div className="kr-skills-list">
                {programmingSkills.map((sk, i) => (
                  <div key={i} className="kr-skill-row">
                    <span className="kr-skill-name">{sk.name}</span>
                    <div className="kr-skill-bar-bg">
                      <div className="kr-skill-bar-fill" style={{ width: `${sk.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="kr-skill-cat-title" style={{ marginTop: '0.35rem' }}>DESIGN & DATA SKILLS</div>
              <div className="kr-skills-list">
                {designToolsSkills.map((sk, i) => (
                  <div key={i} className="kr-skill-row">
                    <span className="kr-skill-name">{sk.name}</span>
                    <div className="kr-skill-bar-bg">
                      <div className="kr-skill-bar-fill" style={{ width: `${sk.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Strengths Section (Vibrant Blue Badges) */}
            <section className="kr-section">
              <h3 className="kr-section-title">
                <Star size={15} className="kr-title-icon" /> Key Strengths
              </h3>
              <div className="kr-strengths-grid">
                {strengthsList.map((st, i) => (
                  <span key={i} className="kr-strength-badge">{st}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <style>{`
        .resume-container {
          padding-top: 1.5rem;
          padding-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }

        .resume-controls {
          margin-bottom: 1.5rem;
          text-align: center;
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          background: rgba(30, 41, 59, 0.5);
          padding: 1.2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .print-hint-box {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .print-hint {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        /* US Letter 8.5in x 11in 1-Page Layout Container */
        .resume-paper {
          width: 8.5in;
          height: 11in;
          max-height: 11in;
          background: #ffffff;
          color: #0f172a;
          padding: 0.3in 0.35in;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          position: relative;
          font-size: 8pt;
          line-height: 1.28;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Blue Theme Header Banner matching Website Palette */
        .kr-header-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 0.65rem 1.3rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 4px;
        }

        .kr-header-banner h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 21pt;
          font-weight: 700;
          color: #38bdf8;
          margin: 0;
          letter-spacing: 0.04em;
        }

        .kr-header-decor-left, .kr-header-decor-right {
          width: 18px;
          height: 26px;
          border-left: 2px solid #38bdf8;
          border-right: 2px solid #38bdf8;
        }

        .kr-contact-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.7rem;
          padding: 0.3rem 0;
          font-size: 8pt;
          font-weight: 600;
          color: #334155;
          border-bottom: 1px solid #bae6fd;
          margin-bottom: 0.55rem;
        }

        .kr-bar-sep {
          color: #38bdf8;
          font-weight: 700;
        }

        .kr-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 0.95rem;
        }

        .kr-section {
          margin-bottom: 0.55rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .kr-section-title {
          font-size: 9.8pt;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin: 0 0 0.3rem 0;
          padding-bottom: 0.12rem;
          border-bottom: 1.5px solid #38bdf8;
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .kr-title-icon {
          color: #0284c7;
        }

        .kr-text {
          font-size: 7.8pt;
          line-height: 1.28;
          color: #334155;
          margin: 0;
        }

        .kr-item {
          margin-bottom: 0.4rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .kr-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .kr-item-date {
          font-size: 7.3pt;
          color: #0369a1;
          font-weight: 600;
          margin-bottom: 0.05rem;
        }

        .kr-item-date-inline {
          font-size: 7.3pt;
          color: #0369a1;
          font-weight: 600;
        }

        .kr-item-title {
          font-size: 8.6pt;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.2;
        }

        .kr-item-sub {
          font-size: 7.8pt;
          font-weight: 600;
          color: #0284c7;
          margin-bottom: 0.1rem;
        }

        .kr-item-desc {
          font-size: 7.5pt;
          color: #475569;
          margin: 0.1rem 0;
          line-height: 1.24;
        }

        .kr-bullet-list {
          margin: 0.15rem 0 0 0;
          padding-left: 0.85rem;
          font-size: 7.5pt;
          color: #334155;
        }

        .kr-bullet-list li {
          margin-bottom: 0.1rem;
          line-height: 1.24;
        }

        .kr-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.2rem;
          margin-top: 0.15rem;
        }

        .kr-tech-pill {
          font-size: 6.8pt;
          background: #f0f9ff;
          color: #0369a1;
          padding: 0.05rem 0.28rem;
          border-radius: 2px;
          border: 1px solid #bae6fd;
          font-weight: 500;
        }

        .kr-award-item-compact {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.2rem;
        }

        /* Blue Kickresume Skills Progress Bars */
        .kr-skill-cat-title {
          font-size: 7pt;
          font-weight: 700;
          color: #0369a1;
          letter-spacing: 0.05em;
          margin-bottom: 0.18rem;
        }

        .kr-skills-list {
          display: flex;
          flex-direction: column;
          gap: 0.22rem;
        }

        .kr-skill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .kr-skill-name {
          font-size: 7.5pt;
          font-weight: 600;
          color: #0f172a;
        }

        .kr-skill-bar-bg {
          width: 80px;
          height: 6px;
          background-color: #e0f2fe;
          border-radius: 2px;
          overflow: hidden;
        }

        .kr-skill-bar-fill {
          height: 100%;
          background-color: #0284c7;
          border-radius: 2px;
        }

        /* Vibrant Blue Strengths Badges */
        .kr-strengths-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .kr-strength-badge {
          background-color: #0284c7;
          color: #ffffff;
          padding: 0.14rem 0.45rem;
          font-size: 7.2pt;
          font-weight: 600;
          border-radius: 3px;
          display: inline-block;
        }

        /* Single-Page US Letter Print Setup */
        @media print {
          @page {
            size: letter portrait;
            margin: 0;
          }
          
          html, body {
            width: 8.5in !important;
            height: 11in !important;
            max-height: 11in !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .no-print {
            display: none !important;
          }

          .resume-container {
            padding: 0 !important;
            margin: 0 !important;
            min-height: 0 !important;
          }

          .resume-paper {
            width: 8.5in !important;
            height: 11in !important;
            max-height: 11in !important;
            box-shadow: none !important;
            padding: 0.3in 0.35in !important;
            margin: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .kr-header-banner {
            background: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .kr-header-banner h1 {
            color: #38bdf8 !important;
          }

          .kr-skill-bar-fill {
            background-color: #0284c7 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .kr-skill-bar-bg {
            background-color: #e0f2fe !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .kr-strength-badge {
            background-color: #0284c7 !important;
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .kr-grid {
            display: flex !important;
            flex-direction: row;
            gap: 0.95rem;
          }
          
          .kr-col {
            flex: 1;
          }
        }

        /* Mobile Adjustments for screen view */
        @media (max-width: 850px) {
          .resume-paper {
            width: 95vw;
            height: auto;
            max-height: none;
            padding: 1rem;
            overflow: visible;
          }
          .kr-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
