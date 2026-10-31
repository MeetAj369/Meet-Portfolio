import React, { useState, useEffect } from 'react';
import { Eye, Download, FileText, Briefcase, GraduationCap, Award, ExternalLink, X } from 'lucide-react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './Resume.module.css';

const RESUME_URL = '/Meet-Portfolio/uploads/Meet_Chauhan_Resume.pdf';

const highlights = [
  { icon: Briefcase, label: 'Full Stack', desc: 'ReactJS / NodeJS / Python' },
  { icon: GraduationCap, label: 'BCA (8.67)', desc: 'Charutar Vidya Mandal Univ' },
  { icon: Award, label: '5+ Core', desc: 'AI, ML & Web Certs' },
  { icon: FileText, label: 'TechSprint', desc: 'Hackathon & Enterprise Apps' },
];

const Resume = () => {
  const revealRef = useScrollReveal({ children: true });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    if (showModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  return (
    <section id="resume" className={styles.section} ref={revealRef}>
      <div className="container">
        <div className={`${styles.card} reveal`}>
          <div className={styles.left}>
            <span className={styles.eyebrow}>OFFICIAL CV & RESUME</span>
            <h2 className={styles.title}>My <span className="gradient-text">Resume</span></h2>
            <p className={styles.desc}>
              View or download my verified resume directly. Includes full details on my technical stack, project history, education, and certifications.
            </p>
            <div className={styles.btns}>
              <button 
                onClick={() => setShowModal(true)} 
                className={styles.btnPrimary} 
                aria-label="Preview Resume in Page"
              >
                <Eye size={19} /> Preview in Page
              </button>
              <a 
                href={RESUME_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.btnOutline} 
                aria-label="Open Resume in New Tab"
              >
                <ExternalLink size={18} /> New Tab
              </a>
              <a 
                href={RESUME_URL} 
                download="Meet_Chauhan_Resume.pdf" 
                className={styles.btnOutline} 
                aria-label="Download Resume PDF"
              >
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>
          <div className={styles.right}>
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div key={label} className={styles.item}>
                <div className={styles.itemIcon}><Icon size={20} /></div>
                <div><div className={styles.itemVal}>{label}</div><div className={styles.itemDesc}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* In-Page Interactive PDF Viewer Modal */}
      {showModal && (
        <div 
          className={styles.modalBackdrop} 
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Meet Chauhan Verified Resume"
        >
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalFileIcon}>
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className={styles.modalTitle}>Meet Chauhan — Official Verified Resume</h3>
                  <p className={styles.modalSubtitle}>Bachelor of Computer Applications (8.67 CGPA) • Full Stack Developer</p>
                </div>
              </div>

              <div className={styles.modalActions}>
                <a 
                  href={RESUME_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.modalBtn}
                  title="Open PDF in new browser tab"
                >
                  <ExternalLink size={15} />
                  <span>New Tab</span>
                </a>
                <a 
                  href={RESUME_URL} 
                  download="Meet_Chauhan_Resume.pdf" 
                  className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
                  title="Download verified PDF resume"
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </a>
                <button 
                  onClick={() => setShowModal(false)} 
                  className={styles.modalCloseBtn}
                  aria-label="Close Resume Viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF */}
            <div className={styles.modalBody}>
              <iframe
                src={`${RESUME_URL}#toolbar=1&navpanes=0`}
                className={styles.pdfFrame}
                title="Meet Chauhan Resume PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;

