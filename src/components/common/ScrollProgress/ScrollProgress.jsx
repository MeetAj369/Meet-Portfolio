import React from 'react';
import styles from './ScrollProgress.module.css';

const ScrollProgress = ({ progress = 0 }) => {
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

