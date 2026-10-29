import React, { useEffect, useRef } from 'react';
import { Mail, ChevronDown, Download, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../common/Icons/BrandIcons';
import styles from './Hero.module.css';
import { personalInfo } from '../../../data/personalInfo';
import { useTypewriter } from '../../../hooks/useTypewriter';

const Hero = () => {
  const { text } = useTypewriter(personalInfo.roles, { typeSpeed: 80, deleteSpeed: 40, delaySpeed: 1800 });
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 20;
      const y = ((e.clientY - top) / height - 0.5) * 20;
      const photo = el.querySelector('[data-photo]');
      if (photo) {
        photo.style.transform = `perspective(1000px) rotateY(${x * 0.4}deg) rotateX(${-y * 0.4}deg) translateZ(8px)`;
      }
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className={styles.hero} ref={heroRef} aria-label="Introduction">
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
          <div className={styles.photoWrap} data-photo>
            <div className={styles.ring1} />
            <div className={styles.ring2} />
            <div className={styles.glow} />
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
          <div className={`${styles.chip} ${styles.c1}`}>⚛️ React & Next.js</div>
          <div className={`${styles.chip} ${styles.c2}`}>🐍 Python & FastAPI</div>
          <div className={`${styles.chip} ${styles.c3}`}>🤖 AI & Claude</div>
          <div className={`${styles.chip} ${styles.c4}`}>💻 Full Stack & SQL</div>
        </div>
      </div>

      <a href="#about" className={styles.scrollDown} aria-label="Scroll down">
        <ChevronDown size={26} />
      </a>
    </section>
  );
};

export default Hero;
