import React, { useState, useEffect, useRef } from 'react';
import styles from './PageTransition.module.css';

const SECTION_LABELS = {
  hero: 'Home',
  about: 'About Me',
  statistics: 'Achievements',
  'what-i-build': 'What I Build',
  skills: 'Skills & Stack',
  projects: 'Projects',
  experience: 'Experience',
  certifications: 'Certifications',
  education: 'Education',
  resume: 'Resume & CV',
  contact: 'Contact'
};

/**
 * Smooth SPA-style route/section transition veil with top neon progress bar
 * and dual-arc orbital ring spinner (inspired by the IMG_2370.MP4 page transition).
 */
const PageTransition = () => {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'entering' | 'exiting'
  const [targetLabel, setTargetLabel] = useState('');
  const timersRef = useRef([]);

  useEffect(() => {
    const clearAllTimers = () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };

    const handleNavigate = (e) => {
      const { sectionId, onApex } = e.detail || {};
      clearAllTimers();

      setTargetLabel(SECTION_LABELS[sectionId] || 'Section');
      setPhase('entering');

      // Execute scroll cleanly at veil apex so arrival matches animation dissolve
      const t1 = setTimeout(() => {
        if (typeof onApex === 'function') {
          onApex();
        }
        setPhase('exiting');
      }, 210);

      const t2 = setTimeout(() => {
        setPhase('idle');
      }, 490);

      timersRef.current.push(t1, t2);
    };

    window.addEventListener('portfolio:navigate', handleNavigate);
    return () => {
      clearAllTimers();
      window.removeEventListener('portfolio:navigate', handleNavigate);
    };
  }, []);

  if (phase === 'idle') return null;

  return (
    <div
      className={`${styles.overlay} ${phase === 'entering' ? styles.entering : styles.exiting}`}
      aria-hidden="true"
    >
      {/* Top gradient sweep progress bar */}
      <div className={styles.topProgressSweep} />

      {/* Centered frosted orbital loader badge */}
      <div className={styles.centerBadge}>
        <div className={styles.spinnerWrap}>
          <span className={styles.arcOuter} />
          <span className={styles.arcInner} />
          <span className={styles.coreDot} />
        </div>
        {targetLabel && (
          <span className={styles.destPill}>
            {targetLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default PageTransition;
