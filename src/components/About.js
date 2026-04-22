import React from 'react';
import '../styles/About.css';
import { getAcademicStatus } from '../utils/academicStatus';

function About() {
  const academicStatus = getAcademicStatus(2024);

  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2>About Me</h2>
        <div className="about-content about-content-center">
          <div className="about-text">
            <p>
              I'm a <strong>{academicStatus.academicYear} year BCA student</strong> at my college, currently in my <strong>{academicStatus.semester} semester</strong>.
              I'm on a mission to become a professional <strong>Software Engineer</strong> with expertise in
              <strong> web development</strong> and <strong>frontend technologies</strong>.
            </p>
            <p>
              My learning journey focuses on <strong>strong coding fundamentals</strong> paired with
              <strong> real-world project experience</strong>. I believe in learning by building rather than
              just consuming tutorials. This approach has helped me develop problem-solving skills and
              understand how systems work at scale.
            </p>
            <p>
              <strong>My Goal:</strong> Become industry-ready, land an internship, and contribute to
              meaningful projects that solve real problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
