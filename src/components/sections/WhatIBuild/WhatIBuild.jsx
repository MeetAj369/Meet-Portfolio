import React from 'react';
import { Globe, ShoppingCart, Database, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { handleSpotlightMove, handleSpotlightLeave } from '../../../hooks/useCardSpotlight';
import { scrollToSection } from '../../../utils/helpers';
import styles from './WhatIBuild.module.css';

const BUILD_PILLARS = [
  {
    id: 'web-apps',
    title: 'Web Applications',
    tag: 'Frontend & Full-Stack',
    icon: Globe,
    description: 'Responsive, fast, and accessible single-page web applications with modern component architecture, state management, and intuitive UX.',
    capabilities: [
      'React 19, Next.js 16 & Vite frontend engineering',
      'Apple Liquid Glass design systems & adaptive theming',
      'Mobile-first responsive layouts across all device viewports',
      'Per-tab JWT session management & secure API routing'
    ],
    proofProject: 'CareerSync & Meet Portfolio',
    proofTarget: 'projects',
    tech: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS 4', 'Vite']
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail Systems',
    tag: 'Commerce & POS Billing',
    icon: ShoppingCart,
    description: 'Complete digital commerce portals featuring flagship product catalogs, checkout workflows, payment simulations, and automated GST billing.',
    capabilities: [
      '25+ product catalog with dynamic hardware specs filtering',
      'Interactive cart & express checkout (COD, UPI QR, Card)',
      'Automated printable PDF tax invoice generation (FPDF)',
      'Real-time inventory reconciliation & low-stock alerts'
    ],
    proofProject: 'HP Mobile Store',
    proofTarget: 'projects',
    tech: ['PHP (OOP)', 'MySQL (7 Tables)', 'FPDF Engine', 'JavaScript', 'CSS3']
  },
  {
    id: 'database-systems',
    title: 'Database & Enterprise Systems',
    tag: 'Schemas & Data Engines',
    icon: Database,
    description: 'Normalized database architectures, ACID transactional workflows, enterprise asset management, and role-based access control.',
    capabilities: [
      'Normalized 3NF relational schemas in PostgreSQL & MySQL (up to 18 tables)',
      'Digital Gadget Passports™ with verifiable cryptographic QR codes',
      '5-stage IT support ticket lifecycles with full audit logging',
      'Automated Written Down Value (WDV) asset depreciation schedules'
    ],
    proofProject: 'HP TechPulse & HP Expense Tracker',
    proofTarget: 'projects',
    tech: ['PostgreSQL', 'MySQL', 'SQLAlchemy', 'PDO', 'Relational Schemas']
  },
  {
    id: 'automation-python',
    title: 'Automation & Python Tools',
    tag: 'APIs & AI Integration',
    icon: Cpu,
    description: 'High-throughput asynchronous backends, AI/LLM integrations, automated document processing, and background calculation engines.',
    capabilities: [
      'Python FastAPI asynchronous microservices with Swagger documentation',
      'Real-time Server-Sent Events (SSE) AI token streaming',
      'Automated resume & document export engine in Word (.docx) & PDF',
      'Multi-tier AI mentor fallback and intelligent assessment matching'
    ],
    proofProject: 'CareerSync AI Engine & AI Chat Assistant',
    proofTarget: 'projects',
    tech: ['Python 3.12', 'FastAPI', 'Claude AI', 'SSE Streaming', 'C Engine']
  }
];

const WhatIBuild = () => {
  const revealRef = useScrollReveal({ children: true });

  return (
    <section id="what-i-build" className={styles.section} ref={revealRef}>
      <div className="container">
        <SectionTitle
          title="What I Build"
          subtitle="Translating modern software engineering skills into production-grade systems"
        />

        <div className={styles.pillarsGrid}>
          {BUILD_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`${styles.pillarCard} spotlight-surface reveal stagger-${idx + 1}`}
                onMouseMove={handleSpotlightMove}
                onMouseLeave={handleSpotlightLeave}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <Icon size={24} />
                  </div>
                  <span className={styles.cardTag}>{pillar.tag}</span>
                </div>

                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardDesc}>{pillar.description}</p>

                <div className={styles.capabilitiesList}>
                  {pillar.capabilities.map((cap, i) => (
                    <div key={i} className={styles.capabilityItem}>
                      <CheckCircle2 size={15} className={styles.checkIcon} />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.techPills}>
                    {pillar.tech.map((t, i) => (
                      <span key={i} className={styles.techPill}>{t}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToSection(pillar.proofTarget)}
                    className={styles.proofLink}
                    title={`View ${pillar.proofProject} in Projects`}
                  >
                    <span>{pillar.proofProject}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;
