import React from 'react';
import { Mail, ChevronDown, Download, ArrowRight, Code2, Terminal, Sparkles, Database } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../common/Icons/BrandIcons';
import styles from './Hero.module.css';
import { personalInfo } from '../../../data/personalInfo';
import { useTypewriter } from '../../../hooks/useTypewriter';

const Hero = () => {
  const { text } = useTypewriter(personalInfo.roles, { typeSpeed: 80, deleteSpeed: 40, delaySpeed: 1800 });

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            Available for opportunities
          </div>

          <p className={styles.greeting}>Hi there, I'm</p>
          <h1 className={styles.name}>
            <span className="gradient-text">Meet</span>{' '}Chauhan
          </h1>

          <div className={styles.typeRow}>
            <span className={styles.typePre}>I'm a </span>
            <span className={styles.typeText}>{text}</span>
            <span className={styles.typeCursor} aria-hidden="true">|</span>
          </div>

          <p className={styles.bio}>
            Full Stack &amp; Frontend Developer passionate about building high-performance
            web applications, enterprise platforms, and AI-powered systems. BCA undergraduate
            (CGPA: 8.67) at Charutar Vidya Mandal University, Anand, Gujarat.
          </p>

          <div className={styles.cta}>
            <button className={styles.btnPrimary} onClick={() => scrollTo('projects')}>
              View Projects <ArrowRight size={17} />
            </button>
            <a href="/Meet-Portfolio/uploads/Meet_Chauhan_Resume.pdf" download="Meet_Chauhan_Resume.pdf" className={styles.btnSecondary}>
              <Download size={17} /> Resume
            </a>
            <button className={styles.btnGhost} onClick={() => scrollTo('contact')}>
              Contact Me
            </button>
          </div>

          <div className={styles.socials}>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
              <LinkedinIcon size={19} />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
              <GithubIcon size={19} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className={styles.socialBtn} aria-label="Send Email">
              <Mail size={19} />
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.photoFrame}>
            {/* Ambient soft backlight */}
            <div className={styles.ambientGlow} aria-hidden="true" />

            {/* Premium glassmorphic photo card */}
            <div className={styles.photoCard}>
              <div className={styles.innerFrame}>
                <img
                  src="/Meet-Portfolio/uploads/Photo.png"
                  alt="Meet Chauhan"
                  className={styles.photo}
                  onError={(e) => {
                    if (!e.target.dataset.triedJpg) {
                      e.target.dataset.triedJpg = 'true';
                      e.target.src = '/Meet-Portfolio/uploads/photo.jpg';
                    } else {
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className={styles.fallback}>
                  <span>MC</span>
                </div>
              </div>

              {/* Verified Developer status badge */}
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>Full Stack Developer</span>
              </div>
            </div>

            {/* Floating tech badges with clean Lucide icons */}
            <div className={`${styles.techChip} ${styles.chip1}`}>
              <Code2 size={15} className={styles.chipIcon} />
              <span>React & Next.js</span>
            </div>
            <div className={`${styles.techChip} ${styles.chip2}`}>
              <Terminal size={15} className={styles.chipIcon} />
              <span>Python & FastAPI</span>
            </div>
            <div className={`${styles.techChip} ${styles.chip3}`}>
              <Sparkles size={15} className={styles.chipIcon} />
              <span>AI & Claude</span>
            </div>
            <div className={`${styles.techChip} ${styles.chip4}`}>
              <Database size={15} className={styles.chipIcon} />
              <span>Full Stack & SQL</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className={styles.scrollDown} aria-label="Scroll down">
        <ChevronDown size={26} />
      </a>
    </section>
  );
};

export default Hero;
