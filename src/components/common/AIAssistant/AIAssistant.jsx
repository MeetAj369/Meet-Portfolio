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
  "Why should our team hire Meet?",
  "Where can I view & download Meet's verified Resume?"
];

// Conversational AI Engine for Meet Chauhan's Portfolio
const getAIResponse = (query) => {
  const rawQ = query.trim();
  const q = rawQ.toLowerCase();

  // 1. Natural Greetings (hi, hii, hello, hey, etc.)
  const isGreeting = /^(hi|hii|hiii|hello|hey|heyy|helo|hola|howdy|namaste|good\s*(morning|afternoon|evening|day))[\s!.]*$/i.test(q) ||
    ['hi', 'hii', 'hiii', 'hello', 'hey', 'heyy', 'hola'].includes(q);

  if (isGreeting) {
    return {
      text: `Hello there! 👋 How can I help you today?\n\nI'm Meet's personal AI assistant. I can answer questions about his software engineering background, full-stack projects (like CareerSync or HP TechPulse), his tech stack (React, Next.js, Python FastAPI), his education at CVMU, or how to get in touch!`,
      actions: [
        { label: 'View Key Projects', onClick: () => scrollToSection('projects') },
        { label: 'Explore Skills', onClick: () => scrollToSection('skills') },
        { label: 'Download Resume (PDF)', url: personalInfo.resumePath, download: true }
      ]
    };
  }

  // 2. Casual Inquiries (how are you, what's up, etc.)
  if (
    q.includes('how are you') ||
    q.includes('how r u') ||
    q.includes('whats up') ||
    q.includes("what's up") ||
    q.includes('how are u') ||
    q.includes('how do you do')
  ) {
    return {
      text: `I'm doing great, thank you for asking! 😊 I'm fully up to date on Meet Chauhan's software engineering background and projects. What would you like to know about him?`,
      actions: [
        { label: 'Meet’s Qualifications', onClick: () => scrollToSection('education') },
        { label: 'Featured Projects', onClick: () => scrollToSection('projects') },
        { label: 'Download Resume', url: personalInfo.resumePath, download: true }
      ]
    };
  }

  // 3. Who are you / What can you do?
  if (
    q.includes('who are you') ||
    q.includes('what are you') ||
    q.includes('what can you do') ||
    q.includes('your name') ||
    q.includes('introduce yourself')
  ) {
    return {
      text: `I'm **Ask Meet's AI** 🧠, a conversational assistant trained on Meet Chauhan's verified resume, academic history, and engineering projects.\n\nHere's what I can do for you:\n• Walk you through his **key engineering projects** like CareerSync & HP TechPulse\n• Detail his technical stack in **React 19, Next.js 16, Python FastAPI, and PostgreSQL**\n• Share his academic achievements (**8.67 CGPA** at CVMU & LSBU foundation)\n• Provide instant links to **download his verified PDF resume** or contact him directly!`,
      actions: [
        { label: 'Download Resume (PDF)', url: personalInfo.resumePath, download: true },
        { label: 'Get in Touch', onClick: () => scrollToSection('contact') }
      ]
    };
  }

  // 4. Polite Acknowledgments / Compliments (thanks, thank you, cool, great, bye)
  if (
    q.includes('thank') ||
    q.includes('thx') ||
    q.includes('awesome') ||
    q.includes('great') ||
    q.includes('cool') ||
    q.includes('nice') ||
    q.includes('good job')
  ) {
    return {
      text: `You're very welcome! 😊 Feel free to ask if there's anything else you'd like to explore about Meet's work, or reach out to him directly through the Contact section below. Have a wonderful day! 🚀`,
      actions: [
        { label: 'Send Direct Message', onClick: () => scrollToSection('contact') },
        { label: 'View LinkedIn Profile', url: personalInfo.linkedin }
      ]
    };
  }

  if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('cya')) {
    return {
      text: `Goodbye! 👋 Thanks for visiting Meet Chauhan's portfolio. Feel free to connect with him on LinkedIn or GitHub anytime!`,
      actions: [
        { label: 'Meet’s LinkedIn', url: personalInfo.linkedin },
        { label: 'Meet’s GitHub', url: personalInfo.github }
      ]
    };
  }

  // 5. Why Hire Meet / Strengths / Fit
  if (
    q.includes('hire') ||
    q.includes('why meet') ||
    q.includes('why should') ||
    q.includes('strength') ||
    q.includes('recommend')
  ) {
    return {
      text: `Here is why Meet Chauhan is a strong addition to any engineering team:\n\n1. **Full-Stack Execution**: Builds fast, responsive React 19 & Next.js 16 user interfaces backed by async Python FastAPI & Node.js microservices.\n2. **Hackathon Proven**: Architected **CareerSync** during the TechSprint 2.0 Hackathon across 49+ career paths and 18 normalized PostgreSQL tables under tight deadlines.\n3. **Academic Excellence**: Holds an **8.67 / 10.0 CGPA** in BCA at Charutar Vidya Mandal University and completed a Foundation Programme in Computing at London South Bank University.\n4. **AI-Native Engineering**: Certified in AI/ML (Techfest @IIT Bombay); utilizes Claude AI and modern LLMs to accelerate developer velocity and clean code.\n\n🟢 **Status**: Available immediately for technical internships and entry-level developer roles!`,
      actions: [
        { label: 'Download Verified Resume', url: personalInfo.resumePath, download: true },
        { label: 'Contact Meet Directly', onClick: () => scrollToSection('contact') }
      ]
    };
  }

  // 6. Specific Technologies (Python, React, FastAPI, Next.js, Databases)
  if (q.includes('python') || q.includes('fastapi')) {
    return {
      text: `Yes, absolutely! Meet has deep hands-on experience with **Python** and **FastAPI**.\n\n• **Microservices**: Built asynchronous, high-throughput REST APIs with auto-generated Swagger documentation.\n• **ORM & Relational Schemas**: Utilizes SQLAlchemy with PostgreSQL (18 tables in CareerSync) and MySQL.\n• **AI Integrations**: Leverages Python for AI/ML workflows and automated document generation engines.`,
      actions: [
        { label: 'View CareerSync Project', onClick: () => scrollToSection('projects') },
        { label: 'Skills Breakdown', onClick: () => scrollToSection('skills') }
      ]
    };
  }

  if (q.includes('react') || q.includes('next') || q.includes('frontend')) {
    return {
      text: `React and Next.js are the foundation of Meet's frontend engineering stack!\n\n• **Modern Tech**: Builds with **React 19** and **Next.js 16** with TypeScript and Tailwind CSS 4.\n• **Architectural Strengths**: Component-driven architecture, dark/light adaptive glassmorphism, responsive mobile layouts, and JWT session handling.\n• **Hackathon Impact**: Delivered complete responsive UI for CareerSync in Next.js 16 during TechSprint 2.0.`,
      actions: [
        { label: 'Explore Frontend Projects', onClick: () => scrollToSection('projects') },
        { label: 'Skills Section', onClick: () => scrollToSection('skills') }
      ]
    };
  }

  if (q.includes('database') || q.includes('sql') || q.includes('postgres') || q.includes('mysql')) {
    return {
      text: `Meet has strong expertise in relational database architecture and data modeling:\n\n• **Databases**: PostgreSQL, MySQL, and SQLite.\n• **Normalization**: Proven ability to design clean 3NF relational schemas (e.g. 18 normalized tables for CareerSync).\n• **ACID & CRUD**: Complex SQL queries, indexes, automated migrations with SQLAlchemy, and secure transaction workflows.`,
      actions: [
        { label: 'View Database Skills', onClick: () => scrollToSection('skills') }
      ]
    };
  }

  // 7. Qualifications / Education / Degree / Marks / CGPA / University
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
      text: `🎓 **Meet's Qualifications & Education**:\n\n• **Bachelor of Computer Applications (BCA)**\n  Institution: **Charutar Vidya Mandal University (CVMU)**, Anand, Gujarat\n  Duration: June 2024 – June 2027\n  Academic Score: **8.67 / 10.0 CGPA**\n\n• **Foundation Programme in Computing**\n  Institution: **London South Bank University (LSBU)**, London, UK (2023)\n\n• **Core Disciplines**: Full Stack Software Architecture, Data Structures & Algorithms, Relational Database Modeling (MySQL / PostgreSQL), and Scalable Distributed Systems.`,
      actions: [
        { label: 'Download Verified CV (PDF)', url: personalInfo.resumePath, download: true },
        { label: 'View Education Section', onClick: () => scrollToSection('education') }
      ]
    };
  }

  // 8. CareerSync / Hackathon
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

  // 9. HP TechPulse & Enterprise Systems
  if (q.includes('techpulse') || q.includes('asset') || q.includes('lifecycle') || q.includes('gadget')) {
    return {
      text: `⚡ **HP TechPulse (Enterprise IT Asset Lifecycle)**:\n\n• **Platform Scope**: Centralizes enterprise devices, users, support tickets, maintenance schedules, stock, and vendors in a unified system.\n• **Key Features**: Real-time **Device Health Scores (94/100 benchmark)**, automated **Written Down Value (WDV)** depreciation calculations, and repair ticket lifecycle workflows.\n• **Sustainability**: Built-in **Green Pulse** analytics to monitor device carbon footprint and e-waste reduction.\n• **Tech Stack**: PHP (OOP), MySQL relational schemas, JavaScript, HTML5, CSS3.`,
      actions: [
        { label: 'View in Projects', onClick: () => scrollToSection('projects') }
      ]
    };
  }

  // 10. Projects Overview
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
      text: `💻 **Meet's Key Engineering Projects**:\n\n1. **CareerSync**: AI Career Navigation Platform (Next.js 16, React 19, FastAPI, PostgreSQL, 49+ career paths).\n2. **HP TechPulse**: Enterprise IT Asset Lifecycle system with Device Health Scores (94/100) & automated WDV depreciation.\n3. **HP Mobile Selling System**: Full-stack retail & inventory management portal with billing automation.\n4. **HP Expense Tracker**: Financial tracking application for budgets, expense categorization & ledger analytics.`,
      actions: [
        { label: 'View All Featured Projects', onClick: () => scrollToSection('projects') },
        { label: 'GitHub Repositories', url: personalInfo.github }
      ]
    };
  }

  // 11. Certifications (IIT Bombay, Anthropic)
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

  // 12. Contact / Resume / Availability
  if (
    q.includes('contact') ||
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
    q.includes('location') ||
    q.includes('anand')
  ) {
    return {
      text: `📬 **Contact Information & Availability**:\n\n• **Status**: 🟢 **Available Immediately** for Full-Stack / Frontend Developer internships and entry-level engineering roles!\n• **Email**: ${personalInfo.email}\n• **Phone / WhatsApp**: ${personalInfo.phone}\n• **Location**: Anand, Gujarat, India (Open to Remote, Hybrid, & Relocation)\n• **Official Resume**: Verified PDF CV available for direct download.`,
      actions: [
        { label: 'Download Resume (PDF)', url: personalInfo.resumePath, download: true },
        { label: 'Send Direct Message', onClick: () => scrollToSection('contact') }
      ]
    };
  }

  // 13. General / Natural Fallback Response
  return {
    text: `Thanks for asking about that! 😊\n\nMeet Chauhan is a **Full Stack & Frontend Developer** with expertise in ReactJS, Next.js 16, Python FastAPI, and PostgreSQL. He maintains an **8.67 CGPA** at Charutar Vidya Mandal University and is best known for architecting **CareerSync** (TechSprint 2.0 Hackathon) and **HP TechPulse**.\n\nYou can ask me specifically about his **qualifications**, **projects**, **tech stack**, **certifications**, or **how to contact him**!`,
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
      text: "Hi there! 👋 I'm Meet's personal AI assistant. How can I help you? Ask me anything about his qualifications, projects, skills, education at CVMU, or hackathons!",
      actions: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
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

    // Dynamic latency: natural AI thinking cadence
    const latency = Math.min(300 + query.length * 8, 650);

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
    }, latency);
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

          {/* Messages Area */}
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about Meet..."
              className={styles.inputField}
              aria-label="Ask a question"
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
