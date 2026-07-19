import React from 'react';
import styles from './SectionTitle.module.css';

const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`${styles.container} ${styles[align]}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line}></div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;

