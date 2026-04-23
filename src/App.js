import React, { useState } from 'react';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activity from './components/Activity';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="App">
      {showIntro ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Activity />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
