import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { resumeData } from '../../data/resumeData';
import {
  Printer,
  GraduationCap,
  Briefcase,
  Trophy,
  Cpu,
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

  const { secondResumeData } = resumeData;

  const handlePrint = () => {
    window.print();
  };

  // Skills formatted for progress bars in Résumé 1
  const programmingSkills = [
    { name: 'Python / AI & ML (PyTorch, TensorFlow)', level: 100 },
    { name: 'Web (React, JS, TypeScript, HTML/CSS)', level: 95 },
    { name: 'C++ / C / Computational Physics', level: 90 },
    { name: 'Luau, Java & Autonomous Systems', level: 88 },
    { name: 'Generative AI, LLMs, CUDA & OpenGL', level: 85 }
  ];

  const designToolsSkills = [
    { name: 'Graphic Design, UI/UX & Adobe Suite', level: 95 },
    { name: 'Linux, Cybersecurity & WireGuard VPN', level: 88 },
    { name: 'Data Science, R & Statistical Modeling', level: 85 },
    { name: 'Blender 3D, Three.js & Robotics SDK', level: 82 }
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
            Résumé 1: Modern Visual Format
          </button>
          <button
            type="button"
            onClick={() => handleVersionChange(2)}
            className={`switcher-btn ${activeResume === 2 ? 'active' : ''}`}
          >
            <FileText size={16} />
            Résumé 2: Classic Academic Outline Format
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
            ✓ Includes all 8 required sections (Name, Research & Work Experience, Academic Experience, Honors & Awards, Skills & Certifications / Computer Competencies, Memberships & Extracurriculars with offices & dates, Hobbies & Interests, Volunteerism) and omits all personal/demographic information.
          </p>
        </div>
      </div>

      {activeResume === 1 ? (
        /* =========================================================
           RÉSUMÉ 1: MODERN VISUAL 2-COLUMN FORMAT (WITH SKILL BARS)
           ========================================================= */
        <div className="resume-paper">
          {/* Header Banner - Strictly Name & Professional Subtitle (No SSN, DOB, Race, Sex, or Personal Info) */}
          <div className="kr-header-banner">
            <div className="kr-header-decor-left"></div>
            <div>
              <h1>{secondResumeData.name}</h1>
              <div className="kr-header-subtitle">{secondResumeData.subtitle}</div>
            </div>
            <div className="kr-header-decor-right"></div>
          </div>

          {/* 2-Column Resume Content Grid */}
          <div className="kr-grid" style={{ marginTop: '0.4rem' }}>
            {/* Left Column */}
            <div className="kr-col">
              {/* 1. Research and Work Experience (including past internships) */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Briefcase size={13} className="kr-title-icon" /> Research and Work Experience
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
                  <GraduationCap size={13} className="kr-title-icon" /> Academic Experience
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
                  <HeartHandshake size={13} className="kr-title-icon" /> Volunteerism
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

            {/* Right Column */}
            <div className="kr-col">
              {/* 4. Honors and Awards */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Trophy size={13} className="kr-title-icon" /> Honors and Awards
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
                  <Cpu size={13} className="kr-title-icon" /> Skills & Certifications (Computer Competencies)
                </h3>
                <div className="kr-skill-cat-title">CERTIFICATIONS</div>
                <ul className="kr-bullet-list" style={{ marginBottom: '0.22rem' }}>
                  {secondResumeData.skillsAndCertifications.certifications.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>

                <div className="kr-skill-cat-title">COMPUTER COMPETENCIES</div>
                <div className="kr-skills-list">
                  {[...programmingSkills, ...designToolsSkills].map((sk, i) => (
                    <div key={i} className="kr-skill-row">
                      <span className="kr-skill-name">{sk.name}</span>
                      <div className="kr-skill-bar-bg">
                        <div className="kr-skill-bar-fill" style={{ width: `${sk.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Memberships and Extracurricular Activities (including offices held and dates) */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Users size={13} className="kr-title-icon" /> Memberships & Extracurricular Activities
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
                  <Compass size={13} className="kr-title-icon" /> Hobbies and Interests
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
      ) : (
        /* =========================================================
           RÉSUMÉ 2: CLASSIC ACADEMIC OUTLINE FORMAT
           ========================================================= */
        <div className="resume-paper resume-paper-v2">
          {/* Header - Strictly Name Only (No SSN, Birth Date, Ethnicity, Race, Sex, or Personal Info) */}
          <div className="v2-classic-header">
            <h1>{secondResumeData.name}</h1>
            <div className="v2-classic-subtitle">{secondResumeData.subtitle}</div>
          </div>

          <div className="kr-grid kr-grid-v2">
            {/* LEFT COLUMN */}
            <div className="kr-col">
              {/* 1. Research and Work Experience (including past internships) */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Briefcase size={13} className="kr-title-icon" /> Research and Work Experience
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
                  <GraduationCap size={13} className="kr-title-icon" /> Academic Experience
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
                  <HeartHandshake size={13} className="kr-title-icon" /> Volunteerism
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
                  <Trophy size={13} className="kr-title-icon" /> Honors and Awards
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
                  <Cpu size={13} className="kr-title-icon" /> Skills and Certifications, including Computer Competencies
                </h3>
                <div className="kr-skill-cat-title">CERTIFICATIONS</div>
                <ul className="kr-bullet-list" style={{ marginBottom: '0.25rem' }}>
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
                  <Users size={13} className="kr-title-icon" /> Memberships and Extracurricular Activities
                </h3>
                {secondResumeData.membershipsAndExtracurriculars.map((mem, idx) => (
                  <div key={idx} className="kr-item">
                    <div className="kr-item-header">
                      <h4 className="kr-item-title">{mem.organization}</h4>
                      <span className="kr-item-date-inline">{mem.dates}</span>
                    </div>
                    <div className="kr-item-sub">Office / Role Held: {mem.officeOrRole}</div>
                    <p className="kr-item-desc">{mem.description}</p>
                  </div>
                ))}
              </section>

              {/* 7. Hobbies and Interests */}
              <section className="kr-section">
                <h3 className="kr-section-title">
                  <Compass size={13} className="kr-title-icon" /> Hobbies and Interests
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
          font-size: 0.78rem;
          color: #38bdf8;
          margin: 0;
          line-height: 1.35;
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
          font-size: 7.6pt;
          line-height: 1.24;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Blue Theme Header Banner matching Website Palette */
        .kr-header-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 0.48rem 1.2rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 4px;
        }

        .kr-header-banner h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18.5pt;
          font-weight: 700;
          color: #38bdf8;
          margin: 0;
          letter-spacing: 0.04em;
          line-height: 1.1;
        }

        .kr-header-subtitle {
          font-size: 7.4pt;
          color: #e2e8f0;
          font-weight: 500;
          margin-top: 0.1rem;
          letter-spacing: 0.02em;
        }

        .kr-header-decor-left, .kr-header-decor-right {
          width: 16px;
          height: 24px;
          border-left: 2px solid #38bdf8;
          border-right: 2px solid #38bdf8;
        }

        /* Classic Academic Header for Résumé 2 */
        .v2-classic-header {
          text-align: center;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 0.3rem;
          margin-bottom: 0.4rem;
        }

        .v2-classic-header h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19pt;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          letter-spacing: 0.03em;
          line-height: 1.1;
        }

        .v2-classic-subtitle {
          font-size: 7.6pt;
          color: #0369a1;
          font-weight: 600;
          margin-top: 0.1rem;
        }

        .kr-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1.02fr 1fr;
          gap: 0.85rem;
          align-items: stretch;
        }

        .kr-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .kr-section {
          margin-bottom: 0.2rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .kr-section-title {
          font-size: 8.2pt;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.28rem;
          margin: 0 0 0.18rem 0;
          padding-bottom: 0.08rem;
          border-bottom: 1.5px solid #38bdf8;
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .kr-title-icon {
          color: #0284c7;
          flex-shrink: 0;
        }

        .kr-item {
          margin-bottom: 0.28rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .kr-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.25rem;
        }

        .kr-item-date-inline {
          font-size: 6.8pt;
          color: #0369a1;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .kr-item-title {
          font-size: 7.7pt;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.16;
        }

        .kr-inline-org {
          font-weight: 600;
          color: #0284c7;
        }

        .kr-award-issuer {
          font-weight: 500;
          font-size: 6.8pt;
          color: #475569;
        }

        .kr-item-sub {
          font-size: 7.1pt;
          font-weight: 600;
          color: #0284c7;
          margin-bottom: 0.04rem;
        }

        .kr-item-desc {
          font-size: 7pt;
          color: #475569;
          margin: 0.04rem 0;
          line-height: 1.18;
        }

        .kr-bullet-list {
          margin: 0.08rem 0 0 0;
          padding-left: 0.8rem;
          font-size: 7pt;
          color: #334155;
        }

        .kr-bullet-list li {
          margin-bottom: 0.05rem;
          line-height: 1.18;
        }

        .kr-award-item-compact {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 0.09rem;
        }

        .kr-award-line {
          font-size: 6.9pt;
          line-height: 1.15;
          color: #0f172a;
        }

        /* Blue Kickresume Skills Progress Bars */
        .kr-skill-cat-title {
          font-size: 6.6pt;
          font-weight: 700;
          color: #0369a1;
          letter-spacing: 0.05em;
          margin-bottom: 0.12rem;
        }

        .kr-skills-list {
          display: flex;
          flex-direction: column;
          gap: 0.14rem;
        }

        .kr-skill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .kr-skill-name {
          font-size: 6.9pt;
          font-weight: 600;
          color: #0f172a;
        }

        .kr-skill-bar-bg {
          width: 70px;
          height: 5px;
          background-color: #e0f2fe;
          border-radius: 2px;
          overflow: hidden;
        }

        .kr-skill-bar-fill {
          height: 100%;
          background-color: #0284c7;
          border-radius: 2px;
        }

        /* Competencies & Hobbies formatting */
        .kr-comp-block {
          font-size: 7pt;
          line-height: 1.18;
          margin-bottom: 0.14rem;
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
          gap: 0.12rem;
        }

        .kr-hobby-row {
          font-size: 7pt;
          line-height: 1.18;
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
            padding: 0.25in 0.32in !important;
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

          .kr-grid {
            flex: 1 !important;
            display: flex !important;
            flex-direction: row;
            gap: 0.85rem;
            align-items: stretch !important;
          }
          
          .kr-col {
            flex: 1;
            display: flex !important;
            flex-direction: column;
            justify-content: space-between !important;
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
