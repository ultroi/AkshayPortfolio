import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">💻</span>
          <span>Akshay Singh</span>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={handleToggleMenu}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="#hero" onClick={handleLinkClick}>Home</a></li>
          <li><a href="#about" onClick={handleLinkClick}>About</a></li>
          <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
          <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
          <li><a href="#activity" onClick={handleLinkClick}>Activity</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
