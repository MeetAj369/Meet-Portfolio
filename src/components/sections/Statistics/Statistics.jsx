import React from 'react';
import { FolderGit2, Award, Code2, Clock, GitCommitHorizontal, GraduationCap } from 'lucide-react';
import AnimatedCounter from '../../common/AnimatedCounter/AnimatedCounter';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { stats } from '../../../data/personalInfo';
import styles from './Statistics.module.css';

const IconMap = { FolderGit2, Award, Code2, Clock, GitCommitHorizontal, GraduationCap };

const Statistics = () => {
  const revealRef = useScrollReveal({ children: true });
  return (
    <section id="statistics" className={styles.statsSection} ref={revealRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>ACHIEVEMENTS</span>
          <h2 className={styles.title}>By The <span className="gradient-text">Numbers</span></h2>
          <p className={styles.subtitle}>A snapshot of my learning journey so far</p>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = IconMap[stat.icon] || Code2;
            return (
              <div key={index} className={`${styles.statCard} reveal stagger-${Math.min(index+1,6)}`}>
                <div className={styles.iconWrap}><Icon size={24} /></div>
                <div className={styles.statValue}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2200} />
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Statistics;
