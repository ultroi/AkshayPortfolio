import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import '../styles/Intro.css';

const codeFragments = [
  'const', 'let', 'function', 'async', '=>', 'class', 'extends',
  '{', '}', '[', ']', '(', ')', '...', '=>', 'map', 'filter',
  'reduce', 'Promise', 'await', 'fetch', 'React', 'Node',
  'API', 'JSON', 'state', 'props', 'render', 'export',
  '=', '===', '&&', '||', '?.', '*', '/', '+', '-'
];

const Intro = ({ onComplete }) => {
  const containerRef = useRef(null);

  const initAnimation = useCallback(() => {
    const createCodeFragments = () => {
      const container = document.getElementById('codeFragments');
      if (!container) return;
      
      container.innerHTML = '';
      const fragmentCount = 25;

      for (let i = 0; i < fragmentCount; i++) {
        const fragment = document.createElement('div');
        fragment.className = 'code-fragment';
        fragment.textContent = codeFragments[Math.floor(Math.random() * codeFragments.length)];
        
        const angle = (Math.PI * 2 * i) / fragmentCount;
        const radius = Math.random() * 300 + 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        fragment.style.left = `calc(50% + ${x}px)`;
        fragment.style.top = `calc(50% + ${y}px)`;
        
        container.appendChild(fragment);
      }
    };

    createCodeFragments();

    const fragments = document.querySelectorAll('.code-fragment');
    
    fragments.forEach((fragment, index) => {
      const delay = index * 0.02;
      
      gsap.fromTo(fragment, 
        {
          scale: 0.5,
          opacity: 0.1,
          rotation: 0,
          x: 0,
          y: 0
        },
        {
          scale: 1.2,
          opacity: 0.6,
          rotation: 180,
          x: "-=100",
          y: "-=100",
          duration: 2,
          delay: delay,
          ease: "power2.inOut"
        }
      );
      
      gsap.to(fragment, {
        opacity: 0,
        scale: 0.3,
        duration: 1,
        delay: 2.5 + delay
      });
    });

    gsap.to(".center-glow", {
      scale: 1.5,
      opacity: 0.8,
      duration: 1.5,
      delay: 1.5,
      ease: "power2.inOut"
    });

    const letters = document.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
      gsap.fromTo(letter,
        {
          opacity: 0,
          y: 100,
          scale: 0.5,
          rotation: -15,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 3 + (index * 0.03),
          ease: "back.out(1.7)"
        }
      );
    });

    gsap.to("#titleContainer", {
      opacity: 1,
      duration: 1,
      delay: 2.8
    });

    gsap.to(".title-main", {
      textShadow: "0 0 50px rgba(0, 245, 255, 0.8)",
      duration: 0.5,
      delay: 4.5
    });

    gsap.to([".title-container", ".center-glow"], {
      opacity: 0,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    gsap.ticker.fps(60);
  }, [onComplete]);

  useEffect(() => {
    initAnimation();
  }, [initAnimation]);

  return (
    <div className="intro-container" ref={containerRef}>
      <div className="code-fragments" id="codeFragments"></div>
      <div className="center-glow"></div>
      <div className="title-container" id="titleContainer">
        <div className="title-main" id="mainTitle">
          <span className="letter" data-letter="A">A</span>
          <span className="letter" data-letter="k">k</span>
          <span className="letter" data-letter="s">s</span>
          <span className="letter" data-letter="h">h</span>
          <span className="letter" data-letter="a">a</span>
          <span className="letter" data-letter="y">y</span>
          <span>&nbsp;</span>
          <span className="letter" data-letter="P">P</span>
          <span className="letter" data-letter="o">o</span>
          <span className="letter" data-letter="r">r</span>
          <span className="letter" data-letter="t">t</span>
          <span className="letter" data-letter="f">f</span>
          <span className="letter" data-letter="o">o</span>
          <span className="letter" data-letter="l">l</span>
          <span className="letter" data-letter="i">i</span>
          <span className="letter" data-letter="o">o</span>
        </div>
        <div className="title-sub">Welcome To Akshay Portfolio</div>
      </div>
    </div>
  );
};

export default Intro;
