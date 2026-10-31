import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/BrandIcons';
import { getCurrentYear, scrollToSection } from '../../../utils/helpers';
import { personalInfo, socialLinks } from '../../../data/personalInfo';
import styles from './Footer.module.css';

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const linkedinLink = socialLinks.find(s => s.name === 'LinkedIn');
  const githubLink = socialLinks.find(s => s.name === 'GitHub');

  const handleEmailClick = (e) => {
    e.preventDefault();
    // 1. Copy to clipboard
    try {
      navigator.clipboard.writeText(personalInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch (_) {}

    // 2. Open Gmail web composer directly in a new tab (works reliably across all desktop & mobile browsers)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent('Portfolio Inquiry — Meet Chauhan')}`;
    const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    // 3. Fallback: if browser blocks popup or user has local client, invoke mailto
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent('Portfolio Inquiry — Meet Chauhan')}`;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.footerBrand}>
            <button onClick={() => scrollToSection('hero')} className={styles.footerLogoWrap} aria-label="Go to Home" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <img
                src="/Meet-Portfolio/uploads/logo-dark.png"
                alt="Meet Chauhan Logo"
                className={`${styles.footerLogoImg} ${styles.footerLogoDark}`}
              />
              <img
                src="/Meet-Portfolio/uploads/logo-light.png"
                alt="Meet Chauhan Logo"
                className={`${styles.footerLogoImg} ${styles.footerLogoLight}`}
              />
              <div className={styles.name}>Meet Chauhan</div>
            </button>
            <p className={styles.tagline}>
              Full Stack &amp; Frontend Developer crafting scalable web applications and intelligent systems.
            </p>
            <div className={styles.footerSocial}>
              {linkedinLink && (
                <a href={linkedinLink.url} target="_blank" rel="noopener noreferrer" className={styles.footerSocialLink} aria-label="LinkedIn">
                  <LinkedinIcon size={18} />
                </a>
              )}
              {githubLink && (
                <a href={githubLink.url} target="_blank" rel="noopener noreferrer" className={styles.footerSocialLink} aria-label="GitHub">
                  <GithubIcon size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.footerLinksCol}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <div className={styles.footerLinks}>
              <button onClick={() => scrollToSection('hero')} className={styles.footerLink}>Home</button>
              <button onClick={() => scrollToSection('about')} className={styles.footerLink}>About</button>
              <button onClick={() => scrollToSection('skills')} className={styles.footerLink}>Skills</button>
              <button onClick={() => scrollToSection('projects')} className={styles.footerLink}>Projects</button>
              <button onClick={() => scrollToSection('experience')} className={styles.footerLink}>Experience</button>
              <button onClick={() => scrollToSection('education')} className={styles.footerLink}>Education</button>
              <button onClick={() => scrollToSection('resume')} className={styles.footerLink}>Resume</button>
              <button onClick={() => scrollToSection('contact')} className={styles.footerLink}>Contact</button>
            </div>
          </div>

          {/* Contact Column */}
          <div className={styles.footerContactCol}>
            <h4 className={styles.footerTitle}>Contact</h4>
            <div className={styles.footerLinks}>
              <button
                onClick={handleEmailClick}
                className={styles.footerContactItem}
                title="Click to compose in Gmail & copy email address"
                aria-label="Send email to Meet Chauhan"
              >
                <Mail size={16} />
                <span>{personalInfo.email}</span>
                {emailCopied && (
                  <span className={styles.copyBadge}>
                    <Check size={12} /> Copied!
                  </span>
                )}
              </button>
              <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className={styles.footerContactItem}>
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </a>
              <div className={styles.footerContactItem}>
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomBar}>
          <div>&copy; {getCurrentYear()} Meet Chauhan. All rights reserved.</div>
          <div>Built by Meet AJ ❤️</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
