import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/BrandIcons';
import { getCurrentYear, scrollToSection } from '../../../utils/helpers';
import { personalInfo, socialLinks } from '../../../data/personalInfo';
import styles from './Footer.module.css';

const Footer = () => {
  const linkedinLink = socialLinks.find(s => s.name === 'LinkedIn');
  const githubLink = socialLinks.find(s => s.name === 'GitHub');

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.footerBrand}>
            <a href="/" className={styles.footerLogoWrap} aria-label="Go to Home">
              <img
                src="/Meet-Portfolio/uploads/logo.png"
                alt="Meet Chauhan Logo"
                className={styles.footerLogoImg}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className={styles.name}>Meet Chauhan</div>
            </a>
            <p className={styles.tagline}>
              Aspiring Software Engineer crafting modern, responsive web experiences.
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
              <button onClick={() => scrollToSection('contact')} className={styles.footerLink}>Contact</button>
            </div>
          </div>

          {/* Contact Column */}
          <div className={styles.footerContactCol}>
            <h4 className={styles.footerTitle}>Contact</h4>
            <div className={styles.footerLinks}>
              <a href={`mailto:${personalInfo.email}`} className={styles.footerContactItem}>
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </a>
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
