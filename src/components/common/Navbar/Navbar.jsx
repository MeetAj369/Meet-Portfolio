import React, { useState, useEffect } from 'react';
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
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ theme, toggleTheme, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolled state for glass backdrop styling without re-rendering parent tree
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll only when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on Escape or window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNav = (id) => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      scrollToSection(id);
    }, 50);
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuIsOpen : ''}`}>
      <div className={`container ${styles.inner}`}>
        <button className={styles.logo} onClick={() => handleNav('hero')} aria-label="Go to top">
          <img
            src="/Meet-Portfolio/uploads/logo-dark.png"
            alt="Meet Chauhan Logo"
            className={`${styles.logoImage} ${styles.logoDark}`}
          />
          <img
            src="/Meet-Portfolio/uploads/logo-light.png"
            alt="Meet Chauhan Logo"
            className={`${styles.logoImage} ${styles.logoLight}`}
          />
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
