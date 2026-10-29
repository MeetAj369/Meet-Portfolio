export const projects = [
  {
    id: 1,
    title: 'CareerSync — AI Career Guidance Platform',
    fileName: 'CareerSync.tsx',
    codeSnippet: `const careerSync = new AIPlatform({
  paths: 49, fields: 11,
  engine: "Next.js 16 + FastAPI"
});
await careerSync.matchMentor(assessment);`,
    description: 'Developed an AI-powered career navigation platform during TechSprint 2.0 Hackathon, providing guided assessments and career matching across 49+ career paths and 11 fields. Engineered responsive frontend in Next.js 16 & React 19 with TypeScript, Tailwind CSS 4, dark/light themes, and per-tab JWT session management. Built high-performance backend using Python (FastAPI, SQLAlchemy) with PostgreSQL (18 tables), automated resume export (Word/PDF), and multi-tier AI mentor fallback.',
    shortDescription: 'AI-powered career navigation platform developed during TechSprint 2.0 with guided assessments across 49+ career paths & 11 fields.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Python 3.12', 'FastAPI', 'PostgreSQL', 'Tailwind CSS 4'],
    features: [
      'Guided assessments & career matching across 49+ paths & 11 fields',
      'Next.js 16 & React 19 UI with TypeScript and Tailwind CSS 4',
      'Python FastAPI & SQLAlchemy backend with 18-table PostgreSQL schema',
      'Per-tab JWT session management & secure multi-auth workflows',
      'Multi-tier AI mentor fallback architecture for high reliability',
      'Automated resume export engine in Word and PDF formats'
    ],
    github: 'https://github.com/MeetAj369',
    liveDemo: 'https://meetaj369.github.io/Meet-Portfolio/',
    image: null,
    featured: true,
    category: 'AI / Full Stack'
  },
  {
    id: 2,
    title: 'HP TechPulse — IT Asset Lifecycle System',
    fileName: 'TechPulse.php',
    codeSnippet: `class HPTechPulse extends AssetManager {
  public function calculateHealth() {
    return $this->getDeviceScore(94);
  }
  public function runWDVDepreciation() {}
}`,
    description: 'Engineered an enterprise IT asset lifecycle platform centralizing devices, users, support tickets, maintenance schedules, stock, and vendors in a unified system. Implemented employee & admin portals featuring real-time Device Health Scores (94/100), automated WDV asset depreciation valuation, and repair ticket lifecycle workflows. Built Green Pulse sustainability analytics to monitor device carbon footprint and e-waste reduction, backed by normalized MySQL schemas and secure role-based access.',
    shortDescription: 'Enterprise IT asset lifecycle platform centralizing devices, support tickets, WDV depreciation & Green Pulse carbon analytics.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    features: [
      'Centralized enterprise asset tracking (devices, users, tickets, vendors)',
      'Real-time Device Health Scores with 94/100 benchmark metric',
      'Automated Written Down Value (WDV) asset depreciation valuation',
      'Green Pulse sustainability analytics for device carbon footprint & e-waste',
      'Role-based access control with distinct employee & admin portals',
      'Complete repair ticket lifecycle & scheduled maintenance alerts'
    ],
    github: 'https://github.com/MeetAj369',
    liveDemo: 'https://meetaj369.github.io/Meet-Portfolio/',
    image: null,
    featured: true,
    category: 'Web Application'
  },
  {
    id: 3,
    title: 'HP Mobile Selling System',
    fileName: 'MobileStore.sql',
    codeSnippet: `SELECT product_id, model, stock_count, price
FROM hp_mobile_inventory
WHERE status = 'IN_STOCK'
ORDER BY units_sold DESC;`,
    description: 'Full-stack retail & inventory management portal with billing automation. Features real-time stock monitoring, automated POS billing and invoice generation, product catalog management, supplier tracking, and structured customer purchase histories with secure transactional data handling.',
    shortDescription: 'Full-stack retail & inventory management portal with automated billing and catalog tracking.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    features: [
      'Automated POS billing & instant receipt/invoice generation',
      'Real-time stock level monitoring with low-inventory alerts',
      'Categorized mobile phone catalog with search and specifications filter',
      'Supplier records and transactional sales histories',
      'Secure admin panel with role-based sales reporting'
    ],
    github: 'https://github.com/MeetAj369',
    liveDemo: 'https://meetaj369.github.io/Meet-Portfolio/',
    image: null,
    featured: true,
    category: 'Web Development'
  },
  {
    id: 4,
    title: 'HP Expense Tracker',
    fileName: 'ExpenseTracker.py',
    codeSnippet: `@router.post('/analytics/ledger')
def get_budget_analytics(user_id: int):
    expenses = db.query(Expense).all()
    return generate_spending_charts(expenses)`,
    description: 'Financial tracking application for expense categorization, daily/monthly budgets & ledger analytics. Empowers users with interactive expense breakdown charts, dynamic budget limits, automated alerts when approaching limits, and exportable ledger data.',
    shortDescription: 'Financial tracking application for expense categorization, daily/monthly budgets & ledger analytics.',
    technologies: ['React', 'JavaScript', 'Python', 'CSS3', 'REST APIs'],
    features: [
      'Instant expense categorization and transaction logging',
      'Custom daily, weekly, and monthly budget limits with threshold alerts',
      'Visual ledger analytics and interactive expense distribution charts',
      'Filterable transaction history by category and date ranges',
      'Clean, responsive UI with dark/light mode support'
    ],
    github: 'https://github.com/MeetAj369',
    liveDemo: 'https://meetaj369.github.io/Meet-Portfolio/',
    image: null,
    featured: true,
    category: 'Web Application'
  },
  {
    id: 5,
    title: 'AI Chat Assistant',
    fileName: 'ChatAssistant.jsx',
    codeSnippet: `const response = await aiStream({
  engine: "claude-3-5-sonnet",
  messages: history,
  temperature: 0.7
});`,
    description: 'An intelligent conversational assistant application featuring streaming responses, persistent conversation memory, markdown and syntax-highlighted code rendering, and custom prompt templates.',
    shortDescription: 'Intelligent chat interface powered by modern LLM APIs with real-time streaming & syntax highlighting.',
    technologies: ['React', 'JavaScript', 'Python', 'Claude / AI API'],
    features: [
      'Real-time AI streaming responses',
      'Syntax-highlighted code blocks with copy-to-clipboard',
      'Conversation memory & session persistence',
      'Custom prompt shortcuts & system instructions'
    ],
    github: 'https://github.com/MeetAj369',
    liveDemo: 'https://meetaj369.github.io/Meet-Portfolio/',
    image: null,
    featured: false,
    category: 'AI / Full Stack'
  },
  {
    id: 6,
    title: 'Interactive Portfolio & Gravity Sandbox',
    fileName: 'PortfolioPhysics.js',
    codeSnippet: `import Matter from 'matter-js';
// 2D Physics Gravity Sandbox
const engine = Engine.create();
World.add(engine.world, [ground, skills]);`,
    description: 'A personal portfolio built with React featuring dark/light themes, smooth animations, particle backgrounds, and an interactive 2D physics Gravity Chaos Mode powered by Matter.js.',
    shortDescription: 'Modern interactive portfolio with animations, dark/light themes & Gravity Chaos Mode.',
    technologies: ['React', 'Matter.js', 'CSS3', 'JavaScript'],
    features: [
      'Interactive Chaos Mode with 2D physics gravity sandbox via Matter.js',
      'Dark/Light theme toggle with persistent preferences',
      'Animated stat counters and scroll reveals',
      'Fully responsive glassmorphism interface across all screen sizes'
    ],
    github: 'https://github.com/MeetAj369/Meet-Portfolio',
    liveDemo: 'https://meetaj369.github.io/Meet-Portfolio/',
    image: null,
    featured: false,
    category: 'Web Development'
  }
];
