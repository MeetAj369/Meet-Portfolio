import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, User, Code2, FolderGit2, Briefcase } from 'lucide-react';

/* Hooks */
import { useTheme } from './hooks/useTheme';
import { PAGE_ORDER, resolveRouteTarget, scrollToSection } from './utils/helpers';

/* Common components */
import Navbar from './components/common/Navbar/Navbar';
import PageTransition from './components/common/PageTransition/PageTransition';
import BackToTop from './components/common/BackToTop/BackToTop';
import ParticleBackground from './components/common/ParticleBackground/ParticleBackground';
import Footer from './components/common/Footer/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import AIAssistant from './components/common/AIAssistant/AIAssistant';

/* Consolidated Page Views */
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

const PAGE_META = {
  hero: { label: 'Home' },
  about: { label: 'About & Education' },
  skills: { label: 'Skills & Architecture' },
  projects: { label: 'Featured Projects' },
  experience: { label: 'Experience & Resume' },
  contact: { label: 'Contact' }
};

const QUICK_EXPLORE_CARDS = [
  {
    id: 'projects',
    icon: FolderGit2,
    tag: '07 SYSTEMS',
    title: 'Featured Projects',
    desc: 'GenOS (Live MERN+AI), CareerSync, HP TechPulse, Mobile Store & Ledger'
  },
  {
    id: 'skills',
    icon: Code2,
    tag: 'MERN & PYTHON',
    title: 'Skills & Architecture',
    desc: 'React 19, Next.js 16, Node.js, MongoDB, FastAPI & PostgreSQL'
  },
  {
    id: 'about',
    icon: User,
    tag: '8.73 CGPA',
    title: 'About & Education',
    desc: 'Developer story, interactive CLI terminal & CVMU honors'
  },
  {
    id: 'experience',
    icon: Briefcase,
    tag: 'CV & CERTS',
    title: 'Experience & Resume',
    desc: 'TechSprint 2.0 Hackathon, IIT Bombay AI/ML & verified PDF CV'
  }
];

function getInitialRoute() {
  if (typeof window !== 'undefined' && window.location.hash) {
    return resolveRouteTarget(window.location.hash).page;
  }
  return 'hero';
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activePage, setActivePage] = useState(getInitialRoute);
  const [slideDir, setSlideDir] = useState('forward');
  const activePageRef = useRef(activePage);

  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  const scrollAfterRender = useCallback((anchor) => {
    requestAnimationFrame(() => {
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          const navEl = document.querySelector('header');
          const navHeight = navEl ? navEl.offsetHeight : 72;
          const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight - 20);
          window.scrollTo({ top, behavior: 'auto' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }, []);

  // Multi-page route handler (triggers crisp IMG_2370.MP4 horizontal slide + minimal orbital spinner)
  useEffect(() => {
    const handleRoute = (e) => {
      const { targetId, page, anchor, transition = true } = e.detail || {};
      const nextPage = page || 'hero';
      const currentPage = activePageRef.current;
      const oldIdx = PAGE_ORDER.indexOf(currentPage);
      const newIdx = PAGE_ORDER.indexOf(nextPage);
      const dir = newIdx >= oldIdx ? 'forward' : 'backward';

      // Same page -> smooth intra-page scroll to anchor or top
      if (nextPage === currentPage) {
        if (anchor) {
          const el = document.getElementById(anchor);
          if (el) {
            const navEl = document.querySelector('header');
            const navHeight = navEl ? navEl.offsetHeight : 72;
            const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight - 20);
            window.scrollTo({ top, behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const executeSwitch = () => {
        setSlideDir(dir);
        setActivePage(nextPage);
        scrollAfterRender(anchor);
        try {
          const hashStr = `#${anchor || (nextPage === 'hero' ? 'home' : nextPage)}`;
          if (window.location.hash !== hashStr) {
            window.history.pushState(null, '', hashStr);
          }
        } catch (_) {}
      };

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (transition && !prefersReducedMotion) {
        window.dispatchEvent(
          new CustomEvent('portfolio:navigate', {
            detail: { sectionId: targetId || nextPage, onApex: executeSwitch }
          })
        );
      } else {
        executeSwitch();
      }
    };

    const handleHashChange = () => {
      const { page, anchor } = resolveRouteTarget(window.location.hash);
      const oldIdx = PAGE_ORDER.indexOf(activePageRef.current);
      const newIdx = PAGE_ORDER.indexOf(page);
      setSlideDir(newIdx >= oldIdx ? 'forward' : 'backward');
      setActivePage(page);
      scrollAfterRender(anchor);
    };

    window.addEventListener('portfolio:route', handleRoute);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('portfolio:route', handleRoute);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollAfterRender]);

  /* Keyboard shortcuts */
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

  const currentIdx = PAGE_ORDER.indexOf(activePage);
  const prevPageId = currentIdx > 0 ? PAGE_ORDER[currentIdx - 1] : null;
  const nextPageId = currentIdx < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIdx + 1] : null;

  return (
    <div className={styles.app}>
      <PageTransition />
      <ParticleBackground />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activePage}
      />

      <main className={styles.mainViewport}>
        <ErrorBoundary>
          <div
            key={activePage}
            className={`${styles.pageContainer} ${
              slideDir === 'forward' ? 'page-slide-forward' : 'page-slide-backward'
            }`}
          >
            {activePage === 'hero' && (
              <>
                <Hero />
                {/* Compact Home Quick-Jump Hub — keeps Home short (~1.25 screens) with instant page transitions */}
                <section className={styles.quickExploreSection} aria-label="Explore Portfolio Pages">
                  <div className="container">
                    <div className={styles.quickExploreGrid}>
                      {QUICK_EXPLORE_CARDS.map((card) => {
                        const Icon = card.icon;
                        return (
                          <button
                            key={card.id}
                            type="button"
                            className={styles.quickCard}
                            onClick={() => scrollToSection(card.id, { transition: true })}
                          >
                            <div className={styles.quickCardTop}>
                              <span className={styles.quickIconWrap}>
                                <Icon size={18} />
                              </span>
                              <span className={styles.quickTag}>{card.tag}</span>
                            </div>
                            <h3 className={styles.quickTitle}>{card.title}</h3>
                            <p className={styles.quickDesc}>{card.desc}</p>
                            <span className={styles.quickArrowRow}>
                              <span>Open Page</span>
                              <ArrowRight size={14} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            )}

            {activePage === 'about' && (
              <div className={styles.subpageOffset}>
                <About />
                <Statistics />
                <Education />
              </div>
            )}

            {activePage === 'skills' && (
              <div className={styles.subpageOffset}>
                <Skills />
                <WhatIBuild />
              </div>
            )}

            {activePage === 'projects' && (
              <div className={styles.subpageOffset}>
                <Projects />
              </div>
            )}

            {activePage === 'experience' && (
              <div className={styles.subpageOffset}>
                <Experience />
                <Certifications />
                <Resume />
              </div>
            )}

            {activePage === 'contact' && (
              <div className={styles.subpageOffset}>
                <Contact />
              </div>
            )}

            {/* Directional Previous / Next Page Bar for effortless sequential browsing */}
            <nav className={styles.pagerWrap} aria-label="Page pagination">
              <div className="container">
                <div className={styles.pagerRow}>
                  {prevPageId ? (
                    <button
                      type="button"
                      className={styles.pagerBtn}
                      onClick={() => scrollToSection(prevPageId, { transition: true })}
                    >
                      <ArrowLeft size={16} />
                      <span>
                        <small>Previous</small>
                        <strong>{PAGE_META[prevPageId].label}</strong>
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className={styles.pagerIndicator}>
                    0{currentIdx + 1} / 0{PAGE_ORDER.length}
                  </div>

                  {nextPageId ? (
                    <button
                      type="button"
                      className={`${styles.pagerBtn} ${styles.pagerBtnNext}`}
                      onClick={() => scrollToSection(nextPageId, { transition: true })}
                    >
                      <span>
                        <small>Next Page</small>
                        <strong>{PAGE_META[nextPageId].label}</strong>
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`${styles.pagerBtn} ${styles.pagerBtnNext}`}
                      onClick={() => scrollToSection('hero', { transition: true })}
                    >
                      <span>
                        <small>Back to Start</small>
                        <strong>Home</strong>
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </ErrorBoundary>
      </main>

      <Footer />
      <AIAssistant />
      <BackToTop />
    </div>
  );
}

export default App;
