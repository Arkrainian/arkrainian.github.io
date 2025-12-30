import React from 'react';
import { resumeData } from '../../data/resumeData';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = React.useState(null);

  return (
    <div className="page-transition">
      <h2 className="section-title">Technical Skills</h2>
      <div className="skills-container">
        <section className="skills-section">
          <h3 className="skills-category-title">Fully Learned</h3>
          <div className="skills-grid">
            {resumeData.skills.filter(s => s.status === 'learned').map((skill, index) => (
              <div
                key={index}
                className="skill-card glass-panel interactive-card"
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1}s` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>


      <div className="skills-container">
        <section className="skills-section">
          <h3 className="skills-category-title">Currently Learning</h3>
          <div className="skills-grid">
            {resumeData.skills.filter(s => s.status === 'learning').map((skill, index) => (
              <div
                key={index}
                className="skill-card glass-panel interactive-card"
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div
                    className="skill-bar-fill learning-bar"
                    style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1}s` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hobbies & Interests Section */}
        {resumeData.otherSkills && resumeData.otherSkills.length > 0 && (
          <section className="skills-section">
            <h2 className="section-title">Learning etc</h2>

            <div className="skills-grid">
              {resumeData.otherSkills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-card glass-panel interactive-card"
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill hobby-bar"
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 0.1}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="skill-modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="skill-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedSkill(null)}>×</button>
            <h3 className="modal-title">{selectedSkill.name}</h3>
            <div className="modal-bar-container">
              <div className="modal-bar-bg">
                <div
                  className={`modal-bar-fill ${selectedSkill.status === 'learning' ? 'learning-bar' : ''}`}
                  style={{ width: `${selectedSkill.level}%` }}
                ></div>
              </div>
              <span className="modal-percentage">{selectedSkill.level}% Proficiency</span>
            </div>
            <p className="modal-description">{selectedSkill.description}</p>
          </div>
        </div>
      )}

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

        .skills-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .skills-category-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .skills-category-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 480px) {
          .skills-category-title {
            font-size: 1.2rem;
          }
          
          .skill-card {
            padding: 1rem;
          }
        }

        .skill-card {
          padding: 1.5rem;
          transition: transform 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .skill-name {
          font-weight: 500;
          font-size: 1.1rem;
        }

        .skill-percentage {
          color: var(--accent-primary);
          font-family: var(--font-display);
        }

        .skill-bar-bg {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 4px;
          transform-origin: left;
          animation: slideIn 1s cubic-bezier(0.1, 0, 0.2, 1) forwards;
          transform: scaleX(0);
        }

        .learning-bar {
          background: linear-gradient(90deg, var(--accent-secondary), #a78bfa);
        }

        .hobby-bar {
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }

        @keyframes slideIn {
          to { transform: scaleX(1); }
        }
        .interactive-card {
          cursor: pointer;
        }

        .interactive-card:active {
            transform: scale(0.98);
        }

        .skill-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
            padding: 1rem;
        }

        .skill-modal-content {
            width: 100%;
            max-width: 500px;
            padding: 2rem;
            position: relative;
            transform: scale(0.9);
            animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.2s;
        }

        .close-button:hover {
            color: var(--text-primary);
        }

        .modal-title {
            font-family: var(--font-display);
            font-size: 2rem;
            margin-bottom: 1.5rem;
            color: var(--text-primary);
        }

        .modal-bar-container {
            margin-bottom: 1.5rem;
        }

        .modal-bar-bg {
            width: 100%;
            height: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }

        .modal-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
            border-radius: 5px;
        }

        .modal-percentage {
            font-size: 0.9rem;
            color: var(--accent-primary);
            font-family: var(--font-display);
        }

        .modal-description {
            color: var(--text-secondary);
            line-height: 1.6;
            font-size: 1.1rem;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        @keyframes popIn {
            to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Skills;
