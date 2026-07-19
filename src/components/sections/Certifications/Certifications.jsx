import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, Code, BookOpen, Medal, Star, CheckCircle, Brain, Bot, Zap, Cpu, Rocket, Globe, Database, Palette } from 'lucide-react';
import styles from './Certifications.module.css';
import { certifications } from '../../../data/certifications';
import Modal from '../../common/Modal/Modal';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const iconMap = {
  Award,
  ShieldCheck,
  Code,
  BookOpen,
  Medal,
  Star,
  Brain,
  Bot,
  Zap,
  Cpu,
  Rocket,
  Globe,
  Database,
  Palette
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  
  const revealRef = useScrollReveal({ children: true });

  return (
    <section id="certifications" className={styles.section} ref={revealRef}>
      <div className="container">
        <SectionTitle title="Certifications" subtitle="Validated skills & achievements" />
        
        <div className={styles.certsGrid}>
          {(certifications || []).map((cert, index) => {
            const IconComponent = iconMap[cert.icon] || Award;
            
            return (
              <div 
                key={cert.id || index} 
                className={styles.certCard}
                onClick={() => setSelectedCert(cert)}
              >
                <div className={styles.certIcon}>
                  <IconComponent size={24} />
                </div>
                
                {cert.category && (
                  <span className={styles.certCategory}>{cert.category}</span>
                )}
                
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <div className={styles.certIssuer}>{cert.issuer}</div>
                <div className={styles.certDate}>{cert.date}</div>
              </div>
            );
          })}
        </div>

        <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)}>
          {selectedCert && (
            <div className={styles.modalContent}>
              <div className={styles.modalIcon}>
                {React.createElement(iconMap[selectedCert.icon] || Award, { size: 32 })}
              </div>
              
              <h3 className={styles.modalTitle}>{selectedCert.title}</h3>
              
              <div className={styles.modalMeta}>
                <span className={styles.modalIssuer}>{selectedCert.issuer}</span>
                <span className={styles.modalDate}>{selectedCert.date}</span>
                {selectedCert.category && (
                  <span className={styles.modalCategory}>{selectedCert.category}</span>
                )}
              </div>
              
              <p className={styles.modalDesc}>{selectedCert.description}</p>
              
              {selectedCert.skills && (
                <div className={styles.modalSkills}>
                  <h4 className={styles.skillsTitle}>Skills Evaluated</h4>
                  <div className={styles.skillsList}>
                    {selectedCert.skills.map((skill, i) => (
                      <span key={i} className={styles.skillTag}>
                        <CheckCircle size={14} className={styles.skillIcon} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedCert.credentialUrl && (
                <div className={styles.modalActions}>
                  <a 
                    href={selectedCert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.credentialBtn}
                  >
                    <ExternalLink size={18} /> View Credential
                  </a>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Certifications;



