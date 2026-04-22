import React from 'react';
import '../styles/Footer.css';
import { getAcademicStatus } from '../utils/academicStatus';

function Footer() {
  const academicStatus = getAcademicStatus(2024);

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Akshay Singh</h3>
            <p>Software Engineer | Web Developer | {academicStatus.label}</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Me</h4>
            <div className="hero-socials footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-icon">💻</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon">💼</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" className="social-icon">🐦</a>
              <a href="mailto:akshaysingh19040@gmail.com" title="Email" className="social-icon">✉️</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Get in Touch</h4>
            <p>Interested in collaborating or have a project in mind?</p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=akshaysingh19040@gmail.com" className="email-link">akshaysingh19040@gmail.com</a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; 2024 Akshay Singh. All rights reserved.</p>
          <p>Built with React, passion, and determination 💪</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
