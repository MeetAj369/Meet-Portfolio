import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  ChevronRight,
  Home,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  Award,
  GraduationCap,
  FileText,
  Mail,
  Download,
  Layers
} from 'lucide-react';
import styles from './Navbar.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { scrollToSection } from '../../../utils/helpers';
import { personalInfo } from '../../../data/personalInfo';

const NAV_LINKS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const Navbar = ({ theme, toggleTheme, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopLinks = NAV_LINKS;

  const openMenu = () => {
    setIsClosing(false);
    setMenuOpen(true);
  };

  const closeMenu = useCallback(() => {
    if (!menuOpen || isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 240);
  }, [menuOpen, isClosing]);

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

  // Lock body scroll cleanly when mobile drawer is open
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
      if (e.key === 'Escape') closeMenu();
    };
    const handleResize = () => {
      if (window.innerWidth > 900 && menuOpen) {
        setMenuOpen(false);
        setIsClosing(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen, closeMenu]);

  const handleNav = (id) => {
    const wasDrawerOpen = menuOpen;
    if (wasDrawerOpen) {
      setIsClosing(true);
      document.body.style.overflow = '';
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
        scrollToSection(id, { transition: true });
      }, 170);
    } else {
      scrollToSection(id, { transition: true });
    }
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

        <nav className={styles.desktopNav} aria-label="Primary Navigation">
          {desktopLinks.map(({ id, label }) => (
            <button
              key={id}
              className={`${styles.navLink} ${activeSection === id ? styles.active : ''}`}
              onClick={() => handleNav(id)}
            >
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnActive : ''}`}
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            aria-label={menuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Right Slide-In Mobile Navigation Drawer rendered via Portal to escape header stacking context */}
      {menuOpen && createPortal(
        <div
          className={`${styles.drawerOverlay} ${isClosing ? styles.drawerOverlayClosing : ''}`}
          onClick={closeMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <aside
            className={`${styles.drawerPanel} ${isClosing ? styles.drawerPanelClosing : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header: Brand Logo + Rounded Glass Close Button */}
            <div className={styles.drawerHeader}>
              <button
                className={styles.logo}
                onClick={() => handleNav('hero')}
                aria-label="Go to Home"
              >
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

              <button
                type="button"
                className={styles.drawerCloseBtn}
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Staggered Nav Item Cards with Chevrons & Active Pill State */}
            <nav className={styles.drawerNav} aria-label="Mobile sections">
              {NAV_LINKS.map(({ id, label, icon: Icon }, i) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    className={`${styles.drawerItem} ${isActive ? styles.drawerItemActive : ''}`}
                    onClick={() => handleNav(id)}
                    style={{ animationDelay: `${0.04 + i * 0.032}s` }}
                  >
                    <span className={styles.drawerItemLeft}>
                      <span className={styles.drawerItemIcon}>
                        <Icon size={17} />
                      </span>
                      <span className={styles.drawerItemLabel}>{label}</span>
                    </span>
                    <ChevronRight size={17} className={styles.drawerChevron} />
                  </button>
                );
              })}
            </nav>

            {/* Drawer Footer CTA */}
            <div className={styles.drawerFooter}>
              <div className={styles.drawerStatus}>
                <span className={styles.drawerStatusDot} />
                <span>Available for Internships &amp; Full-Stack Roles</span>
              </div>
              <a
                href={personalInfo.resumePath}
                download="Meet_Chauhan_Resume.pdf"
                className={styles.drawerResumeBtn}
                onClick={() => closeMenu()}
              >
                <Download size={17} />
                <span>Download Verified Resume (PDF)</span>
              </a>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Navbar;
