import React from 'react';
import { Eye, Download, FileText, Briefcase, GraduationCap, Award } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './Resume.module.css';

const RESUME_URL = '/Meet-Portfolio/uploads/Meet_Chauhan_Resume.pdf';

const highlights = [
  { icon: Briefcase, label: 'Full Stack', desc: 'ReactJS / NodeJS / Python' },
  { icon: GraduationCap, label: 'BCA (8.67)', desc: 'Charutar Vidya Mandal Univ' },
  { icon: Award, label: '5+ Core', desc: 'AI, ML & Web Certs' },
  { icon: FileText, label: 'TechSprint', desc: 'Hackathon & Enterprise Apps' },
];

const Resume = () => {
  const revealRef = useScrollReveal({ children: true });

  return (
    <section id="resume" className={styles.section} ref={revealRef}>
      <div className="container">
        <div className={`${styles.card} reveal`}>
          <div className={styles.left}>
            <span className={styles.eyebrow}>OFFICIAL CV & RESUME</span>
            <h2 className={styles.title}>My <span className="gradient-text">Resume</span></h2>
            <p className={styles.desc}>
              View or download my verified resume directly. Includes full details on my technical stack, project history, education, and certifications.
            </p>
            <div className={styles.btns}>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary} aria-label="View Resume">
                <Eye size={19} /> View Resume
              </a>
              <a href={RESUME_URL} download="Meet_Chauhan_Resume.pdf" className={styles.btnOutline} aria-label="Download Resume PDF">
                <Download size={19} /> Download PDF
              </a>
            </div>
          </div>
          <div className={styles.right}>
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div key={label} className={styles.item}>
                <div className={styles.itemIcon}><Icon size={20} /></div>
                <div><div className={styles.itemVal}>{label}</div><div className={styles.itemDesc}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;

