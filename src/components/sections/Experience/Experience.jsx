import React from 'react';
import { Calendar, MapPin, GraduationCap, BookOpen, Code2, Trophy, Presentation, Award, Briefcase } from 'lucide-react';
import styles from './Experience.module.css';
import { experiences } from '../../../data/experience';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const iconMap = {
  GraduationCap,
  BookOpen,
  Code2,
  Trophy,
  Presentation,
  Award,
  Briefcase
};

const Experience = () => {
  const revealRef = useScrollReveal({ children: true });

  return (
    <section id="experience" className={styles.section} ref={revealRef}>
      <div className="container">
        <SectionTitle title="Experience" subtitle="My journey so far" />
        
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          
          {(experiences || []).map((item, index) => {
            const IconComponent = iconMap[item.icon] || Briefcase;
            
            return (
              <div key={item.id || index} className={`${styles.timelineItem} reveal`}>
                <div className={styles.timelineDot}></div>
                
                <div className={styles.timelineCard}>
                  <div className={styles.timelineIcon}>
                    <IconComponent size={20} />
                  </div>
                  
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <div className={styles.timelineOrg}>{item.organization}</div>
                  
                  <div className={styles.timelineDetails}>
                    <div className={styles.timelinePeriod}>
                      <Calendar size={14} />
                      <span>{item.period}</span>
                    </div>
                    {item.location && (
                      <div className={styles.timelineLocation}>
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {item.current && (
                    <div className={styles.currentBadge}>
                      <span className={styles.currentDot}></span>
                      Current
                    </div>
                  )}
                  
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
