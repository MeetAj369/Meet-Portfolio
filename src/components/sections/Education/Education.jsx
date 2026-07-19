import React from 'react';
import { GraduationCap, BookOpen, MapPin } from 'lucide-react';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { education } from '../../../data/education';
import styles from './Education.module.css';

const IconMap = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  School: BookOpen
};

const Education = () => {
  const revealRef = useScrollReveal();

  return (
    <section id="education" className={styles.educationSection} ref={revealRef}>
      <div className="container">
        <SectionTitle title="Education" subtitle="Academic background" />
        
        <div className={styles.educationTimeline}>
          {education.map((item, index) => {
            const Icon = IconMap[item.icon] || BookOpen;
            
            return (
              <div key={index} className={styles.educationCard}>
                <div className={styles.eduIcon}>
                  <Icon size={24} color="white" />
                </div>
                
                <div className={styles.eduContent}>
                  <div className={styles.eduHeader}>
                    <h3 className={styles.eduDegree}>{item.degree}</h3>
                    {item.current && (
                      <span className={styles.currentBadge}>Current</span>
                    )}
                  </div>
                  
                  <div className={styles.eduInstitution}>
                    {item.institution}
                  </div>
                  
                  <div className={styles.eduMeta}>
                    <div className={styles.eduLocation}>
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                    <div className={styles.eduPeriod}>
                      {item.period}
                    </div>
                  </div>
                  
                  <p className={styles.eduDescription}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;



