import { useState, useEffect } from 'react';

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
import Resume from './components/sections/Resume/Resume';
import Contact from './components/sections/Contact/Contact';
import AIAssistant from './components/common/AIAssistant/AIAssistant';

/* App styles */
import styles from './App.module.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useScrollPosition();
  const [isLoading, setIsLoading] = useState(true);

  /* Quick smooth splash — frees up interaction and scrolling immediately */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  /* Handle direct URL hash landing (e.g. #about) once page is ready and on hashchange */
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          const navEl = document.querySelector('header');
          const navHeight = navEl ? navEl.offsetHeight : 72;
          const elementTop = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementTop - navHeight - 24),
            behavior: 'smooth'
          });
        }
      }
    };

    if (!isLoading) {
      const timer = setTimeout(scrollToHash, 100);
      window.addEventListener('hashchange', scrollToHash);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('hashchange', scrollToHash);
      };
    }
  }, [isLoading]);

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
      <ScrollProgress />

      {/* Navigation — permanently fixed and visible */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
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
          <Resume />
          <Contact />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer />

      {/* Meet AI Personal Assistant */}
      <AIAssistant />

      {/* Back to top */}
      <BackToTop />
    </div>
  );
}

export default App;
