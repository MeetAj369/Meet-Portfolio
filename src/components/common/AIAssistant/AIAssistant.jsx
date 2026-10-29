import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, ExternalLink, Download, Mail, ChevronUp, ChevronDown } from 'lucide-react';
import { scrollToSection } from '../../../utils/helpers';
import { personalInfo } from '../../../data/personalInfo';
import styles from './AIAssistant.module.css';

const QUICK_QUESTIONS = [
  "What's Meet's experience with Full Stack & React?",
  "Tell me about the CareerSync hackathon project.",
  "What is his CGPA & Education at CVMU?",
  "What backend & database technologies does Meet use?",
  "How can I contact Meet or download his CV?"
];

// Smart response generator based on Meet Chauhan's verified CV & background
const getAIResponse = (query) => {
  const q = query.toLowerCase();

  if (q.includes('careersync') || q.includes('hackathon') || q.includes('techsprint')) {
    return {
      text: `🚀 **CareerSync** is an AI-powered career navigation platform engineered by Meet during the **TechSprint 2.0 Hackathon**!\n\n• **Core Impact**: Provides guided assessments and intelligent career matching across **49+ career paths** and 11 industries.\n• **Frontend**: Built with **Next.js 16 & React 19** with TypeScript, Tailwind CSS 4, and dark/light adaptive theming.\n• **Backend**: High-performance **Python FastAPI** & SQLAlchemy with **18 normalized PostgreSQL tables**, automated Word/PDF resume export, and a multi-tier AI mentor fallback.`,
      actions: [
        { label: 'View in Projects', onClick: () => scrollToSection('projects') },
        { label: 'GitHub Repository', url: personalInfo.github }
      ]
    };
  }

  if (q.includes('cgpa') || q.includes('education') || q.includes('cvmu') || q.includes('university') || q.includes('college') || q.includes('bca') || q.includes('study')) {
    return {
      text: `🎓 **Education & Academic Record**:\n\n• **Degree**: Bachelor of Computer Applications (BCA)\n• **University**: Charutar Vidya Mandal University (CVMU), Anand, Gujarat\n• **Timeline**: June 2024 – June 2027\n• **Academic Performance**: **8.67 / 10.0 CGPA**\n• **International Background**: Completed Foundation Programme at London South Bank University (LSBU), UK in 2023.`,
      actions: [
        { label: 'View Education Section', onClick: () => scrollToSection('education') },
        { label: 'Download Verified CV', url: personalInfo.resumePath, download: true }
      ]
    };
  }

  if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('work') || q.includes('techpulse') || q.includes('expense')) {
    return {
      text: `💻 **Meet's Key Projects**:\n\n1. **CareerSync**: AI Career Navigation Platform (Next.js 16, React 19, FastAPI, PostgreSQL, 49+ career paths).\n2. **HP TechPulse**: Enterprise IT Asset Lifecycle platform with Device Health Scores (94/100) and automated WDV asset depreciation.\n3. **HP Mobile Selling System**: Full-stack inventory & billing POS portal with relational MySQL schemas.\n4. **HP Expense Tracker**: Financial application for budget limits, ledger analytics, and spending charts.\n5. **Chaos Mode Portfolio**: Built with React 19 and Matter.js 2D physics sandbox.`,
      actions: [
        { label: 'Explore All Projects', onClick: () => scrollToSection('projects') }
      ]
    };
  }

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('python') || q.includes('fastapi') || q.includes('frontend') || q.includes('backend') || q.includes('database')) {
    return {
      text: `🛠️ **Meet's Technical Stack**:\n\n• **Frontend**: ReactJS, Next.js 16, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS 4, Bootstrap.\n• **Backend**: Python (FastAPI, SQLAlchemy), NodeJS, PHP (OOP), REST APIs, JSON.\n• **Databases**: MySQL, PostgreSQL, SQLite, Relational Modeling & CRUD.\n• **Tools & AI**: Git, GitHub, VS Code, FastAPI Swagger, Claude AI, ChatGPT, Machine Learning, Data Science.`,
      actions: [
        { label: 'View Interactive Skills', onClick: () => scrollToSection('skills') }
      ]
    };
  }

  if (q.includes('certif') || q.includes('iit') || q.includes('claude') || q.includes('course') || q.includes('credential')) {
    return {
      text: `🏆 **Verified Technical Certifications**:\n\n• **Artificial Intelligence (AI)** - Techfest @IIT Bombay\n• **Machine Learning (ML)** - Techfest @IIT Bombay\n• **Claude AI** - AI-Assisted Coding & Debugging (Anthropic)\n• **Data Science** - Data Analysis & Visualization Fundamentals\n• **Web Development** - Full Stack Fundamentals (HTML, CSS, JS, PHP)\n• **Database Architecture** - Relational Modeling & SQL`,
      actions: [
        { label: 'View Certifications', onClick: () => scrollToSection('certifications') }
      ]
    };
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('resume') || q.includes('cv') || q.includes('job') || q.includes('intern') || q.includes('available')) {
    return {
      text: `📬 **Contact & Availability**:\n\n• **Status**: 🟢 **Available Immediately** for Technical Internships and Full-Time Software Engineering roles!\n• **Email**: ${personalInfo.email}\n• **Phone / WhatsApp**: ${personalInfo.phone}\n• **Location**: Anand, Gujarat, India (Open to Remote / Relocation)\n• **Resume**: Official updated CV ready for instant download.`,
      actions: [
        { label: 'Download Resume PDF', url: personalInfo.resumePath, download: true },
        { label: 'Send Direct Email', onClick: () => scrollToSection('contact') }
      ]
    };
  }

  return {
    text: `Meet Chauhan is a **Full Stack & Frontend Developer** (ReactJS / NodeJS / Python) and BCA undergraduate at **Charutar Vidya Mandal University (8.67 CGPA)**.\n\nHe specializes in building scalable web applications, FastAPI backends, and AI-assisted platforms like **CareerSync** (TechSprint 2.0) and **HP TechPulse**.\n\nFeel free to ask about his **projects**, **skills**, **education**, or **how to contact him**!`,
    actions: [
      { label: 'Download Resume', url: personalInfo.resumePath, download: true },
      { label: 'Explore Projects', onClick: () => scrollToSection('projects') },
      { label: 'Contact Meet', onClick: () => scrollToSection('contact') }
    ]
  };
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! 👋 I'm Meet's interactive AI assistant. Ask me anything about his technical projects, full-stack skills, education at CVMU, or hackathons!",
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
  }, [messages, isOpen, isTyping]);

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
          title="Ask Me Anything About Meet"
          aria-label="Open AI Assistant"
        >
          <div className={styles.fabIconWrap}>
            <Bot size={24} className={styles.botIcon} />
            <span className={styles.pulseGlow} />
          </div>
          <span className={styles.fabLabel}>Ask AI 🧠</span>
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className={styles.chatWindow} role="dialog" aria-label="AI Assistant Dialog">
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>
                <Bot size={20} color="#ffffff" />
                <span className={styles.onlineDot} />
              </div>
              <div>
                <h3 className={styles.headerTitle}>Ask Me Anything About Meet 🧠</h3>
                <p className={styles.headerSubtitle}>Instant answers on Meet's projects, stack & background</p>
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

          {/* Quick Questions Accordion */}
          <div className={styles.questionsDrawer}>
            <button 
              className={styles.drawerToggle}
              onClick={() => setShowQuestions(!showQuestions)}
              aria-expanded={showQuestions}
            >
              <span>Suggested Questions</span>
              {showQuestions ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
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
                    {msg.text.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
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
