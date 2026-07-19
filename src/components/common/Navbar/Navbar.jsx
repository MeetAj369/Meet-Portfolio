import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { scrollToSection } from '../../../utils/helpers';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ theme, toggleTheme, activeSection, scrollDirection, scrollPosition }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollPosition > 50;
  const isHidden = scrollDirection === 'down' && scrollPosition > 300 && !menuOpen;

  const handleNav = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
      <div className={`container ${styles.inner}`}>
        <button className={styles.logo} onClick={() => handleNav('hero')} aria-label="Go to top">
          <img
            src="/Meet-Portfolio/uploads/logo.png"
            alt="Meet Chauhan Logo"
            className={styles.logoImage}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className={styles.logoFallback} style={{ display: 'none' }}>
            <div className={styles.logoIcon}><span>MC</span></div>
            <span className={styles.logoText}>Meet</span>
          </div>
        </button>

        <nav className={styles.desktopNav}>
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              className={`${styles.navLink} ${activeSection === id ? styles.active : ''}`}
              onClick={() => handleNav(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ id, label }, i) => (
            <button
              key={id}
              className={`${styles.mobileLink} ${activeSection === id ? styles.mobileActive : ''}`}
              onClick={() => handleNav(id)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
