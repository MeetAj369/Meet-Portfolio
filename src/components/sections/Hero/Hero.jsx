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
  },
  {
    id: 'ai-stack',
    badge: 'AI-NATIVE WORKFLOWS',
    title: 'Modern AI & LLM Engineering',
    metric: 'SSE Token Streaming • Claude AI • IIT Bombay AI/ML Certified',
    accent: '#38bdf8',
    icons: [
      { label: 'Python AI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { label: 'TensorFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
      { label: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { label: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { label: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' }
    ],
    ctaLabel: 'Explore Stack',
    target: 'skills'
  }
];

const MARQUEE_ITEMS = [
  { icon: Code2, label: 'React 19 & Next.js 16' },
  { icon: Rocket, label: 'TechSprint 2.0 Hackathon' },
  { icon: GraduationCap, label: '8.73 / 10 CGPA @ CVMU' },
  { icon: Terminal, label: 'Python FastAPI & Node.js' },
  { icon: Award, label: 'IIT Bombay AI & ML Certified' },
  { icon: Database, label: 'PostgreSQL & MySQL Schemas' },
  { icon: Sparkles, label: 'Anthropic Claude AI Stack' },
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
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />
      <div className={styles.orb4} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={`${styles.badge} ${styles.heroReveal}`} style={{ animationDelay: '0.04s' }}>
            <span className={styles.dot} />
            Available for opportunities
          </div>

          <p className={`${styles.greeting} ${styles.heroReveal}`} style={{ animationDelay: '0.1s' }}>
            Hi there, I'm
          </p>
          <h1 className={`${styles.name} ${styles.heroReveal}`} style={{ animationDelay: '0.16s' }}>
            <span className="gradient-text-animated">Meet</span>{' '}Chauhan
          </h1>

          <div className={`${styles.typeRow} ${styles.heroReveal}`} style={{ animationDelay: '0.22s' }}>
            <span className={styles.typePre}>I'm a </span>
            <span className={styles.typeText}>{text}</span>
            <span className={styles.typeCursor} aria-hidden="true">|</span>
          </div>

          <p className={`${styles.bio} ${styles.heroReveal}`} style={{ animationDelay: '0.28s' }}>
            Full Stack &amp; Frontend Developer passionate about building high-performance
            web applications, enterprise platforms, and AI-powered systems. BCA undergraduate
            (CGPA: 8.73) at Charutar Vidya Mandal University, Anand, Gujarat.
          </p>

          {/* Recruiter Context Banner */}
          <div className={`${styles.currentlyBanner} ${styles.heroReveal}`} style={{ animationDelay: '0.34s' }}>
            <div className={styles.currentlyHeader}>
              <span className={styles.currentlyPulse} />
              <span className={styles.currentlyTag}>CURRENT FOCUS</span>
            </div>
            <p className={styles.currentlyText}>
              Building full-stack projects, strengthening <strong>ReactJS, MERN, Python &amp; backend development</strong>, and actively looking for <strong>Job opportunities</strong>.
            </p>
          </div>

          <div className={`${styles.cta} ${styles.heroReveal}`} style={{ animationDelay: '0.4s' }}>
            <button className={styles.btnPrimary} onClick={() => scrollToSection('projects', { transition: true })}>
              <span>View Projects</span>
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

          <div className={`${styles.socials} ${styles.heroReveal}`} style={{ animationDelay: '0.46s' }}>
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

        {/* RIGHT: 3D TILT PORTRAIT + INTERACTIVE SWIPEABLE SHOWCASE DECK */}
        <div className={styles.right}>
          <div className={styles.showcaseWrap}>
            {/* Ambient soft backlight */}
            <div className={styles.ambientGlow} aria-hidden="true" />

            {/* Portrait Card with interactive 3D pointer tilt */}
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

            {/* Interactive Swipeable Spotlight Carousel Deck (IMG_2370.MP4 Signature Card) */}
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
        onClick={() => scrollToSection('about', { transition: true })}
        className={styles.scrollDown}
        aria-label="Scroll down to About section"
      >
        <ChevronDown size={26} />
      </button>
    </section>
  );
};

export default Hero;
