import React from 'react';
import { FolderGit2, Award, Code2, Clock, GitCommitHorizontal, GraduationCap, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../../common/Icons/BrandIcons';
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
          <p className={styles.subtitle}>A snapshot of verified project history and software engineering momentum</p>
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

        {/* Interactive GitHub Activity & Repository Momentum Card */}
        <div className={styles.githubCard}>
          <div className={styles.githubLeft}>
            <div className={styles.githubHeader}>
              <div className={styles.githubAvatar}>
                <GithubIcon size={26} />
              </div>
              <div>
                <div className={styles.githubUserRow}>
                  <span className={styles.githubUsername}>@MeetAj369</span>
                  <span className={styles.githubStatusBadge}>
                    <span className={styles.githubDot} /> Active Contributor
                  </span>
                </div>
                <p className={styles.githubBio}>Open-source repositories, hackathon submissions &amp; verified code</p>
              </div>
            </div>

            <div className={styles.githubMetricsRow}>
              <div className={styles.githubMetric}>
                <span className={styles.githubMetricVal}>15+</span>
                <span className={styles.githubMetricLbl}>Repositories</span>
              </div>
              <div className={styles.githubMetric}>
                <span className={styles.githubMetricVal}>250+</span>
                <span className={styles.githubMetricLbl}>Git Commits</span>
              </div>
              <div className={styles.githubMetric}>
                <span className={styles.githubMetricVal}>TechSprint 2.0</span>
                <span className={styles.githubMetricLbl}>Hackathon</span>
              </div>
            </div>

            <a
              href="https://github.com/MeetAj369"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubExploreBtn}
              aria-label="Explore Meet Chauhan on GitHub"
            >
              <span>Explore GitHub Repositories</span>
              <ExternalLink size={16} />
            </a>
          </div>

          <div className={styles.githubRight}>
            <h4 className={styles.langTitle}>Primary Repository Tech Distribution</h4>
            <div className={styles.langList}>
              <div className={styles.langItem}>
                <div className={styles.langHeader}>
                  <span className={styles.langName}><span className={styles.langDotJs} /> JavaScript &amp; TypeScript (React 19 / Next.js 16)</span>
                  <span className={styles.langPercent}>40%</span>
                </div>
                <div className={styles.langBarTrack}>
                  <div className={styles.langBarFill} style={{ width: '40%', background: '#f59e0b' }} />
                </div>
              </div>

              <div className={styles.langItem}>
                <div className={styles.langHeader}>
                  <span className={styles.langName}><span className={styles.langDotPhp} /> PHP &amp; OOP (HP TechPulse / Mobile Store)</span>
                  <span className={styles.langPercent}>28%</span>
                </div>
                <div className={styles.langBarTrack}>
                  <div className={styles.langBarFill} style={{ width: '28%', background: '#6366f1' }} />
                </div>
              </div>

              <div className={styles.langItem}>
                <div className={styles.langHeader}>
                  <span className={styles.langName}><span className={styles.langDotPy} /> Python (FastAPI / CareerSync Backend)</span>
                  <span className={styles.langPercent}>20%</span>
                </div>
                <div className={styles.langBarTrack}>
                  <div className={styles.langBarFill} style={{ width: '20%', background: '#06b6d4' }} />
                </div>
              </div>

              <div className={styles.langItem}>
                <div className={styles.langHeader}>
                  <span className={styles.langName}><span className={styles.langDotSql} /> Relational SQL (PostgreSQL &amp; MySQL Schemas)</span>
                  <span className={styles.langPercent}>12%</span>
                </div>
                <div className={styles.langBarTrack}>
                  <div className={styles.langBarFill} style={{ width: '12%', background: '#10b981' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Statistics;
