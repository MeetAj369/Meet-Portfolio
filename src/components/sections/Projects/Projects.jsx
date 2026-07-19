import React, { useState } from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { GithubIcon } from '../../common/Icons/BrandIcons';
import styles from './Projects.module.css';
import { projects } from '../../../data/projects';
import Modal from '../../common/Modal/Modal';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const revealRef = useScrollReveal({ children: true });

  const categories = ['All', ...new Set((projects || []).map(p => p.category).filter(Boolean))];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : (projects || []).filter(p => p.category === activeFilter);

  return (
    <section id="projects" className={styles.section} ref={revealRef}>
      <div className="container">
        <SectionTitle title="Featured Projects" subtitle="Some things I've built" />
        
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

        <div className={styles.projectsGrid}>
          {(filteredProjects || []).map((project, index) => (
            <div 
              key={project.id || index} 
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.projectImage}>
                <span className={styles.categoryBadge}>{project.category}</span>
                <span className={styles.projectTitleOverlay}>{project.title}</span>
              </div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.shortDescription}</p>
                <div className={styles.techTags}>
                  {(project.technologies || []).map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
                <div className={styles.projectActions}>
                  {project.github && project.github !== '#' && (
                    <button 
                      className={`${styles.projectBtn} ${styles.projectBtnOutline}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <GithubIcon size={16} /> GitHub
                    </button>
                  )}
                  {project.liveDemo && project.liveDemo !== '#' && (
                    <button 
                      className={`${styles.projectBtn} ${styles.projectBtnPrimary}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveDemo, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
          {selectedProject && (
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
              <p className={styles.modalDesc}>{selectedProject.description || selectedProject.shortDescription}</p>
              
              {selectedProject.features && (
                <div className={styles.featuresSection}>
                  <h4 className={styles.featuresTitle}>Key Features</h4>
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
                <h4 className={styles.featuresTitle}>Technologies</h4>
                <div className={styles.techTags}>
                  {(selectedProject.technologies || []).map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.modalActions}>
                {selectedProject.github && selectedProject.github !== '#' && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className={`${styles.projectBtn} ${styles.projectBtnOutline}`}>
                    <GithubIcon size={18} /> View Source
                  </a>
                )}
                {selectedProject.liveDemo && selectedProject.liveDemo !== '#' && (
                  <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer" className={`${styles.projectBtn} ${styles.projectBtnPrimary}`}>
                    <ExternalLink size={18} /> Live Demo
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
