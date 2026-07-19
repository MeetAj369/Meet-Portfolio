import React, { useState, useEffect } from 'react';
import { Monitor, Server, Wrench, Database, Brain, Sparkles, Layers } from 'lucide-react';
import styles from './Skills.module.css';
import { skillCategories } from '../../../data/skills';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const ICON_MAP = {
  Monitor,
  Server,
  Wrench,
  Database,
  Brain,
  Sparkles,
  Layers
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useScrollReveal({ children: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [skillsRef]);

  const handleFilter = (category) => {
    setActiveCategory(category);
  };

  const getDisplaySkills = () => {
    if (activeCategory === 'all') {
      return skillCategories.reduce((acc, cat) => [...acc, ...cat.skills], []);
    }
    return skillCategories.find(cat => cat.id === activeCategory)?.skills || [];
  };

  const displaySkills = getDisplaySkills();

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'frontend': return <Monitor size={18} />;
      case 'backend': return <Server size={18} />;
      case 'tools': return <Wrench size={18} />;
      default: return <Layers size={18} />;
    }
  };

  return (
    <section id="skills" className={styles.skills} ref={skillsRef} aria-label="Skills and Technologies">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 className={styles.title}>Skills & Technologies</h2>
              <p className={styles.subtitle}>Technologies I work with</p>
            </div>
            <button 
              className={styles.gravityBtn}
              onClick={() => {
                import('../../../utils/gravity').then(({ startGravity }) => {
                  startGravity(`.${styles.skillsGrid}`, `.${styles.skillCard}`);
                });
              }}
              title="Activate Gravity Sandbox"
            >
              <Sparkles size={18} /> Chaos Mode
            </button>
          </div>
        </div>

        <div className={styles.tabs} role="tablist">
          <button 
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`${styles.tab} ${activeCategory === 'all' ? styles.tabActive : ''}`}
            onClick={() => handleFilter('all')}
          >
            <Layers size={18} />
            <span>All</span>
          </button>
          
          {skillCategories.map((category) => (
            <button
              key={category.id}
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`${styles.tab} ${activeCategory === category.id ? styles.tabActive : ''}`}
              onClick={() => handleFilter(category.id)}
            >
              {getCategoryIcon(category.id)}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.skillsGrid}>
          {displaySkills.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={styles.skillIconWrapper}>
                  {skill.icon && skill.icon.startsWith('http') ? (
                    <img src={skill.icon} alt={`${skill.name} icon`} className={styles.skillIconImg} />
                  ) : (
                    <span className={styles.skillIconText} role="img" aria-label={`${skill.name} icon`}>{skill.icon || '🚀'}</span>
                  )}
                </div>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
              <div className={styles.progressBar} aria-label={`${skill.name} proficiency: ${skill.level}%`}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;



