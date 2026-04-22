import React, { useState, useRef, useEffect } from 'react';
import '../styles/Projects.css';

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'detail'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const carouselRef = useRef(null);
  const activeCardRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'AI Chat Assistant',
      tagline: 'Context-aware chatbot handling 200+ concurrent users in real-time',
      category: 'Machine Learning',
      shortDescription: 'Context-aware AI with natural language understanding and fine-tuning',
      image: '🤖',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      repository: 'https://github.com',
      liveDemo: 'https://demo.example.com',
      screenshot: '📊',
      
      problem: 'Traditional chatbots lack context retention and fail to understand user intent across multi-turn conversations, leading to poor user experience.',
      
      solution: 'Built a transformer-based NLP system with dynamic context memory management. Implemented fine-tuned models on domain-specific data with FastAPI backend for low-latency inference.',
      
      impact: [
        '200+ concurrent users handled',
        'API response < 200ms average',
        '95% intent classification accuracy',
        'Real-time handling of 50K+ events/day'
      ],
      
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL'],
      complexity: 'Advanced',
      status: 'In Development',
      
      features: [
        'Multi-turn context retention with memory buffer',
        'Intent classification with confidence scoring',
        'Entity recognition and extraction pipeline',
        'Custom knowledge base integration',
        'Real-time WebSocket communication'
      ],
      
      highlights: [
        'Fine-tuned transformer model',
        'Context memory management',
        'Real-time API performance'
      ]
    }
  ];

  const project = projects[currentIndex];

  // Auto-center active card on mount and when index changes
  useEffect(() => {
    if (!carouselRef.current || !activeCardRef.current) return;

    const carousel = carouselRef.current;
    const card = activeCardRef.current;

    // Skip scrolling if carousel doesn't scroll
    if (carousel.scrollWidth <= carousel.clientWidth) return;

    // Calculate scroll position accounting for container offset
    const targetScroll =
      card.offsetLeft -
      carousel.offsetLeft -
      (carousel.clientWidth / 2) +
      (card.clientWidth / 2);

    carousel.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

  }, [currentIndex, viewMode]);

  const handleCardClick = (index) => {
    if (isTransitioning) return;
    setCurrentIndex(index);
  };

  // Smooth wheel scroll for horizontal carousel
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Only intercept if carousel is horizontal scrollable
      if (el.scrollWidth <= el.clientWidth) return;
      
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.2; // smooth horizontal
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleViewDetails = (index) => {
    if (isTransitioning) return;
    setCurrentIndex(index);
    setIsTransitioning(true);
    setViewMode('detail');
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleBackToPreview = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setViewMode('preview');
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleNextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNextProject();
      else handlePrevProject();
    }
    setTouchStart(null);
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2>Projects</h2>
          <p className="section-subtitle">
            Projects demonstrating real development skills
          </p>
        </div>

        {/* PREVIEW MODE */}
        {viewMode === 'preview' && (
          <div className={`preview-mode ${isTransitioning ? 'transitioning' : ''}`}>
            {/* Horizontal Scrollable Cards */}
            <div 
              className="projects-carousel" 
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {projects.map((p, index) => (
                <div
                  key={`project-${p.title}`}
                  ref={index === currentIndex ? activeCardRef : null}
                  className={`project-mini-card ${index === currentIndex ? 'active' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(index);
                    }
                  }}
                >
                  <div className="card-glow" style={{ background: p.gradient }}></div>
                  <div className="mini-card-icon">{p.image}</div>
                  <div className="mini-card-content">
                    <div className="mini-card-category">{p.category}</div>
                    <h3 className="mini-card-title">{p.title}</h3>
                    <p className="mini-card-description">{p.shortDescription.substring(0, 80)}...</p>
                  </div>

                  <button 
                    className="mini-card-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(index);
                    }}
                  >
                    <span>Explore</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* DETAIL MODE */}
        {viewMode === 'detail' && (
          <div className={`detail-mode ${isTransitioning ? 'transitioning' : ''}`}>
            <div className="detail-container">
              
              {/* HEADER SECTION */}
              <header className="detail-header-section">
                <div className="detail-header-top">
                  <button 
                    className="detail-back-button"
                    onClick={handleBackToPreview}
                    title="Back to projects"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span>Back</span>
                  </button>
                </div>

                <div className="detail-header-content">
                  <div className="detail-header-title-block">
                    <span className="detail-category-badge" style={{ background: project.gradient }}>
                      {project.category}
                    </span>
                    <h1 className="detail-project-title">{project.title}</h1>
                    <p className="detail-tagline">{project.tagline}</p>
                  </div>

                  <div className="detail-header-actions">
                    <a href={project.liveDemo} className="detail-action-button demo" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      <span>Live Demo</span>
                    </a>
                    <a href={project.repository} className="detail-action-button github" target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </header>

              {/* HERO SECTION */}
              <section className="detail-hero-section">
                <div className="detail-hero-visual">
                  <div className="detail-screenshot-placeholder">
                    {project.screenshot}
                  </div>
                </div>
              </section>

              {/* PROBLEM SECTION */}
              <section className="detail-content-section">
                <h2 className="detail-section-title">The Problem</h2>
                <p className="detail-section-text">{project.problem}</p>
              </section>

              {/* SOLUTION SECTION */}
              <section className="detail-content-section">
                <h2 className="detail-section-title">The Solution</h2>
                <p className="detail-section-text">{project.solution}</p>
              </section>

              {/* IMPACT SECTION */}
              <section className="detail-content-section">
                <h2 className="detail-section-title">Impact & Results</h2>
                <div className="detail-impact-grid">
                  {project.impact.map((metric, i) => (
                    <div key={i} className="detail-impact-item">
                      <div className="detail-impact-dot"></div>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* TECH STACK SECTION */}
              <section className="detail-content-section">
                <h2 className="detail-section-title">Tech Stack</h2>
                <div className="detail-tech-chips">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="detail-tech-chip">{tech}</span>
                  ))}
                </div>
              </section>

              {/* FEATURES SECTION */}
              <section className="detail-content-section">
                <h2 className="detail-section-title">Key Features</h2>
                <ul className="detail-features-list">
                  {project.features.map((feature, i) => (
                    <li key={i} className="detail-feature-item">
                      <div className="detail-feature-checkmark">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* PROJECT STATUS */}
              <section className="detail-content-section detail-status-section">
                <div className="detail-status-info">
                  <div className="detail-status-item">
                    <span className="detail-status-label">Status</span>
                    <span className={`detail-status-badge ${project.status.toLowerCase().replace(/\s/g, '-')}`}>
                      <span className="detail-status-dot"></span>
                      {project.status}
                    </span>
                  </div>
                  <div className="detail-status-item">
                    <span className="detail-status-label">Complexity</span>
                    <span className="detail-complexity-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      {project.complexity}
                    </span>
                  </div>
                </div>
              </section>

              {/* FOOTER ACTION */}
              <section className="detail-footer-section">
                <a href={project.repository} className="detail-primary-button" target="_blank" rel="noopener noreferrer">
                  <span>View Full Repository</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 7h10v10M7 17L17 7"/>
                  </svg>
                </a>
              </section>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;