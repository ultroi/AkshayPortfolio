import React from 'react';
import '../styles/Skills.css';

function Skills() {
  const skillCategories = [
    {
      title: 'Currently Learning',
      icon: '🎓',
      skills: ['JavaScript', 'Web Development', 'React', 'Frontend Development']
    },
    {
      title: 'Core Skills',
      icon: '⚙️',
      skills: ['Problem Solving', 'Data Structures', 'Algorithms', 'OOP Concepts']
    },
    {
      title: 'Tech Stack',
      icon: '🛠️',
      skills: ['HTML/CSS', 'JavaScript', 'Python', 'MongoDB']
    },
    {
      title: 'Tools & Platforms',
      icon: '🔧',
      skills: ['Git & GitHub', 'VS Code', 'MongoDB Atlas', 'Telegram Bot API']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <h2>Skills & Technologies</h2>
        <p className="section-subtitle">Technologies I'm proficient with and actively learning</p>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
