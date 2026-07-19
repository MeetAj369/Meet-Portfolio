import { useState, useEffect, lazy, Suspense } from 'react';

/* Hooks */
import { useTheme } from './hooks/useTheme';
import { useScrollPosition } from './hooks/useScrollPosition';

/* Common components — loaded eagerly */
import Navbar from './components/common/Navbar/Navbar';
import Loader from './components/common/Loader/Loader';
import ScrollProgress from './components/common/ScrollProgress/ScrollProgress';
import BackToTop from './components/common/BackToTop/BackToTop';
import ParticleBackground from './components/common/ParticleBackground/ParticleBackground';
import CustomCursor from './components/common/CustomCursor/CustomCursor';
import Footer from './components/common/Footer/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

/* Section components — eagerly imported for instant rendering */
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Skills from './components/sections/Skills/Skills';
import Projects from './components/sections/Projects/Projects';
import Experience from './components/sections/Experience/Experience';
import Certifications from './components/sections/Certifications/Certifications';
import Education from './components/sections/Education/Education';
import Statistics from './components/sections/Statistics/Statistics';
import Resume from './components/sections/Resume/Resume';
import Contact from './components/sections/Contact/Contact';

/* App styles */
import styles from './App.module.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { scrollPosition, scrollDirection, activeSection, scrollProgress } = useScrollPosition();
  const [isLoading, setIsLoading] = useState(true);

  /* Simulate initial load */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handleKeyDown = (e) => {
      /* Toggle theme: Alt + T */
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
      {/* Loading screen */}
      <Loader isLoading={isLoading} />

      {/* Particle background */}
      <ParticleBackground theme={theme} />

      {/* Custom cursor (desktop only) */}
      <CustomCursor theme={theme} />

      {/* Scroll progress bar */}
      <ScrollProgress progress={scrollProgress} />

      {/* Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        scrollDirection={scrollDirection}
        scrollPosition={scrollPosition}
      />

      {/* Main content */}
      <main>
        <ErrorBoundary>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Education />
          <Statistics />
          <Resume />
          <Contact />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top */}
      <BackToTop visible={scrollPosition > 500} />
    </div>
  );
}

export default App;
