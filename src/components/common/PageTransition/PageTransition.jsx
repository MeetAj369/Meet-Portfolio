import React, { useState, useEffect, useRef } from 'react';
import styles from './PageTransition.module.css';

const SECTION_LABELS = {
  hero: 'Home',
  about: 'About Me',
  skills: 'Skills & Stack',
  projects: 'Projects',
  experience: 'Experience & Resume',
  contact: 'Contact Me'
};

/**
 * Snappy 180ms route transition overlay matching IMG_2370.MP4 (`00:03`):
 * zero heavy backdrop-filter blur lag, pure GPU opacity + clean orbital ring spinner.
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

      setTargetLabel(SECTION_LABELS[sectionId] || '');
      setPhase('entering');

      const t1 = setTimeout(() => {
        if (typeof onApex === 'function') {
          onApex();
        }
        setPhase('exiting');
      }, 150);

      const t2 = setTimeout(() => {
        setPhase('idle');
      }, 330);

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
      <div className={styles.topProgressSweep} />
      <div className={styles.centerBadge}>
        <div className={styles.spinnerWrap}>
          <span className={styles.arcOuter} />
          <span className={styles.arcInner} />
          <span className={styles.coreDot} />
        </div>
        {targetLabel && <span className={styles.destPill}>{targetLabel}</span>}
      </div>
    </div>
  );
};

export default PageTransition;
