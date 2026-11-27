import React from 'react';
import styles from './ParticleBackground.module.css';

/**
 * Zero-JS pure CSS GPU-static ambient aura backdrop.
 * Eliminates continuous canvas rAF repaints for rock-solid 60/120fps scrolling on mobile & desktop.
 */
const ParticleBackground = () => {
  return (
    <div className={styles.ambientBackdrop} aria-hidden="true">
      <div className={styles.glowPrimary} />
      <div className={styles.glowSecondary} />
    </div>
  );
};

export default ParticleBackground;
