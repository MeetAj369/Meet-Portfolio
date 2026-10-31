import React, { useState } from 'react';
import { 
  Monitor, 
  Server, 
  Wrench, 
  Database, 
  Brain, 
  Sparkles, 
  Layers, 
  Code,
  CheckCircle2
} from 'lucide-react';
import styles from './Skills.module.css';
import { skillCategories } from '../../../data/skills';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const CATEGORY_BADGES = {
  languages: 'Core Foundations',
  web: 'Primary Production Stack',
  backend: 'High Performance & APIs',
  database: 'ACID & Relational Schemas',
  tools: 'Developer Tooling & Workflows',
  ai: 'Techfest @IIT Bombay Certified',
  soft: 'Engineering Mindset & Leadership'
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const skillsRef = useScrollReveal({ children: true });

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'languages': return <Code size={17} />;
      case 'web':
      case 'frontend': return <Monitor size={17} />;
      case 'backend': return <Server size={17} />;
      case 'database': return <Database size={17} />;
      case 'tools': return <Wrench size={17} />;
      case 'ai': return <Brain size={17} />;
      case 'soft': return <Sparkles size={17} />;
      default: return <Layers size={17} />;
    }
  };

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="skills" className={styles.skills} ref={skillsRef} aria-label="Skills and Technologies">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Skills &amp; Technologies</h2>
          <p className={styles.subtitle}>Modern Engineering Stack, Frameworks &amp; Core Competencies</p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className={styles.tabs} role="tablist">
          <button 
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`${styles.tab} ${activeCategory === 'all' ? styles.tabActive : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <Layers size={16} />
            <span>All Ecosystem</span>
          </button>
          
          {skillCategories.map((category) => (
            <button
              key={category.id}
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`${styles.tab} ${activeCategory === category.id ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {getCategoryIcon(category.id)}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Bento Ecosystem Container */}
        <div className={styles.skillsContainer}>
          <div className={`${styles.bentoGrid} ${activeCategory !== 'all' ? styles.singleCategoryGrid : ''}`}>
            {filteredCategories.map((category) => (
              <div key={category.id} className={styles.bentoCard}>
                {/* Bento Card Header */}
                <div className={styles.bentoHeader}>
                  <div className={styles.bentoTitleGroup}>
                    <div className={styles.categoryIconWrap}>
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className={styles.bentoTitle}>{category.name}</h3>
                      <span className={styles.bentoBadge}>
                        {CATEGORY_BADGES[category.id] || `${category.skills.length} Technologies`}
                      </span>
                    </div>
                  </div>
                  <span className={styles.skillCountPill}>
                    {category.skills.length} tools
                  </span>
                </div>

                {/* Tech Chips Grid Inside Bento */}
                <div className={styles.chipsCloud}>
                  {category.skills.map((skill, index) => (
                    <div 
                      key={`${skill.name}-${index}`} 
                      className={styles.techChip}
                      title={`${skill.name} • ${skill.level}% Proficiency`}
                    >
                      <div className={styles.chipIconWrap}>
                        {skill.icon && skill.icon.startsWith('http') ? (
                          <img 
                            src={skill.icon} 
                            alt={`${skill.name} icon`} 
                            className={styles.chipIconImg} 
                            loading="lazy"
                          />
                        ) : (
                          <span className={styles.chipIconText}>{skill.icon || '⚡'}</span>
                        )}
                      </div>
                      <span className={styles.chipName}>{skill.name}</span>
                      <span className={styles.chipLevel}>{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Highlights Footer */}
        <div className={styles.skillsFooter}>
          <div className={styles.footerHighlight}>
            <CheckCircle2 size={16} className={styles.highlightIcon} />
            <span>Continuous Integration &amp; Modern Git Workflows</span>
          </div>
          <div className={styles.footerHighlight}>
            <CheckCircle2 size={16} className={styles.highlightIcon} />
            <span>Full-Stack Scalability with React 19 &amp; Python FastAPI</span>
          </div>
          <div className={styles.footerHighlight}>
            <CheckCircle2 size={16} className={styles.highlightIcon} />
            <span>Relational Data Normalization &amp; Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
