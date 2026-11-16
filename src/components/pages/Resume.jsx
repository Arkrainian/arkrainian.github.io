import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { resumeData } from '../../data/resumeData';
import {
  Printer,
  User,
  GraduationCap,
  Briefcase,
  Trophy,
  Cpu,
  Star,
  Code,
  HeartHandshake,
  Users,
  Compass,
  FileText
} from 'lucide-react';

const Resume = ({ defaultVersion }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialVersion =
    defaultVersion ||
    (location.pathname === '/resume-2' || searchParams.get('v') === '2' ? 2 : 1);

  const [activeResume, setActiveResume] = useState(initialVersion);

  useEffect(() => {
    if (location.pathname === '/resume-2') {
      setActiveResume(2);
    } else if (searchParams.get('v') === '2') {
      setActiveResume(2);
    } else if (searchParams.get('v') === '1') {
      setActiveResume(1);
    }
  }, [location.pathname, searchParams]);

  const handleVersionChange = (ver) => {
    setActiveResume(ver);
    setSearchParams({ v: String(ver) });
  };

  const {
    personalInfo,
    experience,
    education,
    awards,
    projects,
    pdfResumeData,
    secondResumeData
  } = resumeData;

  const { content = {} } = pdfResumeData || {};

  const handlePrint = () => {
    window.print();
  };

  const strengthsList = content.strengths || [
    'Analytical',
    'Innovative',
    'Problem Solver',
    'Detail-Oriented',
    'Collaborative',
    'Adaptable',
    'Systems Thinker',
    'Resourceful',
    'Fast Learner',
    'Creative',
    'Methodical',
    'Self-Motivated'
  ];

  // Resume 1: Show LA Metro, PULSE Regional Director, and AI Consultant under Work & Leadership Experience
  const pdfWorkExperience = experience.filter((exp) => ![1, 3].includes(exp.id));
  const displayProjects = projects.filter((p) => [2, 13, 3].includes(p.id));
  const displayAwards = awards;

  // Skills formatted for Kickresume progress bars
  const programmingSkills = [
    { name: 'Python / AI & ML (PyTorch, TF)', level: 100 },
    { name: 'Web (React / JS / HTML / CSS)', level: 95 },
    { name: 'C++ / C / Computational Physics', level: 90 },
    { name: 'Luau & Java Autonomous Systems', level: 88 },
    { name: 'Generative AI, LLMs & CUDA', level: 82 }
  ];

  const designToolsSkills = [
    { name: 'Graphic Design & Visual Branding', level: 95 },
    { name: 'UI/UX & Adobe Creative Suite', level: 90 },
    { name: 'Linux, Cybersecurity & WireGuard', level: 88 },
    { name: 'Data Science & R Statistical Modeling', level: 85 }
  ];

  return (
    <div className="resume-container">
      <div className="resume-controls no-print">
        <div className="resume-switcher">
          <button
            type="button"
            onClick={() => handleVersionChange(1)}
            className={`switcher-btn ${activeResume === 1 ? 'active' : ''}`}
          >
            <FileText size={16} />
            Résumé 1: Technical & Design (Modified)
          </button>
          <button
            type="button"
            onClick={() => handleVersionChange(2)}
            className={`switcher-btn ${activeResume === 2 ? 'active' : ''}`}
          >
            <FileText size={16} />
            Résumé 2: Comprehensive Academic & Activities Outline
          </button>
        </div>

        <div className="resume-actions-row">
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={18} />
            Print {activeResume === 1 ? 'Résumé 1' : 'Résumé 2'} (1-Page US Letter PDF)
          </button>
        </div>

        <div className="print-hint-box">
          <p className="print-hint">
            <strong>Print Setting:</strong> Paper Size: <strong>US Letter</strong> | Margins:{' '}
            <strong>None</strong> | Background Graphics: <strong>ON</strong>
          </p>
          <p className="privacy-compliance-note">
            ✓ Compliant with privacy guidelines: Contains <strong>no</strong> SSN, birth date, ethnicity, race, sex, or sensitive personal data.
          </p>
        </div>
      </div>

      {activeResume === 1 ? (
        /* =========================================================
           RÉSUMÉ 1: MODIFIED TECHNICAL & DESIGN PORTFOLIO RÉSUMÉ
           ========================================================= */
        <div className="resume-paper">
          {/* Header Banner */}
          <div className="kr-header-banner">
            <div className="kr-header-decor-left"></div>
            <div>
              <h1>Krish Sathyan</h1>
              <div className="kr-header-subtitle">
                Software Engineering • Machine Learning Research • Graphic Design
              </div>
            </div>
            <div className="kr-header-decor-right"></div>
          </div>

          {/* Contact Info Sub-Bar (No sensitive demographic/personal info) */}
          <div className="kr-contact-bar">
            <span>{personalInfo.email}</span>
            <span className="kr-bar-sep">|</span>
            <span>{personalInfo.socials.github}</span>
            <span className="kr-bar-sep">|</span>
            <span>arkrainian.github.io</span>
          </div>

          {/* 2-Column Resume Content Grid */}
          <div className="kr-grid">
            {/* Left Column */}
            <div className="kr-col">
              {/* Profile Section */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <User size={14} className="kr-title-icon" /> Profile
                </h3>
                <p className="kr-text">{personalInfo.summary}</p>
              </section>

              {/* Work & Leadership Experience Section */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Briefcase size={14} className="kr-title-icon" /> Work, Internship & Leadership Experience
                </h3>
                {pdfWorkExperience.map((exp) => (
                  <div key={exp.id} className="kr-item">
                    <div className="kr-item-header">
                      <h4 className="kr-item-title">{exp.role}</h4>
                      <span className="kr-item-date-inline">{exp.period}</span>
                    </div>
                    <div className="kr-item-sub">{exp.company}</div>
                    <ul className="kr-bullet-list">
                      {exp.description.slice(0, 3).map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Academic Experience & Certifications */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <GraduationCap size={14} className="kr-title-icon" /> Academic Experience & Certifications
                </h3>
                {education.map((edu) => (
                  <div key={edu.id} className="kr-item">
                    <div className="kr-item-header">
                      <h4 className="kr-item-title">{edu.degree || edu.school}</h4>
                      <span className="kr-item-date-inline">{edu.year}</span>
                    </div>
                    <div className="kr-item-sub">{edu.school}</div>
                    {edu.description && <p className="kr-item-desc">{edu.description}</p>}
                  </div>
                ))}
              </section>
            </div>

            {/* Right Column */}
            <div className="kr-col">
              {/* Research & Technical Projects */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Code size={14} className="kr-title-icon" /> Research & Technical Projects
                </h3>
                {displayProjects.map((proj) => (
                  <div key={proj.id} className="kr-item">
                    <h4 className="kr-item-title">{proj.title}</h4>
                    <p className="kr-item-desc">{proj.description}</p>
                    <div className="kr-tech-pills">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="kr-tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Honors, Awards & Leadership */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Trophy size={14} className="kr-title-icon" /> Honors, Awards & Extracurriculars
                </h3>
                {displayAwards.map((award) => (
                  <div key={award.id} className="kr-award-item-compact">
                    <span className="kr-award-line">
                      <strong>{award.title}</strong> <span className="kr-award-issuer">— {award.issuer}</span>
                    </span>
                    <span className="kr-item-date-inline">{award.year}</span>
                  </div>
                ))}
              </section>

              {/* Volunteerism */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <HeartHandshake size={14} className="kr-title-icon" /> Volunteerism & Community Service
                </h3>
                <div className="kr-item">
                  <div className="kr-item-header">
                    <h4 className="kr-item-title">Hour Power Peer Tutor & STEM Outreach Volunteer</h4>
                    <span className="kr-item-date-inline">2024 – 2025</span>
                  </div>
                  <div className="kr-item-sub">Cerritos High School & Cerritos Elementary</div>
                  <p className="kr-item-desc">
                    Tutored high school peers during Hour Power (earning the Certificate of Volunteer Appreciation) and led interactive physics/magnetism experiments for elementary students.
                  </p>
                </div>
              </section>

              {/* Computer Competencies & Skills */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Cpu size={14} className="kr-title-icon" /> Computer Competencies & Skills
                </h3>
                <div className="kr-skill-cat-title">PROGRAMMING & COMPUTING SYSTEMS</div>
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
                <div className="kr-skill-cat-title" style={{ marginTop: '0.3rem' }}>
                  DESIGN, CYBERSECURITY & DATA ANALYTICS
                </div>
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

              {/* Hobbies, Interests & Strengths */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Star size={14} className="kr-title-icon" /> Hobbies, Interests & Strengths
                </h3>
                <p className="kr-item-desc" style={{ marginBottom: '0.25rem' }}>
                  <strong>Interests:</strong> Culinary Arts (slow-cooked brisket, salmon, traditional Indian chai & South Indian filter coffee), 3D Art & Blender Animation, Astrophysics & Stargazing, Aerodynamics Simulation.
                </p>
                <div className="kr-strengths-grid">
                  {strengthsList.slice(0, 8).map((st, i) => (
                    <span key={i} className="kr-strength-badge">
                      {st}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================
           RÉSUMÉ 2: COMPREHENSIVE OUTLINE RÉSUMÉ (ALL REQUIRED SECTIONS)
           ========================================================= */
        <div className="resume-paper resume-paper-v2">
          {/* Header Banner - Strictly Name & Professional Subtitle (No SSN, DOB, Race, Sex, etc.) */}
          <div className="kr-header-banner kr-header-v2">
            <div className="kr-header-decor-left"></div>
            <div>
              <h1>{secondResumeData.name}</h1>
              <div className="kr-header-subtitle">{secondResumeData.subtitle}</div>
            </div>
            <div className="kr-header-decor-right"></div>
          </div>

          <div className="kr-contact-bar kr-contact-v2">
            <span>{personalInfo.email}</span>
            <span className="kr-bar-sep">|</span>
            <span>{personalInfo.socials.github}</span>
            <span className="kr-bar-sep">|</span>
            <span>arkrainian.github.io</span>
          </div>

          <div className="kr-grid kr-grid-v2">
            {/* LEFT COLUMN */}
            <div className="kr-col">
              {/* 1. Research and Work Experience (including past internships) */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Briefcase size={14} className="kr-title-icon" /> Research and Work Experience
                </h3>
                {secondResumeData.researchAndWorkExperience.map((item, idx) => (
                  <div key={idx} className="kr-item">
                    <div className="kr-item-header">
                      <h4 className="kr-item-title">{item.role}</h4>
                      <span className="kr-item-date-inline">{item.period}</span>
                    </div>
                    <div className="kr-item-sub">{item.organization}</div>
                    <ul className="kr-bullet-list">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* 2. Academic Experience */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <GraduationCap size={14} className="kr-title-icon" /> Academic Experience
                </h3>
                {secondResumeData.academicExperience.map((acad, idx) => (
                  <div key={idx} className="kr-item">
                    <div className="kr-item-header">
                      <h4 className="kr-item-title">{acad.institution}</h4>
                      <span className="kr-item-date-inline">{acad.period}</span>
                    </div>
                    <div className="kr-item-sub">{acad.program}</div>
                    <p className="kr-item-desc">{acad.details}</p>
                  </div>
                ))}
              </section>

              {/* 3. Volunteerism */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <HeartHandshake size={14} className="kr-title-icon" /> Volunteerism
                </h3>
                {secondResumeData.volunteerism.map((vol, idx) => (
                  <div key={idx} className="kr-item">
                    <div className="kr-item-header">
                      <h4 className="kr-item-title">
                        {vol.role} — <span className="kr-inline-org">{vol.organization}</span>
                      </h4>
                      <span className="kr-item-date-inline">{vol.dates}</span>
                    </div>
                    <p className="kr-item-desc">{vol.description}</p>
                  </div>
                ))}
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="kr-col">
              {/* 4. Honors and Awards */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Trophy size={14} className="kr-title-icon" /> Honors and Awards
                </h3>
                {secondResumeData.honorsAndAwards.map((hon, idx) => (
                  <div key={idx} className="kr-award-item-compact">
                    <span className="kr-award-line">
                      <strong>{hon.title}</strong>{' '}
                      {hon.issuer && !hon.title.includes(hon.issuer) && (
                        <span className="kr-award-issuer">— {hon.issuer}</span>
                      )}
                    </span>
                    <span className="kr-item-date-inline">{hon.year}</span>
                  </div>
                ))}
              </section>

              {/* 5. Skills and Certifications, including Computer Competencies */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Cpu size={14} className="kr-title-icon" /> Skills & Certifications (Computer Competencies)
                </h3>
                <div className="kr-skill-cat-title">TECHNICAL CERTIFICATIONS</div>
                <ul className="kr-bullet-list" style={{ marginBottom: '0.3rem' }}>
                  {secondResumeData.skillsAndCertifications.certifications.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>

                <div className="kr-skill-cat-title">COMPUTER COMPETENCIES</div>
                {secondResumeData.skillsAndCertifications.computerCompetencies.map((comp, idx) => (
                  <div key={idx} className="kr-comp-block">
                    <span className="kr-comp-label">{comp.category}: </span>
                    <span className="kr-comp-items">{comp.items}</span>
                  </div>
                ))}
              </section>

              {/* 6. Memberships and Extracurricular Activities (including offices held and dates) */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Users size={14} className="kr-title-icon" /> Memberships & Extracurricular Activities
                </h3>
                {secondResumeData.membershipsAndExtracurriculars.map((mem, idx) => (
                  <div key={idx} className="kr-item">
                    <div className="kr-item-header">
                      <h4 className="kr-item-title">{mem.organization}</h4>
                      <span className="kr-item-date-inline">{mem.dates}</span>
                    </div>
                    <div className="kr-item-sub">Office / Role: {mem.officeOrRole}</div>
                    <p className="kr-item-desc">{mem.description}</p>
                  </div>
                ))}
              </section>

              {/* 7. Hobbies and Interests */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Compass size={14} className="kr-title-icon" /> Hobbies and Interests
                </h3>
                <div className="kr-hobbies-list">
                  {secondResumeData.hobbiesAndInterests.map((hob, idx) => (
                    <div key={idx} className="kr-hobby-row">
                      <span className="kr-comp-label">{hob.name}: </span>
                      <span className="kr-comp-items">{hob.detail}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

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
          max-width: 820px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
          background: rgba(30, 41, 59, 0.65);
          padding: 1.2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
        }

        .resume-switcher {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        .switcher-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 1px solid rgba(56, 189, 248, 0.3);
          background: rgba(15, 23, 42, 0.6);
          color: #cbd5e1;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .switcher-btn:hover {
          border-color: #38bdf8;
          color: #ffffff;
        }

        .switcher-btn.active {
          background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
          color: #0f172a;
          border-color: #38bdf8;
          box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35);
        }

        .resume-actions-row {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          justify-content: center;
        }

        .print-hint-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .print-hint {
          font-size: 0.88rem;
          color: var(--text-primary);
          margin: 0;
        }

        .privacy-compliance-note {
          font-size: 0.8rem;
          color: #38bdf8;
          margin: 0;
        }

        /* US Letter 8.5in x 11in 1-Page Layout Container */
        .resume-paper {
          width: 8.5in;
          height: 11in;
          max-height: 11in;
          background: #ffffff;
          color: #0f172a;
          padding: 0.26in 0.32in;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          position: relative;
          font-size: 7.7pt;
          line-height: 1.24;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Blue Theme Header Banner matching Website Palette */
        .kr-header-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 0.5rem 1.2rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 4px;
        }

        .kr-header-banner h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19pt;
          font-weight: 700;
          color: #38bdf8;
          margin: 0;
          letter-spacing: 0.04em;
          line-height: 1.1;
        }

        .kr-header-subtitle {
          font-size: 7.5pt;
          color: #e2e8f0;
          font-weight: 500;
          margin-top: 0.12rem;
          letter-spacing: 0.02em;
        }

        .kr-header-decor-left, .kr-header-decor-right {
          width: 16px;
          height: 24px;
          border-left: 2px solid #38bdf8;
          border-right: 2px solid #38bdf8;
        }

        .kr-contact-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.65rem;
          padding: 0.24rem 0;
          font-size: 7.6pt;
          font-weight: 600;
          color: #334155;
          border-bottom: 1px solid #bae6fd;
          margin-bottom: 0.42rem;
        }

        .kr-bar-sep {
          color: #38bdf8;
          font-weight: 700;
        }

        .kr-grid {
          display: grid;
          grid-template-columns: 1.04fr 1fr;
          gap: 0.85rem;
        }

        .kr-section {
          margin-bottom: 0.44rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .kr-section-title {
          font-size: 8.8pt;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin: 0 0 0.22rem 0;
          padding-bottom: 0.1rem;
          border-bottom: 1.5px solid #38bdf8;
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .kr-title-icon {
          color: #0284c7;
          flex-shrink: 0;
        }

        .kr-text {
          font-size: 7.4pt;
          line-height: 1.24;
          color: #334155;
          margin: 0;
        }

        .kr-item {
          margin-bottom: 0.32rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .kr-item-tight {
          margin-bottom: 0.22rem;
        }

        .kr-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.3rem;
        }

        .kr-item-date {
          font-size: 7pt;
          color: #0369a1;
          font-weight: 600;
          margin-bottom: 0.04rem;
        }

        .kr-item-date-inline {
          font-size: 7pt;
          color: #0369a1;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .kr-item-title {
          font-size: 8pt;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.18;
        }

        .kr-inline-org {
          font-weight: 600;
          color: #0284c7;
        }

        .kr-award-issuer {
          font-weight: 500;
          font-size: 7.1pt;
          color: #475569;
        }

        .kr-item-sub {
          font-size: 7.3pt;
          font-weight: 600;
          color: #0284c7;
          margin-bottom: 0.06rem;
        }

        .kr-item-desc {
          font-size: 7.2pt;
          color: #475569;
          margin: 0.06rem 0;
          line-height: 1.2;
        }

        .kr-bullet-list {
          margin: 0.1rem 0 0 0;
          padding-left: 0.8rem;
          font-size: 7.2pt;
          color: #334155;
        }

        .kr-bullet-list li {
          margin-bottom: 0.07rem;
          line-height: 1.2;
        }

        .kr-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.18rem;
          margin-top: 0.1rem;
        }

        .kr-tech-pill {
          font-size: 6.6pt;
          background: #f0f9ff;
          color: #0369a1;
          padding: 0.04rem 0.26rem;
          border-radius: 2px;
          border: 1px solid #bae6fd;
          font-weight: 500;
        }

        .kr-award-item-compact {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.3rem;
          margin-bottom: 0.1rem;
        }

        .kr-award-line {
          font-size: 7pt;
          line-height: 1.15;
          color: #0f172a;
        }

        /* Blue Kickresume Skills Progress Bars */
        .kr-skill-cat-title {
          font-size: 6.8pt;
          font-weight: 700;
          color: #0369a1;
          letter-spacing: 0.05em;
          margin-bottom: 0.14rem;
        }

        .kr-skills-list {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
        }

        .kr-skill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .kr-skill-name {
          font-size: 7.2pt;
          font-weight: 600;
          color: #0f172a;
        }

        .kr-skill-bar-bg {
          width: 75px;
          height: 5.5px;
          background-color: #e0f2fe;
          border-radius: 2px;
          overflow: hidden;
        }

        .kr-skill-bar-fill {
          height: 100%;
          background-color: #0284c7;
          border-radius: 2px;
        }

        /* Competencies & Hobbies formatting for Resume 2 */
        .kr-comp-block {
          font-size: 7.2pt;
          line-height: 1.2;
          margin-bottom: 0.18rem;
          color: #334155;
        }

        .kr-comp-label {
          font-weight: 700;
          color: #0f172a;
        }

        .kr-comp-items {
          color: #334155;
        }

        .kr-hobbies-list {
          display: flex;
          flex-direction: column;
          gap: 0.16rem;
        }

        .kr-hobby-row {
          font-size: 7.2pt;
          line-height: 1.2;
        }

        /* Vibrant Blue Strengths Badges */
        .kr-strengths-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.22rem;
        }

        .kr-strength-badge {
          background-color: #0284c7;
          color: #ffffff;
          padding: 0.1rem 0.4rem;
          font-size: 6.9pt;
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
            padding: 0.26in 0.32in !important;
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
            gap: 0.85rem;
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
