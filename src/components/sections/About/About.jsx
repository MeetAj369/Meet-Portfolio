import React, { useState } from 'react';
import { 
  MapPin, 
  GraduationCap, 
  Mail, 
  Circle, 
  Terminal as TerminalIcon
} from 'lucide-react';
import styles from './About.module.css';
import { personalInfo } from '../../../data/personalInfo';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const TERMINAL_COMMANDS = [
  {
    cmd: 'meet --whoami',
    output: `{
  "name": "Meet Chauhan",
  "role": "Full Stack & Frontend Dev",
  "education": "CVMU",
  "cgpa": "8.73 / 10.0",
  "stack": ["ReactJS", "NodeJS", "Python"]
}`
  },
  {
    cmd: 'meet --stack',
    output: `[Frontend]  ReactJS, Next.js 16, TypeScript
            Tailwind CSS 4, HTML5/CSS3
[Backend]   Python FastAPI, NodeJS, PHP
            REST APIs, JSON
[Database]  PostgreSQL, MySQL, SQLite
[Tools]     Git, GitHub, VS Code, Claude AI`
  },
  {
    cmd: 'meet --hackathon',
    output: `Event:    TechSprint 2.0 Hackathon
Project:  CareerSync — AI Career Platform
Scope:    49+ career paths & assessments
Stack:    Next.js 16 + FastAPI + PostgreSQL`
  },
  {
    cmd: 'meet --status',
    output: `Status:   Available Immediately
Seek:     Internships, Full Stack Roles
Location: Anand, Gujarat (Remote OK)
Email:    meetaj369@gmail.com`
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
          <p className={styles.subtitle}>Engineering Scalable Web Applications &amp; Intelligent Systems</p>
        </div>

        <div className={styles.content}>
          {/* Left Column: Concise Bio Narrative & Active R&D */}
          <div className={styles.leftColumn}>
            <div className={styles.aboutText}>
              <p>{personalInfo.about}</p>
            </div>

            {/* Live Active R&D Radar Strip */}
            <div className={styles.radarCard}>
              <div className={styles.radarBeacon}>
                <span className={styles.beaconPing} />
                <span className={styles.beaconDot} />
              </div>
              <div className={styles.radarText}>
                <span className={styles.radarLabel}>ACTIVE R&amp;D:</span>
                <span className={styles.radarContent}>Next.js 16 App Router • Python FastAPI • Agentic AI Workflows • PostgreSQL &amp; MySQL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Info & Interactive Terminal */}
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
                <span className={styles.value}>BCA (CGPA: 8.73), CVMU</span>
              </div>
              <button
                className={styles.infoCard}
                onClick={() => {
                  try { navigator.clipboard.writeText(personalInfo.email); } catch (_) {}
                  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent('Portfolio Inquiry — Meet Chauhan')}`;
                  const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                  if (!win || win.closed || typeof win.closed === 'undefined') {
                    window.location.href = `mailto:${personalInfo.email}`;
                  }
                }}
                style={{ textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}
                title="Click to compose in Gmail (copies address to clipboard)"
                aria-label="Email Meet Chauhan"
              >
                <div className={styles.iconWrapper}><Mail className={styles.icon} /></div>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{personalInfo.email}</span>
              </button>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}><Circle fill="currentColor" className={`${styles.icon} ${styles.statusIcon}`} /></div>
                <span className={styles.label}>Status</span>
                <span className={styles.value}>Available for Internships &amp; Jobs</span>
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
                  <span 
                    key={`cmd-${activeCmdIdx}`} 
                    className={`${styles.termCmdText} ${styles.termCmdTextAnimated}`}
                  >
                    {TERMINAL_COMMANDS[activeCmdIdx].cmd}
                  </span>
                </div>
                <pre 
                  key={`out-${activeCmdIdx}`} 
                  className={`${styles.termOutput} ${styles.termOutputAnimated}`}
                >
                  <code>{TERMINAL_COMMANDS[activeCmdIdx].output}</code>
                </pre>
                <div className={styles.termCursorLine}>
                  <span className={styles.termPrompt}>meet@cvmu:~$</span> <span className={styles.termBlinkCursor}>_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
