import React from 'react';
import { resumeData } from '../../data/resumeData';
import { Printer, Mail, MapPin, Github, Globe, ExternalLink } from 'lucide-react';

const Resume = () => {
  const { personalInfo, experience, education, skills, awards, projects, pdfResumeData } = resumeData;

  // Destructure settings with defaults as fallback
  const {
    theme = {},
    layout = {},
    content = {}
  } = pdfResumeData || {};

  const handlePrint = () => {
    window.print();
  };

  // Helper to filter and limit content
  const getDisplayItems = (items, limit, show) => {
    if (!show || !items) return [];
    return limit ? items.slice(0, limit) : items;
  };

  const displayProjects = content.selectedProjectIds && content.showProjects
    ? projects.filter(p => content.selectedProjectIds.includes(p.id))
      .sort((a, b) => content.selectedProjectIds.indexOf(a.id) - content.selectedProjectIds.indexOf(b.id))
    : getDisplayItems(projects, content.projectLimit, content.showProjects);
  const displayAwards = content.selectedAwardIds && content.showAwards
    ? awards.filter(a => content.selectedAwardIds.includes(a.id))
      .sort((a, b) => content.selectedAwardIds.indexOf(a.id) - content.selectedAwardIds.indexOf(b.id))
    : getDisplayItems(awards, content.awardLimit, content.showAwards);
  const displayExperience = getDisplayItems(experience, content.experienceLimit, content.showExperience);
  const displayEducation = content.selectedEducationIds && content.showEducation
    ? education.filter(e => content.selectedEducationIds.includes(e.id))
      .sort((a, b) => content.selectedEducationIds.indexOf(a.id) - content.selectedEducationIds.indexOf(b.id))
    : getDisplayItems(education, null, content.showEducation);
  const displaySkills = getDisplayItems(skills, null, content.showSkills);

  return (
    <div className="resume-container">
      <div className="resume-controls no-print">
        <button onClick={handlePrint} className="btn btn-primary">
          <Printer size={18} />
          Print to PDF
        </button>
        <div className="print-hint-box">
          <p className="print-hint"><strong>Print Tip:</strong> Set "Background Graphics" to <strong>ON</strong> and "Margins" to <strong>None</strong> in your browser's print settings.</p>

        </div>
      </div>

      <div className="resume-paper">
        {/* Header */}
        <header className="resume-header">
          <div className="header-main">
            <h1>Krish Sathyan</h1>
            <h2 className="resume-subtitle">{personalInfo.title}</h2>
            <div className="header-contact-inline">
              <div className="contact-item-inline">
                <Mail size={12} />
                <span>{personalInfo.email}</span>
              </div>
              <span className="dot-separator">•</span>
              <div className="contact-item-inline">
                <MapPin size={12} />
                <span>{personalInfo.location}</span>
              </div>
              <span className="dot-separator">•</span>
              <div className="contact-item-inline">
                <Github size={12} />
                <span>{personalInfo.socials.github}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="resume-content">
          {/* Summary & Key Highlights */}
          {content.showSummary && (
            <section className="resume-section profile-section">
              <h3 className="section-title-resume">Professional Profile</h3>
              <p className="summary-text" style={{ marginBottom: (content.showHighlights && content.summaryHighlights) ? '1rem' : '0' }}>
                {personalInfo.summary}
              </p>
              {content.showHighlights && content.summaryHighlights && (
                <ul className="item-list highlights-list">
                  {content.summaryHighlights.slice(0, 4).map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Full-width Technical Expertise (Moved from sidebar) */}
          {content.showSkills && displaySkills.length > 0 && (
            <section className="resume-section expertise-section">
              <h3 className="section-title-resume">Technical Expertise</h3>
              <div className="skills-inline-list">
                {displaySkills.map((skill, i) => (
                  <span key={i} className="skill-pill-resume">
                    {skill.name} {i < displaySkills.length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Full-width Top Experience (Moved from main col) */}
          {content.showExperience && displayExperience.length > 0 && (
            <section className="resume-section snapshot-section">
              <h3 className="section-title-resume">Career Snapshot</h3>
              {displayExperience.slice(0, 2).map((exp) => (
                <div key={exp.id} className="experience-item-full">
                  <div className="item-header">
                    <h4 className="item-title">{exp.role} @ {exp.company}</h4>
                    <span className="item-date">{exp.period}</span>
                  </div>
                  <ul className="item-list">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          <div className="resume-grid">
            <div className="resume-main-col">
              {/* Projects (Full Main Col) */}
              {content.showProjects && displayProjects.length > 0 && (
                <section className={`resume-section ${content.pageBreakBefore?.projects ? 'force-page-break' : ''}`}>
                  <h3 className="section-title-resume">Key Projects</h3>
                  {displayProjects.map((project) => (
                    <div key={project.id} className="project-item">
                      <div className="item-header">
                        <h4 className="item-title">{project.title}</h4>
                        {project.year && <span className="item-date">{project.year}</span>}
                      </div>
                      <p className="project-desc-mini">{project.description}</p>
                      <div className="tech-tags">
                        {project.tech.map((t, i) => (
                          <span key={i} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Remaining Experience (if any) */}
              {content.showExperience && displayExperience.length > 2 && (
                <section className="resume-section" style={{ marginTop: '-0.5rem' }}>
                  <h3 className="section-title-resume">Additional</h3>
                  {displayExperience.slice(2).map((exp) => (
                    <div key={exp.id} className="education-item-ultra-compact">
                      <span className="item-title-small">{exp.role}</span>
                      <span className="dot-separator-small"> • </span>
                      <span className="item-date-small">{exp.period}</span>
                    </div>
                  ))}
                </section>
              )}
            </div>

            <div className="resume-side-col">
              {/* Education */}
              {content.showEducation && displayEducation.length > 0 && (
                <section className={`resume-section ${content.pageBreakBefore?.education ? 'force-page-break' : ''}`}>
                  <h3 className="section-title-resume">Education</h3>
                  {displayEducation.map((edu) => (
                    <div key={edu.id} className="education-item-ultra-compact">
                      <span className="item-title-small">{edu.degree || edu.school}</span>
                      <span className="dot-separator-small"> • </span>
                      <span className="item-date-small">{edu.year}</span>
                      {edu.gpa && (
                        <>
                          <span className="dot-separator-small"> • </span>
                          <span className="item-gpa-small">GPA: {edu.gpa}</span>
                        </>
                      )}
                      {edu.degree && <div className="item-sub-small-inline">{edu.school}</div>}
                    </div>
                  ))}
                </section>
              )}

              {/* Awards */}
              {content.showAwards && displayAwards.length > 0 && (
                <section className={`resume-section ${content.pageBreakBefore?.awards ? 'force-page-break' : ''}`}>
                  <h3 className="section-title-resume">Awards & Honors</h3>
                  {displayAwards.map((award) => (
                    <div key={award.id} className="award-item-resume">
                      <h4 className="item-title-small">{award.title}</h4>
                      <div className="item-date-small">{award.year}</div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>

        <footer className="resume-footer">
          <p>😊</p>
        </footer>
      </div>

      <style>{`
        .resume-container {
          padding-top: 2rem;
          padding-bottom: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }

        .resume-controls {
          margin-bottom: 2rem;
          text-align: center;
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          background: rgba(30, 41, 59, 0.5);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .print-hint-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .print-hint {
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        
        .print-hint-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .resume-paper {
          width: ${layout.paperSize === 'A4' ? '210mm' : '8.5in'};
          min-height: ${layout.paperSize === 'A4' ? '297mm' : '11in'};
          background: ${theme.backgroundColor || '#ffffff'};
          color: ${theme.primaryTextColor || '#0f172a'};
          padding: ${layout.margins || '10mm'};
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          position: relative;
          font-size: ${layout.fontSize || '8.5pt'};
          line-height: 1.25;
        }

        /* Resume Header */
        .resume-header {
          border-bottom: 2pt solid ${theme.accentColor || '#38bdf8'};
          padding-bottom: 0.4rem;
          margin-bottom: 0.5rem;
          text-align: center;
          display: block;
        }

        .resume-header h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: ${layout.headerFontSize || '22pt'};
          font-weight: 700;
          color: ${theme.primaryTextColor || '#0f172a'};
          margin: 0;
          letter-spacing: -0.02em;
        }

        .resume-subtitle {
          font-size: 10pt;
          color: ${theme.accentColor || '#38bdf8'};
          font-weight: 600;
          margin-bottom: 0.3rem;
        }

        .header-contact-inline {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          font-size: 8.5pt;
          color: ${theme.lightTextColor || '#64748b'};
        }

        .contact-item-inline {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .dot-separator {
          opacity: 0.5;
        }

        /* Section and Item Protection */
        .resume-section {
          margin-bottom: 0.8rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .profile-section {
          margin-bottom: 0.6rem;
        }

        .expertise-section, .snapshot-section {
          border-top: 1px solid ${theme.itemBorderColor || '#f1f5f9'};
          padding-top: 0.6rem;
        }

        .skills-inline-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          line-height: 1.6;
        }

        .skill-pill-resume {
          font-weight: 600;
          color: ${theme.secondaryTextColor || '#334155'};
        }

        .experience-item-full {
          margin-bottom: 0.4rem;
        }

        .experience-item-full .item-title {
          font-size: 11.5pt;
        }

        .section-title-resume {
          font-family: 'Space Grotesk', sans-serif;
          font-size: ${layout.sectionTitleFontSize || '10pt'};
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: ${theme.primaryTextColor || '#0f172a'};
          border-bottom: 1px solid ${theme.itemBorderColor || '#e2e8f0'};
          padding-bottom: 0.15rem;
          margin-bottom: 0.4rem;
          font-weight: 700;
        }

        .summary-text {
          color: ${theme.secondaryTextColor || '#334155'};
          text-align: justify;
          margin-bottom: 0.6rem;
        }

        .resume-grid {
          display: grid;
          grid-template-columns: ${layout.columnRatio || '1.6fr 1fr'};
          gap: 1.5rem;
        }

        .experience-item, .project-item, .education-item, .award-item-resume, .skill-item-resume {
          margin-bottom: 0.8rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        /* Force Headers and Titles to stay with their content */
        .section-title-resume, .item-title, .item-header {
          page-break-after: avoid;
          break-after: avoid;
        }

        .force-page-break {
          page-break-before: always;
          break-before: page;
        }

        /* Experience & Projects Items Special Styles */
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.2rem;
        }

        .item-title {
          font-size: 10.5pt;
          font-weight: 700;
          color: ${theme.primaryTextColor || '#0f172a'};
        }

        .item-date {
          font-size: 9pt;
          color: ${theme.lightTextColor || '#64748b'};
          font-weight: 500;
        }

        .item-sub {
          font-size: 9.5pt;
          font-weight: 600;
          color: ${theme.accentColor || '#38bdf8'};
          margin-bottom: 0.4rem;
        }

        .item-list {
          margin: 0;
          padding-left: 1.2rem;
          color: ${theme.secondaryTextColor || '#475569'};
        }

        .item-list li {
          margin-bottom: 0.1rem;
        }

        .project-desc-mini {
          font-size: 8.5pt;
          color: ${theme.secondaryTextColor || '#475569'};
          margin-bottom: 0.3rem;
          line-height: 1.25;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tech-tag {
          font-size: 7.5pt;
          background: ${theme.backgroundColor === '#ffffff' ? '#f1f5f9' : 'rgba(0,0,0,0.05)'};
          color: ${theme.secondaryTextColor || '#475569'};
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
          border: 1px solid ${theme.itemBorderColor || '#e2e8f0'};
        }

        /* Side Column Items */
        .skills-grid-resume {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skill-item-resume {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .skill-name-resume {
          font-size: 9pt;
          font-weight: 600;
          color: ${theme.secondaryTextColor || '#475569'};
        }

        .skill-bar-resume {
          height: 4pt;
          background: ${theme.itemBorderColor || '#f1f5f9'};
          border-radius: 2pt;
          overflow: hidden;
        }

        .skill-progress-resume {
          height: 100%;
          background: ${theme.accentColor || '#38bdf8'};
        }

        .education-item-ultra-compact {
          margin-bottom: 0.15rem;
          font-size: 8pt;
        }

        .item-title-small {
          font-size: 8.5pt;
          font-weight: 700;
          color: ${theme.primaryTextColor || '#0f172a'};
          margin: 0;
        }

        .item-sub-small {
          font-size: 7.5pt;
          color: ${theme.accentColor || '#38bdf8'};
          font-weight: 600;
        }

        .item-date-small {
          font-size: 7.5pt;
          color: ${theme.lightTextColor || '#94a3b8'};
        }

        .item-gpa-small {
          font-size: 8pt;
          font-weight: 600;
          color: ${theme.secondaryTextColor || '#475569'};
        }

        .award-item-resume {
          margin-bottom: 0.1rem;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
        }

        .resume-footer {
          margin-top: 1.5rem;
          border-top: 1px solid ${theme.itemBorderColor || '#f1f5f9'};
          padding-top: 0.5rem;
          text-align: center;
          font-size: 8pt;
          color: ${theme.lightTextColor || '#94a3b8'};
        }

        /* Print Specifics */
        @media print {
          @page {
            margin: 0;
            size: ${layout.paperSize === 'A4' ? 'A4' : 'letter'};
          }
          
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }

          .resume-container {
            padding: 0 !important;
            margin: 0 !important;
          }

          .resume-paper {
            width: 100% !important;
            min-height: 0 !important; /* Allow it to shrink/grow naturally across pages */
            box-shadow: none !important;
            padding: ${layout.margins || '20mm'} !important;
            margin: 0 !important;
            background: ${theme.backgroundColor || '#ffffff'} !important;
            color: ${theme.primaryTextColor || '#0f172a'} !important;
            display: block !important; /* Block is safest for pagination */
          }

          .skills-horizontal-grid {
             grid-template-columns: repeat(4, 1fr) !important;
          }

          .resume-grid {
            display: flex !important; /* Flex is better than Grid for some print engines */
            flex-direction: row;
            gap: 2.5rem;
          }
          
          .resume-main-col {
            flex: 1.5;
          }
          
          .resume-side-col {
            flex: 1;
          }
          
          /* Prevent widow/orphan lines */
          p, li {
            widows: 3;
            orphans: 3;
          }

          /* Force colors in print */
          .resume-header {
            border-bottom-color: ${theme.accentColor || '#38bdf8'} !important;
            -webkit-print-color-adjust: exact;
          }
          .resume-subtitle, .item-sub, .item-sub-small, .skill-progress-resume {
            color: ${theme.accentColor || '#38bdf8'} !important;
            -webkit-print-color-adjust: exact;
          }
          .skill-progress-resume {
            background-color: ${theme.accentColor || '#38bdf8'} !important;
          }
          
          h1, h2, h3, h4, .item-title, .item-title-small {
            color: ${theme.primaryTextColor || '#0f172a'} !important;
          }
          
          .summary-text, .item-list, .project-desc-mini, .skill-name-resume {
            color: ${theme.secondaryTextColor || '#475569'} !important;
          }
          
          .resume-footer {
            display: none !important;
          }
        }

        /* Mobile Adjustments for preview */
        @media (max-width: 850px) {
          .resume-paper {
            width: 95vw;
            height: auto;
            padding: 1.5rem;
          }
          .resume-grid {
            grid-template-columns: 1fr;
          }
          .skills-horizontal-grid {
            grid-template-columns: 1fr 1fr;
          }
          .resume-header {
            flex-direction: column;
            gap: 1rem;
          }
          .header-contact {
            text-align: left;
          }
          .contact-item {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
