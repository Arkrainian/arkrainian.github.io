import React from 'react';
import { resumeData } from '../../data/resumeData';
import { Calendar } from 'lucide-react';

const Experience = () => {
  return (
    <div className="page-transition">
      <h2 className="section-title">Professional Experience</h2>

      <div className="timeline">
        {resumeData.experience.map((job, index) => (
          <div key={job.id} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content glass-panel">
              <div className="job-header">
                <h3 className="job-role">{job.role}</h3>
                <span className="job-period">
                  <Calendar size={16} /> {job.period}
                </span>
              </div>
              <h4 className="job-company">{job.company}</h4>
              {Array.isArray(job.description) ? (
                <ul className="job-description-list">
                  {job.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p className="job-description">{job.description}</p>
              )}
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

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .timeline-item {
          position: relative;
          padding-left: 2.5rem;
          margin-bottom: 3rem;
        }

        .timeline-marker {
          position: absolute;
          left: -5px;
          top: 0;
          width: 12px;
          height: 12px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-glow);
          z-index: 1;
        }

        .timeline-content {
          padding: 1.5rem;
          transition: transform 0.3s ease;
        }

        .timeline-content:hover {
          transform: translateX(5px);
          background: rgba(30, 41, 59, 0.9);
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .job-role {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .job-period {
          font-size: 0.875rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .job-company {
          font-size: 1.1rem;
          color: var(--accent-secondary);
          margin-bottom: 1rem;
        }

        .job-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .job-description-list {
          color: var(--text-secondary);
          list-style-type: disc;
          padding-left: 1.2rem;
          margin-top: 0.5rem;
        }

        .job-description-list li {
            margin-bottom: 0.5rem;
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .timeline::before {
            left: 0px;
          }
          .timeline-item {
            padding-left: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Experience;
