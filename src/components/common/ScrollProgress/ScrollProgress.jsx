import React, { useState, useEffect } from 'react';
import styles from './ScrollProgress.module.css';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
          setProgress(currentProgress);
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
        className={styles.progressBar} 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

export default ScrollProgress;

