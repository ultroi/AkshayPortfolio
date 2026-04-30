import React, { useRef, useEffect, useCallback, useState } from 'react';
import '../styles/Projects.css';
import auraThumbnail from '../assets/aura-thumbnail.png';

function Projects() {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseStartX, setMouseStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const carouselRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Aura AI',
      tag: 'Fake News Detector',
      description: 'Built an AI-powered chatbot that detects and flags fake news in real-time using NLP and classification models. Designed a clean, responsive UI with secure authentication (Google OAuth + email login) and scalable backend architecture. Focused on fast response time, accuracy, and user trust.',
      thumbnail: auraThumbnail,
      videoUrl: '', // Add your video URL here later
      repository: 'https://github.com',
      liveDemo: 'https://demo.example.com'
    },
  ];

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.querySelector('.project-card')?.clientWidth || 350;
        const gap = 32;
        const scrollAmount = cardWidth + gap;

        if (isLeftSwipe) {
          carouselRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        } else {
          carouselRef.current.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  // Mouse wheel disabled for the carousel; drag only
  const handleMouseWheel = (e) => {
    if (carouselRef.current && (e.deltaY !== 0 || e.deltaX !== 0)) {
      e.preventDefault();
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setMouseStartX(e.clientX);
    setScrollStartX(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isMouseDown || !carouselRef.current) return;

    const dragDistance = e.clientX - mouseStartX;
    carouselRef.current.scrollLeft = scrollStartX - dragDistance;
  }, [isMouseDown, mouseStartX, scrollStartX]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleUnderDevelopmentClick = (e) => {
    e.preventDefault();
    alert('Under Development phase me hai');
  };

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselRef.current) return;

      const cardWidth = carouselRef.current.querySelector('.project-card')?.clientWidth || 350;
      const gap = 32;
      const scrollAmount = cardWidth + gap;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse drag global listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2>Projects</h2>
          <p className="section-subtitle">
            Projects showcasing real development skills
          </p>
        </div>

        <div
          className="projects-carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleMouseWheel}
          onMouseDown={handleMouseDown}
          style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >
              {/* Project Thumbnail */}
              <div className="project-video-container">
                <div className="project-status-tag">Development</div>
                {project.videoUrl ? (
                  <video 
                    src={project.videoUrl} 
                    controls 
                    className="project-video"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%230a0e27' width='400' height='300'/%3E%3Ccircle cx='200' cy='150' r='40' fill='%2300d4aa' opacity='0.3'/%3E%3C/svg%3E"
                  />
                ) : project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    className="project-thumbnail"
                  />
                ) : (
                  <div className="video-placeholder">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                    <p>Video coming soon</p>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="project-info">
                <h3 className="project-title">
                  {project.title}
                  <span className="project-tag">{project.tag}</span>
                </h3>
                <p className="project-description">{project.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="project-buttons">
                <a 
                  href={project.liveDemo}
                  onClick={handleUnderDevelopmentClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Live Demo</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H10M17 7V14"/>
                  </svg>
                </a>
                <a
                  href={project.repository}
                  onClick={handleUnderDevelopmentClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <span>Code Repository</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;