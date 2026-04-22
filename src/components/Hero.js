import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I'm Akshay.<br />
          <span className="subtitle-gradient">A software engineer.</span>
        </h1>
        {/* <p className="hero-description">
          BCA student {academicStatus.summary} with a passion for building scalable web applications.
          Primarily working in the JavaScript ecosystem with focus on frontend development and backend fundamentals.
        </p> */}
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get in Touch</a>
        </div>
        <div className="hero-socials">
          <a
            href="https://github.com/ultroi"
            title="GitHub"
            className="social-icon"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 .297C5.37 .297 0 5.67 0 12.29c0 5.29 3.438 9.773 8.205 11.363.6.11.82-.26.82-.58 0-.29-.01-1.04-.016-2.04-3.338.73-4.042-1.61-4.042-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.236 1.84 1.236 1.07 1.83 2.81 1.31 3.495.998.108-.78.42-1.31.762-1.60-2.665-.31-5.466-1.33-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.30-.536-1.52.117-3.17 0 0 1.008-.32 3.3 1.23.96-.27 1.98-.40 3-.405 1.02.006 2.04.138 3 .405 2.28-1.55 3.285-1.23 3.285-1.23.656 1.65.244 2.87.12 3.17.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.815 1.10.815 2.22 0 1.61-.014 2.90-.014 3.29 0 .32.21.69.825.58C20.565 22.06 24 17.58 24 12.29c0-6.62-5.373-11.99-12-11.99z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            title="LinkedIn"
            className="social-icon"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M4.98 3.5C4.98 2.12 6.1 1 7.49 1s2.51 1.12 2.51 2.5S8.88 6 7.49 6 4.98 4.88 4.98 3.5zM.5 24h6V8.99h-6V24zm8.49-15.01h5.25v2.08h.08c.73-1.37 2.51-2.82 5.16-2.82 5.37 0 6.01 4.85 6.01 10.33V24h-6.01v-5.82c0-1.39 0-3.18-1.94-3.18-1.94 0-2.24 1.52-2.24 3.09V24h-6V8.99z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/a_kshay904"
            title="Instagram"
            className="social-icon"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM17.75 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
            </svg>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=akshaysingh19040@gmail.com"
            title="Email"
            className="social-icon"
            aria-label="Email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="gradient-blob"></div>
      </div>
    </section>
  );
}

export default Hero;
