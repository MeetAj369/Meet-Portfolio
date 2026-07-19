import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={`${styles.loaderOverlay} ${!isLoading ? styles.fadeOut : ''}`}>
      <div className={styles.logoContainer}>
        <div className={styles.ring1}></div>
        <div className={styles.ring2}></div>
        <img 
          src="/Meet-Portfolio/uploads/logo.png" 
          alt="Loading Meet Chauhan Portfolio..." 
          className={styles.logo} 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className={styles.logoFallback} style={{ display: 'none' }}>
          <span>MC</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;

