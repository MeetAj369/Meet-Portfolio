import { useEffect } from 'react';

/* Hooks */
import { useTheme } from './hooks/useTheme';
import { useScrollPosition } from './hooks/useScrollPosition';

/* Common components */
import Navbar from './components/common/Navbar/Navbar';
import PageTransition from './components/common/PageTransition/PageTransition';
import ScrollProgress from './components/common/ScrollProgress/ScrollProgress';
import BackToTop from './components/common/BackToTop/BackToTop';
import ParticleBackground from './components/common/ParticleBackground/ParticleBackground';
import Footer from './components/common/Footer/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import AIAssistant from './components/common/AIAssistant/AIAssistant';

/* Complete Unified Portfolio Sections */
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Statistics from './components/sections/Statistics/Statistics';
import WhatIBuild from './components/sections/WhatIBuild/WhatIBuild';
import Skills from './components/sections/Skills/Skills';
import Projects from './components/sections/Projects/Projects';
import Experience from './components/sections/Experience/Experience';
import Certifications from './components/sections/Certifications/Certifications';
import Education from './components/sections/Education/Education';
import Resume from './components/sections/Resume/Resume';
import Contact from './components/sections/Contact/Contact';

import styles from './App.module.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useScrollPosition();

  /* Handle direct URL hash landing (e.g. #projects, #about) and hashchange */
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        const clean = window.location.hash.replace('#', '').toLowerCase();
        const targetId = clean === 'home' ? 'hero' : clean;
        const el = document.getElementById(targetId);
        if (el) {
          const navEl = document.querySelector('header');
          const navHeight = navEl ? navEl.offsetHeight : 72;
          const elementTop = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementTop - navHeight - 18),
            behavior: 'smooth'
          });
        }
      }
    };

    const timer = setTimeout(scrollToHash, 80);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  /* Keyboard shortcut: Alt + T toggles Dark/Light theme */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <div className={styles.app}>
      <PageTransition />
      <ParticleBackground />
      <ScrollProgress />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main className={styles.mainViewport}>
        <ErrorBoundary>
          <Hero />
          <hr className="section-divider" aria-hidden="true" />
          <About />
          <Statistics />
          <hr className="section-divider" aria-hidden="true" />
          <WhatIBuild />
          <Skills />
          <hr className="section-divider" aria-hidden="true" />
          <Projects />
          <hr className="section-divider" aria-hidden="true" />
          <Experience />
          <Certifications />
          <Education />
          <hr className="section-divider" aria-hidden="true" />
          <Resume />
          <Contact />
        </ErrorBoundary>
      </main>

      <Footer />
      <AIAssistant />
      <BackToTop />
    </div>
  );
}

export default App;
