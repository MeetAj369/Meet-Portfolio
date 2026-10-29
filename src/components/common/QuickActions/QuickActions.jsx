import React from 'react';
import { FileText, Mail, Sparkles } from 'lucide-react';
import { scrollToSection } from '../../../utils/helpers';
import styles from './QuickActions.module.css';

const QuickActions = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <div className={styles.mobileBar} aria-label="Quick Actions">
      <a 
        href="/Meet-Portfolio/uploads/Meet_Chauhan_Resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.actionBtn}
        aria-label="View Resume"
      >
        <FileText size={15} />
        <span>Resume</span>
      </a>

      <button 
        onClick={() => scrollToSection('contact')} 
        className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
        aria-label="Contact Meet"
      >
        <Mail size={15} />
        <span>Contact</span>
      </button>

      <button 
        onClick={() => scrollToSection('projects')} 
        className={styles.actionBtn}
        aria-label="View Projects"
      >
        <Sparkles size={15} />
        <span>Projects</span>
      </button>
    </div>
  );
};

export default QuickActions;
