import React from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <button
      className={styles.toggleBtn}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className={`${styles.iconContainer} ${isDark ? styles.isDark : styles.isLight}`}>
        {isDark ? (
          <Sun className={styles.icon} size={20} />
        ) : (
          <Moon className={styles.icon} size={20} />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;

