import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Terminal,
  Sparkles,
  Database,
  Cpu,
  ShoppingCart,
  Wallet,
  Award,
  GraduationCap,
  ShieldCheck,
  Rocket
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../common/Icons/BrandIcons';
import styles from './Hero.module.css';
import { personalInfo } from '../../../data/personalInfo';
import { useTypewriter } from '../../../hooks/useTypewriter';
import { scrollToSection } from '../../../utils/helpers';

const SHOWCASE_SLIDES = [
  {
    id: 'genos',
    badge: 'LIVE MERN + AI FLAGSHIP',
    title: 'GenOS — Generational Intelligence OS',
    metric: '1883–2069 • 11-Era Live Theme Engine • SSE AI Council & MongoDB',
    accent: '#7c8cff',
    icons: [
      { label: 'React 19', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { label: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { label: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
      { label: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { label: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' }
    ],
    ctaLabel: 'Explore GenOS',
    target: 'projects'
  },
  {
    id: 'careersync',
    badge: 'HACKATHON FLAGSHIP',
    title: 'CareerSync — AI Career Platform',
    metric: '49+ Career Paths • Next.js 16 + FastAPI + PostgreSQL (18 Tables)',
    accent: '#6366f1',
    icons: [
      { label: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { label: 'React 19', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { label: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { label: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { label: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' }
    ],
    ctaLabel: 'Explore Project',
    target: 'projects'
  },
  {
    id: 'techpulse',
    badge: 'ENTERPRISE SYSTEM',
    title: 'HP TechPulse — Asset Intelligence',
    metric: 'Digital QR Passports • 0–100 Health Engine • 14-Table MySQL',
    accent: '#22d3ee',
    icons: [
      { label: 'PHP', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { label: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { label: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { label: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { label: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' }
    ],
    ctaLabel: 'View Architecture',
    target: 'projects'
  },
  {
    id: 'mobilestore',
    badge: 'E-COMMERCE & POS',
    title: 'HP Mobile Store — Retail Portal',
    metric: '25+ Flagship Devices • Express POS Checkout • Automated GST PDF',
    accent: '#a855f7',
    icons: [
      { label: 'PHP', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { label: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { label: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { label: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' }
    ],
    ctaLabel: 'See Live Demo',
    target: 'projects'
  }
];

const MARQUEE_ITEMS = [
  { icon: Sparkles, label: 'GenOS Live (MERN + AI)' },
  { icon: Code2, label: 'React 19 & Next.js 16' },
  { icon: Rocket, label: 'TechSprint 2.0 Hackathon' },
  { icon: GraduationCap, label: '8.73 / 10 CGPA @ CVMU' },
  { icon: Terminal, label: 'Python FastAPI & Node.js' },
  { icon: Award, label: 'IIT Bombay AI & ML Certified' },
  { icon: Database, label: 'MongoDB, PostgreSQL & MySQL' },
  { icon: ShieldCheck, label: 'Available for Internships & Jobs' }
];

const Hero = () => {
  const { text } = useTypewriter(personalInfo.roles, { typeSpeed: 80, deleteSpeed: 40, delaySpeed: 1800 });
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideDir, setSlideDir] = useState('next');
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const photoCardRef = useRef(null);

  const goNext = () => {
    setSlideDir('next');
    setSlideIdx((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const goPrev = () => {
    setSlideDir('prev');
    setSlideIdx((prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  };

  const goToSlide = (idx) => {
    if (idx === slideIdx) return;
    setSlideDir(idx > slideIdx ? 'next' : 'prev');
    setSlideIdx(idx);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideDir('next');
      setSlideIdx((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goNext();
        else goPrev();
      }
      touchStartX.current = null;
    }
    setIsPaused(false);
  };

  const handlePhotoTilt = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    const card = photoCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) translateY(-4px)`;
  };

  const resetPhotoTilt = () => {
    if (photoCardRef.current) {
      photoCardRef.current.style.transform = '';
    }
  };

  const activeSlide = SHOWCASE_SLIDES[slideIdx];

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={`container ${styles.grid}`}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.mobileHeaderRow}>
            <div className={styles.mobileAvatarWrap}>
              <picture>
                <source srcSet="/Meet-Portfolio/uploads/Photo.webp" type="image/webp" />
                <img
                  src="/Meet-Portfolio/uploads/Photo.png"
                  alt="Meet Chauhan"
                  className={styles.mobileAvatarImg}
                  width="64"
                  height="64"
                  loading="eager"
                />
              </picture>
            </div>
            <div className={`${styles.badge} ${styles.heroReveal}`} style={{ animationDelay: '0.03s' }}>
              <span className={styles.dot} />
              Available for Full-Stack &amp; AI Roles
            </div>
          </div>

          <p className={`${styles.greeting} ${styles.heroReveal}`} style={{ animationDelay: '0.06s' }}>
            Hi there, I'm
          </p>
          <h1 className={`${styles.name} ${styles.heroReveal}`} style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text-animated">Meet</span>{' '}Chauhan
          </h1>

          <div className={`${styles.typeRow} ${styles.heroReveal}`} style={{ animationDelay: '0.14s' }}>
            <span className={styles.typePre}>I'm a </span>
            <span className={styles.typeText}>{text}</span>
            <span className={styles.typeCursor} aria-hidden="true">|</span>
          </div>

          <p className={`${styles.bio} ${styles.heroReveal}`} style={{ animationDelay: '0.18s' }}>
            Full Stack &amp; AI Developer crafting scalable <strong>MERN, React 19, Next.js 16 &amp; Python FastAPI</strong> applications. BCA Honors (<strong>8.73 CGPA</strong>) at Charutar Vidya Mandal University.
          </p>

          <div className={`${styles.cta} ${styles.heroReveal}`} style={{ animationDelay: '0.22s' }}>
            <button className={styles.btnPrimary} onClick={() => scrollToSection('projects', { transition: true })}>
              <span>Explore Projects</span>
              <ArrowRight size={17} className={styles.btnArrow} />
            </button>
            <div className={styles.secondaryActionsRow}>
              <a href="/Meet-Portfolio/uploads/Meet_Chauhan_Resume.pdf" download="Meet_Chauhan_Resume.pdf" className={styles.btnSecondary}>
                <Download size={17} /> <span>Resume</span>
              </a>
              <button className={styles.btnGhost} onClick={() => scrollToSection('contact', { transition: true })}>
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          <div className={`${styles.socials} ${styles.heroReveal}`} style={{ animationDelay: '0.26s' }}>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
              <LinkedinIcon size={19} />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
              <GithubIcon size={19} />
            </a>
            <button
              onClick={() => {
                try { navigator.clipboard.writeText(personalInfo.email); } catch (_) {}
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent('Portfolio Inquiry — Meet Chauhan')}`;
                const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                if (!win || win.closed || typeof win.closed === 'undefined') {
                  window.location.href = `mailto:${personalInfo.email}`;
                }
              }}
              className={styles.socialBtn}
              title="Compose email in Gmail (copies address to clipboard)"
              aria-label="Send Email via Gmail"
            >
              <Mail size={19} />
            </button>
          </div>
        </div>

        {/* RIGHT: INTERACTIVE 3D PORTRAIT + SWIPEABLE SPOTLIGHT CAROUSEL */}
        <div className={styles.right}>
          <div className={styles.showcaseWrap}>
            {/* Portrait Card on Desktop with 3D tilt */}
            <div
              ref={photoCardRef}
              className={styles.photoCard}
              onMouseMove={handlePhotoTilt}
              onMouseLeave={resetPhotoTilt}
            >
              <div className={styles.innerFrame}>
                <picture>
                  <source srcSet="/Meet-Portfolio/uploads/Photo.webp" type="image/webp" />
                  <img
                    src="/Meet-Portfolio/uploads/Photo.png"
                    alt="Meet Chauhan — Full Stack & Frontend Developer"
                    className={styles.photo}
                    width="380"
                    height="380"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
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
                </picture>
                <div className={styles.fallback}>
                  <span>MC</span>
                </div>
              </div>
            </div>

            {/* Live Role Status Pill */}
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>Full Stack Developer • Open to Work</span>
            </div>

            {/* Interactive Swipeable Spotlight Carousel Deck */}
            <div
              className={styles.deckContainer}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label="Interactive Project & Stack Showcase Carousel"
            >
              <div className={styles.deckCard}>
                <div
                  key={`${activeSlide.id}-${slideIdx}`}
                  className={`${styles.deckSlide} ${slideDir === 'next' ? styles.slideEnterNext : styles.slideEnterPrev}`}
                >
                  <div className={styles.deckTopRow}>
                    <span className={styles.deckEyebrow}>{activeSlide.badge}</span>
                    <span className={styles.deckCounter}>
                      0{slideIdx + 1} / 0{SHOWCASE_SLIDES.length}
                    </span>
                  </div>

                  <h3 className={styles.deckTitle}>{activeSlide.title}</h3>
                  <p className={styles.deckMetric}>{activeSlide.metric}</p>

                  <div className={styles.deckStackSection}>
                    <span className={styles.deckStackLabel}>CORE ARCHITECTURE</span>
                    <div className={styles.deckIconsRow}>
                      {activeSlide.icons.map((ic, idx) => (
                        <div key={idx} className={styles.deckIconCircle} title={ic.label}>
                          <img src={ic.src} alt={ic.label} className={styles.deckIconImg} loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.deckFooter}>
                    <button
                      type="button"
                      className={styles.deckExploreBtn}
                      onClick={() => scrollToSection(activeSlide.target, { transition: true })}
                    >
                      <span>{activeSlide.ctaLabel}</span>
                      <ArrowUpRight size={14} />
                    </button>

                    <div className={styles.deckArrows}>
                      <button
                        type="button"
                        onClick={goPrev}
                        className={styles.deckArrowBtn}
                        aria-label="Previous highlight"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className={styles.deckArrowBtn}
                        aria-label="Next highlight"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanding Pill Pagination Dots */}
              <div className={styles.deckDots} role="tablist" aria-label="Carousel Slides">
                {SHOWCASE_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === slideIdx}
                    aria-label={`View ${s.title}`}
                    className={`${styles.deckDot} ${idx === slideIdx ? styles.deckDotActive : ''}`}
                    onClick={() => goToSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Infinite Tech & Credential Marquee Strip */}
      <div className={styles.marqueeOuter} aria-label="Key Credentials & Tech Highlights">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((dup) => (
            <div key={dup} className={styles.marqueeGroup} aria-hidden={dup === 1}>
              {MARQUEE_ITEMS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={`${dup}-${idx}`} className={styles.marqueeChip}>
                    <span className={styles.marqueeIconWrap}>
                      <IconComp size={14} />
                    </span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about', { transition: false })}
        className={styles.scrollDown}
        aria-label="Scroll down to About section"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
