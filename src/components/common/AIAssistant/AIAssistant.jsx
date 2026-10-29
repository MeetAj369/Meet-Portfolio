import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, ExternalLink, Download, ChevronUp, ChevronDown } from 'lucide-react';
import { scrollToSection } from '../../../utils/helpers';
import { personalInfo } from '../../../data/personalInfo';
import styles from './AIAssistant.module.css';

const QUICK_QUESTIONS = [
  "What is Meet's latest qualifications & education?",
  "Tell me about the CareerSync hackathon project.",
  "What's Meet's experience with Full Stack & React?",
  "What backend & database technologies does Meet use?",
  "How can I contact Meet or download his CV?"
];

// Smart, comprehensive response generator based on Meet Chauhan's verified CV & background
const getAIResponse = (query) => {
  const q = query.toLowerCase().trim();

  // 1. Qualifications / Education / Degree / Marks / CGPA / College / University
  if (
    q.includes('qualif') ||
    q.includes('degree') ||
    q.includes('education') ||
    q.includes('cgpa') ||
    q.includes('gpa') ||
    q.includes('marks') ||
    q.includes('score') ||
    q.includes('grade') ||
    q.includes('bca') ||
    q.includes('cvmu') ||
    q.includes('charutar') ||
    q.includes('university') ||
    q.includes('college') ||
    q.includes('study') ||
    q.includes('studied') ||
    q.includes('studying') ||
    q.includes('academic') ||
    q.includes('school') ||
    q.includes('lsbu') ||
    q.includes('london')
  ) {
    return {
      text: `🎓 **Meet's Latest Qualifications & Education**:\n\n• **Bachelor of Computer Applications (BCA)**\n  Institution: **Charutar Vidya Mandal University (CVMU)**, Anand, Gujarat\n  Duration: June 2024 – June 2027\n  Academic Score: **8.67 / 10.0 CGPA**\n\n• **Foundation Programme in Computing**\n  Institution: **London South Bank University (LSBU)**, London, UK (2023)\n\n• **Core Specializations**: Full Stack Web Development, Data Structures & Algorithms, Relational Database Modeling (MySQL / PostgreSQL), and Scalable Software Architecture.`,
      actions: [
        { label: 'Download Verified CV (PDF)', url: personalInfo.resumePath, download: true },
        { label: 'View Education Section', onClick: () => scrollToSection('education') }
      ]
    };
  }

  // 2. CareerSync / Hackathon / TechSprint 2.0
  if (
    q.includes('careersync') ||
    q.includes('career sync') ||
    q.includes('hackathon') ||
    q.includes('techsprint') ||
    q.includes('tech sprint') ||
    q.includes('competition')
  ) {
    return {
      text: `🚀 **CareerSync (TechSprint 2.0 Hackathon Project)**:\n\n• **Overview**: An AI-powered career navigation platform engineered by Meet during the **TechSprint 2.0 Hackathon**.\n• **Scope**: Maps **49+ career paths** across 11 distinct industries with intelligent assessment tests.\n• **Frontend**: Built with **Next.js 16 & React 19**, TypeScript, Tailwind CSS 4, and dark/light adaptive theming.\n• **Backend**: High-performance **Python FastAPI** & SQLAlchemy with **18 normalized PostgreSQL tables**, automated Word/PDF resume export, and a multi-tier AI mentor fallback.`,
      actions: [
        { label: 'Explore CareerSync in Projects', onClick: () => scrollToSection('projects') },
        { label: 'GitHub Profile', url: personalInfo.github }
      ]
    };
  }

  // 3. HP TechPulse & Enterprise Asset Management
  if (q.includes('techpulse') || q.includes('asset') || q.includes('lifecycle') || q.includes('gadget')) {
    return {
      text: `⚡ **HP TechPulse (Enterprise IT Asset Lifecycle)**:\n\n• **Platform Scope**: Centralizes enterprise devices, users, support tickets, maintenance schedules, stock, and vendors in a unified system.\n• **Key Features**: Real-time **Device Health Scores (94/100 benchmark)**, automated **Written Down Value (WDV)** depreciation calculations, and repair ticket lifecycle workflows.\n• **Sustainability**: Built-in **Green Pulse** analytics to monitor device carbon footprint and e-waste reduction.\n• **Tech Stack**: PHP (OOP), MySQL relational schemas, JavaScript, HTML5, CSS3.`,
      actions: [
        { label: 'View in Projects', onClick: () => scrollToSection('projects') }
      ]
    };
  }

  // 4. Projects / Works / Systems / Built
  if (
    q.includes('project') ||
    q.includes('built') ||
    q.includes('work') ||
    q.includes('portfolio') ||
    q.includes('mobile store') ||
    q.includes('expense') ||
    q.includes('selling') ||
    q.includes('app')
  ) {
    return {
      text: `💻 **Meet's Key Engineering Projects**:\n\n1. **CareerSync**: AI Career Navigation Platform (Next.js 16, React 19, FastAPI, PostgreSQL, 49+ career paths).\n2. **HP TechPulse**: Enterprise IT Asset Lifecycle system with Device Health Scores (94/100) & automated WDV depreciation.\n3. **HP Mobile Selling System**: Full-stack retail & inventory management portal with billing automation.\n4. **HP Expense Tracker**: Financial tracking application for budgets, expense categorization & ledger analytics.\n5. **Interactive Portfolio**: Built with React 19 and 2D physics Gravity Chaos Mode via Matter.js.`,
      actions: [
        { label: 'View All Featured Projects', onClick: () => scrollToSection('projects') },
        { label: 'GitHub Repositories', url: personalInfo.github }
      ]
    };
  }

  // 5. Skills / Stack / Technologies / Languages / Tools / Frameworks
  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('language') ||
    q.includes('framework') ||
    q.includes('frontend') ||
    q.includes('backend') ||
    q.includes('database') ||
    q.includes('react') ||
    q.includes('python') ||
    q.includes('node') ||
    q.includes('fastapi') ||
    q.includes('php') ||
    q.includes('sql') ||
    q.includes('mysql') ||
    q.includes('postgres') ||
    q.includes('typescript') ||
    q.includes('javascript')
  ) {
    return {
      text: `🛠️ **Meet's Technical Stack & Skills**:\n\n• **Languages**: JavaScript, TypeScript, Python, PHP, Java, C, C++, SQL.\n• **Frontend**: ReactJS, Next.js 16, HTML5, CSS3, Tailwind CSS 4, Bootstrap, REST APIs & JSON.\n• **Backend**: Python (FastAPI, SQLAlchemy), NodeJS, PHP (OOP), RESTful Architecture.\n• **Databases**: MySQL, PostgreSQL, SQLite, Relational Database Modeling & Normalization.\n• **Tools & AI Workflows**: Git, GitHub, VS Code, FastAPI Swagger, Claude AI, ChatGPT, Machine Learning, Data Science.\n• **Soft Skills**: Problem Solving, Analytical Thinking, Team Collaboration, Clean Code Practices.`,
      actions: [
        { label: 'Interactive Skills Section', onClick: () => scrollToSection('skills') }
      ]
    };
  }

  // 6. Certifications / Courses / IIT Bombay / Anthropic
  if (
    q.includes('certif') ||
    q.includes('course') ||
    q.includes('credential') ||
    q.includes('iit') ||
    q.includes('bombay') ||
    q.includes('anthropic') ||
    q.includes('claude') ||
    q.includes('machine learning') ||
    q.includes('data science')
  ) {
    return {
      text: `🏆 **Meet's Verified Certifications**:\n\n1. **Artificial Intelligence (AI)** — Techfest @IIT Bombay\n2. **Machine Learning (ML)** — Techfest @IIT Bombay\n3. **Claude AI** — AI-Assisted Coding, Debugging & Developer Workflows (Anthropic)\n4. **Data Science** — Data Analysis & Visualization Fundamentals\n5. **Web Development** — Full Stack Fundamentals (HTML, CSS, JS, PHP)\n6. **SQL Database Management** — Relational Schemas & Normalization`,
      actions: [
        { label: 'View Verified Credentials', onClick: () => scrollToSection('certifications') }
      ]
    };
  }

  // 7. Contact / Hire / Email / Phone / Resume / CV / Location / Status / Availability
  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('mail') ||
    q.includes('phone') ||
    q.includes('call') ||
    q.includes('whatsapp') ||
    q.includes('reach') ||
    q.includes('message') ||
    q.includes('resume') ||
    q.includes('cv') ||
    q.includes('available') ||
    q.includes('availability') ||
    q.includes('job') ||
    q.includes('intern') ||
    q.includes('opportunity') ||
    q.includes('location') ||
    q.includes('city') ||
    q.includes('anand')
  ) {
    return {
      text: `📬 **Contact Information & Availability**:\n\n• **Status**: 🟢 **Available Immediately** for Technical Internships and Full-Stack / Frontend Engineering roles!\n• **Email**: ${personalInfo.email}\n• **Phone / WhatsApp**: ${personalInfo.phone}\n• **Location**: Anand, Gujarat, India (Open to Remote & Hybrid)\n• **Official Resume**: Latest PDF CV available for direct download.`,
      actions: [
        { label: 'Download Resume (PDF)', url: personalInfo.resumePath, download: true },
        { label: 'Send Direct Message', onClick: () => scrollToSection('contact') }
      ]
    };
  }

  // 8. Chaos Mode / Physics / Fun
  if (q.includes('chaos') || q.includes('gravity') || q.includes('physics') || q.includes('sandbox') || q.includes('fun')) {
    return {
      text: `✨ **Chaos Mode (Interactive Physics Sandbox)**:\n\nMeet built a custom 2D gravity physics engine into the Skills section using **Matter.js**! Click the Chaos Mode button in Skills to watch cards tumble with physics, then click **Reset Layout** to restore the clean grid!`,
      actions: [
        { label: 'Try Chaos Mode in Skills', onClick: () => scrollToSection('skills') }
      ]
    };
  }

  // 9. General / Who is Meet / Bio / Introduction / Default
  return {
    text: `Meet Chauhan is a **Full Stack & Frontend Developer** (ReactJS / NodeJS / Python) and BCA undergraduate at **Charutar Vidya Mandal University (8.67 / 10.0 CGPA)**.\n\n• **Key Achievement**: Developed **CareerSync** (TechSprint 2.0 Hackathon) spanning 49+ career paths and 11 fields.\n• **Enterprise Systems**: Built **HP TechPulse** with automated WDV depreciation & Device Health Scores (94/100).\n• **Availability**: 🟢 Ready immediately for technical internships and developer roles.\n\nYou can ask about his **qualifications**, **projects**, **skills**, **certifications**, or **how to contact him**!`,
    actions: [
      { label: 'Download Resume PDF', url: personalInfo.resumePath, download: true },
      { label: 'Explore Projects', onClick: () => scrollToSection('projects') },
      { label: 'Get In Touch', onClick: () => scrollToSection('contact') }
    ]
  };
};

// Formats text so that **bold** is rendered as strong tags without raw asterisks
const renderFormattedText = (text) => {
  return text.split('\n').map((line, lineIdx) => {
    if (!line.trim()) {
      return <span key={lineIdx} className={styles.blankLine} />;
    }
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={lineIdx} className={styles.textLine}>
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className={styles.boldText}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </span>
    );
  });
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! 👋 I'm Meet's personal AI assistant. Ask me anything about his qualifications, projects, skills, education at CVMU, or hackathons!",
      actions: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, showQuestions]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowQuestions(false);

    setTimeout(() => {
      const response = getAIResponse(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        actions: response.actions || []
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          className={styles.fabBtn}
          onClick={() => setIsOpen(true)}
          title="Ask Meet's AI Anything"
          aria-label="Open Meet's AI Assistant"
        >
          <div className={styles.fabIconWrap}>
            <Bot size={22} className={styles.botIcon} />
            <span className={styles.pulseGlow} />
          </div>
          <span className={styles.fabLabel}>Ask Meet's AI 🧠</span>
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className={styles.chatWindow} role="dialog" aria-label="Meet's AI Assistant">
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>
                <Bot size={20} color="#ffffff" />
                <span className={styles.onlineDot} />
              </div>
              <div>
                <h3 className={styles.headerTitle}>Ask Me Anything About Meet 🧠</h3>
                <p className={styles.headerSubtitle}>I can answer questions about Meet's experience, projects, and skills.</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeBtn}
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area (Maximum vertical space) */}
          <div className={styles.messagesContainer}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${msg.sender === 'user' ? styles.userRow : styles.botRow}`}
              >
                {msg.sender === 'bot' && (
                  <div className={styles.botAvatar}>
                    <Sparkles size={14} color="#6366f1" />
                  </div>
                )}
                <div className={`${styles.bubble} ${msg.sender === 'user' ? styles.userBubble : styles.botBubble}`}>
                  <div className={styles.messageText}>
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Action Pills inside Bot Messages */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className={styles.actionPills}>
                      {msg.actions.map((act, idx) => (
                        act.url ? (
                          <a
                            key={idx}
                            href={act.url}
                            target={act.download ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            download={act.download ? 'Meet_Chauhan_Resume.pdf' : undefined}
                            className={styles.actionPill}
                            onClick={() => { if (!act.download) setIsOpen(false); }}
                          >
                            {act.download ? <Download size={13} /> : <ExternalLink size={13} />}
                            <span>{act.label}</span>
                          </a>
                        ) : (
                          <button
                            key={idx}
                            onClick={() => {
                              act.onClick?.();
                              setIsOpen(false);
                            }}
                            className={styles.actionPill}
                          >
                            <span>{act.label}</span>
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.messageRow} ${styles.botRow}`}>
                <div className={styles.botAvatar}>
                  <Sparkles size={14} color="#6366f1" />
                </div>
                <div className={`${styles.bubble} ${styles.botBubble}`}>
                  <div className={styles.typingIndicator}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Compact Suggested Questions Tray (Bottom) */}
          <div className={styles.bottomTray}>
            <button 
              className={styles.drawerToggle}
              onClick={() => setShowQuestions(!showQuestions)}
              aria-expanded={showQuestions}
            >
              <span>Suggested Questions</span>
              {showQuestions ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            {showQuestions && (
              <div className={styles.questionsList}>
                {QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className={styles.questionChip}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            className={styles.inputBar}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask a question about Meet..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.inputField}
              aria-label="Type your message for Meet's AI Assistant"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={styles.sendBtn}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
