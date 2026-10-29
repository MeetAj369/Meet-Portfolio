import React, { useState } from 'react';
import { MapPin, GraduationCap, Mail, Circle, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import styles from './About.module.css';
import { personalInfo } from '../../../data/personalInfo';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const TERMINAL_COMMANDS = [
  {
    cmd: 'meet --whoami',
    output: `{
  "name": "Meet Chauhan",
  "role": "Full Stack & Frontend Developer",
  "education": "Charutar Vidya Mandal University",
  "cgpa": "8.67 / 10.0",
  "specialization": ["ReactJS", "NodeJS", "Python", "FastAPI"]
}`
  },
  {
    cmd: 'meet --stack',
    output: `[Frontend]  ReactJS, Next.js 16, TypeScript, Tailwind CSS 4, HTML5/CSS3
[Backend]   Python (FastAPI), NodeJS, PHP (OOP), REST APIs, JSON
[Database]  PostgreSQL, MySQL, SQLite, Relational Modeling & CRUD
[Tools]     Git, GitHub, Visual Studio Code, FastAPI Swagger, Claude AI`
  },
  {
    cmd: 'meet --hackathon',
    output: `Event:      TechSprint 2.0 Hackathon
Project:    CareerSync — AI Career Navigation Platform
Scope:      Guided assessments & matching across 49+ career paths
Stack:      Next.js 16 + React 19 + Python FastAPI + PostgreSQL (18 tables)`
  },
  {
    cmd: 'meet --status',
    output: `Status:     Available Immediately
Interests:  Technical Internships, Full Stack Engineering, AI Applications
Location:   Anand, Gujarat, India (Open to Remote & Hybrid)
Email:      meetaj369@gmail.com`
  }
];

const About = () => {
  const aboutRef = useScrollReveal({ children: true });
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);

  return (
    <section id="about" className={styles.about} ref={aboutRef} aria-label="About Me">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.subtitle}>Engineering Scalable Web Applications & Intelligent Systems</p>
        </div>

        <div className={styles.content}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <div className={styles.aboutText}>
              <p>{personalInfo.about}</p>
            </div>
            
            <div className={styles.learningSection}>
              <h3>Currently Learning & Exploring</h3>
              <div className={styles.tagsContainer}>
                {personalInfo.currentlyLearning?.map((item, index) => (
                  <span key={index} className={styles.learningTag}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.missionCards}>
              <div className={styles.missionCard}>
                <h4>Mission</h4>
                <p>To architect performant, accessible full-stack software and intuitive user experiences that solve tangible problems.</p>
              </div>
              <div className={styles.missionCard}>
                <h4>Vision</h4>
                <p>To master modern distributed systems and AI-assisted engineering to drive innovation in high-impact products.</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}><MapPin className={styles.icon} /></div>
                <span className={styles.label}>Location</span>
                <span className={styles.value}>{personalInfo.location}</span>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}><GraduationCap className={styles.icon} /></div>
                <span className={styles.label}>Education</span>
                <span className={styles.value}>BCA (CGPA: 8.67), CVMU</span>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}><Mail className={styles.icon} /></div>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{personalInfo.email}</span>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}><Circle fill="currentColor" className={`${styles.icon} ${styles.statusIcon}`} /></div>
                <span className={styles.label}>Status</span>
                <span className={styles.value}>Available for Internships & Jobs</span>
              </div>
            </div>

            {/* Interactive Developer Terminal */}
            <div className={styles.terminalCard}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalControls}>
                  <span className={`${styles.termDot} ${styles.termRed}`} />
                  <span className={`${styles.termDot} ${styles.termYellow}`} />
                  <span className={`${styles.termDot} ${styles.termGreen}`} />
                </div>
                <div className={styles.terminalTitle}>
                  <TerminalIcon size={14} className={styles.termIcon} />
                  <span>meet@cvmu:~ (zsh)</span>
                </div>
                <span className={styles.termTag}>Interactive</span>
              </div>

              <div className={styles.terminalTabs}>
                {TERMINAL_COMMANDS.map((item, idx) => (
                  <button
                    key={idx}
                    className={`${styles.termTabBtn} ${activeCmdIdx === idx ? styles.termTabBtnActive : ''}`}
                    onClick={() => setActiveCmdIdx(idx)}
                  >
                    ${' '}{item.cmd.replace('meet --', '')}
                  </button>
                ))}
              </div>

              <div className={styles.terminalBody}>
                <div className={styles.termPromptLine}>
                  <span className={styles.termPrompt}>meet@cvmu:~$</span>{' '}
                  <span className={styles.termCmdText}>{TERMINAL_COMMANDS[activeCmdIdx].cmd}</span>
                </div>
                <pre className={styles.termOutput}>
                  <code>{TERMINAL_COMMANDS[activeCmdIdx].output}</code>
                </pre>
                <div className={styles.termCursorLine}>
                  <span className={styles.termPrompt}>meet@cvmu:~$</span> <span className={styles.termBlinkCursor}>_</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Journey */}
        <div className={styles.timelineSection}>
          <h3>My Journey</h3>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.year}>2023</span>
                <span className={styles.event}>Foundation Programme, LSBU</span>
              </div>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.year}>2024</span>
                <span className={styles.event}>Started BCA at CVMU (CGPA: 8.67)</span>
              </div>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.year}>2025</span>
                <span className={styles.event}>TechSprint 2.0 Hackathon & Enterprise Systems</span>
              </div>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.year}>2026</span>
                <span className={styles.event}>AI / ML Certifications & Full Stack Innovations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
