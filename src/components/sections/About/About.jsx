import React from 'react';
import { MapPin, GraduationCap, Mail, Circle } from 'lucide-react';
import styles from './About.module.css';
import { personalInfo } from '../../../data/personalInfo';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const About = () => {
  const aboutRef = useScrollReveal({ children: true });

  return (
    <section id="about" className={styles.about} ref={aboutRef} aria-label="About Me">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.subtitle}>Passionate about building impactful software solutions</p>
        </div>

        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.aboutText}>
              <p>{personalInfo.about}</p>
            </div>
            
            <div className={styles.learningSection}>
              <h3>Currently Learning</h3>
              <div className={styles.tagsContainer}>
                {personalInfo.currentlyLearning?.map((item, index) => (
                  <span key={index} className={styles.learningTag}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.missionCards}>
              <div className={styles.missionCard}>
                <h4>Mission</h4>
                <p>To build scalable, performant, and accessible web applications that solve real-world problems.</p>
              </div>
              <div className={styles.missionCard}>
                <h4>Vision</h4>
                <p>To continuously learn and adapt to modern technologies, creating impactful digital experiences.</p>
              </div>
            </div>
          </div>

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
                <span className={styles.value}>BCA, CVU</span>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}><Mail className={styles.icon} /></div>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{personalInfo.email}</span>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}><Circle fill="currentColor" className={`${styles.icon} ${styles.statusIcon}`} /></div>
                <span className={styles.label}>Status</span>
                <span className={styles.value}>Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

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
                <span className={styles.event}>Started BCA at CVU & Projects</span>
              </div>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.year}>2025</span>
                <span className={styles.event}>Certifications, AI & Modern Tech</span>
              </div>
            </div>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.year}>Future</span>
                <span className={styles.event}>Software Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;



