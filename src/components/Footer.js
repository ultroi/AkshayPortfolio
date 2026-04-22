import React from 'react';
import '../styles/Footer.css';
import { getAcademicStatus } from '../utils/academicStatus';

function Footer() {
  const academicStatus = getAcademicStatus(2024);

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">

        {/* TOP CTA */}
        <div className="footer-cta">
          <h2>Let’s build something real.</h2>
          <p>Open to internships & real-world projects.</p>
          <a href="mailto:akshaysingh19040@gmail.com" className="cta-btn">
            Contact Me
          </a>
        </div>

        <div className="footer-divider"></div>

        {/* MAIN CONTENT */}
        <div className="footer-content">

          <div className="footer-section">
            <h3>Akshay Singh</h3>
            <p>{academicStatus.label} • Web Developer</p>
            <p>Focused on building fast, scalable apps.</p>
          </div>

          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-socials">
              <a href="https://github.com/ultroi" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://instagram.com/a_kshay904" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="mailto:akshaysingh19040@gmail.com" aria-label="Email" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c1.1 0-2 .9-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© 2024 Akshay Singh</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
