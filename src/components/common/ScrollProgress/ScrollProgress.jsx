import React, { useEffect, useRef } from 'react';
import styles from './ScrollProgress.module.css';

// GPU transform scaleX bar — zero React re-renders & zero layout reflows on scroll
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${ratio})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className={styles.progressContainer}>
      <div
        ref={barRef}
        className={styles.progressBar}
        style={{ width: '100%', transformOrigin: 'left center', transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;
