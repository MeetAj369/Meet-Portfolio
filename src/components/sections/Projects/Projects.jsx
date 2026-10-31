import React, { useState, useMemo } from 'react';
import { ExternalLink, CheckCircle, Search, Terminal, Eye, Code } from 'lucide-react';
import { GithubIcon } from '../../common/Icons/BrandIcons';
import styles from './Projects.module.css';
import { projects } from '../../../data/projects';
import Modal from '../../common/Modal/Modal';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const revealRef = useScrollReveal({ children: true });

  const categories = useMemo(() => {
    return ['All', ...new Set((projects || []).map(p => p.category).filter(Boolean))];
  }, []);

  const filteredProjects = useMemo(() => {
    return (projects || []).filter(project => {
      const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const inTitle = project.title.toLowerCase().includes(query);
      const inDesc = (project.shortDescription || project.description || '').toLowerCase().includes(query);
      const inTech = (project.technologies || []).some(t => t.toLowerCase().includes(query));

      return matchesCategory && (inTitle || inDesc || inTech);
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="projects" className={styles.section} ref={revealRef}>
      <div className="container">
        <SectionTitle title="Featured Projects" subtitle="Academic, Hackathon & Enterprise Systems" />
        
        {/* Controls: Filter Tabs + Search */}
        <div className={styles.controlsWrap}>
          <div className={styles.filterTabs}>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${styles.filterTab} ${activeFilter === category ? styles.filterTabActive : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search tech (e.g. Next.js, Python, MySQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search projects by technology or title"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className={styles.clearSearchBtn} title="Clear search">
                &times;
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className={styles.noResults}>
            <p>No projects found matching "<strong>{searchQuery}</strong>".</p>
            <button onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} className={styles.resetSearchBtn}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id || index} 
                className={styles.projectCard}
                onClick={() => setSelectedProject(project)}
              >
                {/* Developer Window Header Mockup */}
                <div className={styles.windowHeader}>
                  <div className={styles.windowControls}>
                    <span className={`${styles.dot} ${styles.dotRed}`} />
                    <span className={`${styles.dot} ${styles.dotYellow}`} />
                    <span className={`${styles.dot} ${styles.dotGreen}`} />
                  </div>
                  <div className={styles.windowTab}>
                    <Code size={13} className={styles.tabIcon} />
                    <span>{project.fileName || 'app.tsx'}</span>
                  </div>
                  <span className={styles.categoryBadge}>{project.category}</span>
                </div>

                {/* Live Project Website Image or Code Mockup */}
                {project.image ? (
                  <div className={styles.cardImageWrap}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={styles.cardImg}
                      loading="lazy"
                    />
                    <div className={styles.cardImgOverlay}>
                      <div className={styles.overlayBadges}>
                        {project.liveDemo && (
                          <span className={styles.liveIndicator}>
                            <span className={styles.livePulse} />
                            Live Working App
                          </span>
                        )}
                        {project.logo && (
                          <img src={project.logo} alt="Logo" className={styles.logoBadge} />
                        )}
                      </div>
                      <div className={styles.overlayAction}>
                        <Eye size={16} />
                        <span>View Architecture &amp; Specs</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.codeFrame}>
                    <pre className={styles.codeContent}>
                      <code>{project.codeSnippet || '// High-performance web application\nconst app = initializeSystem();'}</code>
                    </pre>
                    <div className={styles.viewOverlay}>
                      <Eye size={18} />
                      <span>View Architecture & Specs</span>
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className={styles.projectContent}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    {project.featured && (
                      <span className={styles.featuredBadge}>Featured</span>
                    )}
                  </div>
                  <p className={styles.projectDesc}>{project.shortDescription}</p>
                  
                  <div className={styles.techTags}>
                    {(project.technologies || []).map((tech, i) => (
                      <span 
                        key={i} 
                        className={styles.techTag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(tech);
                        }}
                        title={`Filter by ${tech}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.projectActions}>
                    {project.github && project.github !== '#' && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.projectBtn} ${styles.projectBtnOutline}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon size={16} /> GitHub
                      </a>
                    )}
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.projectBtn} ${styles.projectBtnPrimary}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} /> Live Working App
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
          {selectedProject && (
            <div className={styles.modalContent}>
              <div className={styles.modalHeaderRow}>
                <span className={styles.modalCategoryBadge}>{selectedProject.category}</span>
                {selectedProject.fileName && (
                  <span className={styles.modalFileName}>
                    <Terminal size={14} /> {selectedProject.fileName}
                  </span>
                )}
              </div>

              {selectedProject.image && (
                <div className={styles.modalBanner}>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className={styles.modalImage} 
                  />
                </div>
              )}

              <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
              <p className={styles.modalDesc}>{selectedProject.description || selectedProject.shortDescription}</p>
              
              {selectedProject.features && (
                <div className={styles.featuresSection}>
                  <h4 className={styles.featuresTitle}>Core Engineering Highlights</h4>
                  <ul className={styles.featuresList}>
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckCircle size={18} className={styles.featureIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.modalTech}>
                <h4 className={styles.featuresTitle}>Technologies & Tools</h4>
                <div className={styles.techTags}>
                  {(selectedProject.technologies || []).map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.modalActions}>
                {selectedProject.github && selectedProject.github !== '#' && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className={`${styles.projectBtn} ${styles.projectBtnOutline}`}>
                    <GithubIcon size={18} /> View Repository
                  </a>
                )}
                {selectedProject.liveDemo && selectedProject.liveDemo !== '#' && (
                  <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer" className={`${styles.projectBtn} ${styles.projectBtnPrimary}`}>
                    <ExternalLink size={18} /> Open Live Working App
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Projects;
