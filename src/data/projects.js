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
    title: 'HP TechPulse — Enterprise IT Asset Lifecycle & Gadget Health Intelligence',
    fileName: 'gadget_passport.php',
    codeSnippet: `function calculate_health_score($conn, $gadget_id) {
  $score = 100 - min(30, floor($age_months / 2));
  $score -= min(40, $repairs_count * 8); // -8 pts/repair
  if ($has_warranty) $score += 10;       // active warranty
  if ($has_amc)      $score += 8;        // active AMC
  return ['score' => max(0, min(100, $score)), 'verdict' => 'Excellent'];
}`,
    description: 'Engineered an enterprise-grade IT Asset Management (ITAM) and Hardware Lifecycle platform centralizing devices, users, support tickets, maintenance schedules, stock, and vendors in a unified system. Features verifiable Digital Gadget Passports with QR codes and FPDF printable certificates, dynamic Device Health Scoring (0–100 benchmark), automated Written Down Value (WDV) asset depreciation, and a 5-stage IT support ticket workflow (Open → Assigned → In-Progress → Testing → Resolved). Built Green Pulse sustainability analytics for device carbon footprint and e-waste reduction, backed by a 14-table normalized MySQL schema and secure multi-role RBAC.',
    shortDescription: 'Enterprise IT asset lifecycle platform featuring Digital Gadget Passports with QR/PDF certificates, 0-100 Device Health Scoring, WDV depreciation & Green Pulse carbon analytics.',
    technologies: ['PHP (OOP/BCrypt)', 'MySQL (14 Tables)', 'FPDF Engine', 'JavaScript', 'HTML5', 'CSS3 Glassmorphism'],
    features: [
      'Verifiable Digital Gadget Passport™ with QR codes and FPDF printable PDF certificates',
      'Dynamic Device Health Intelligence (0-100 score) based on age, repairs, and AMC/warranty coverage',
      'Automated Written Down Value (WDV) asset depreciation engine & Total Cost of Ownership (TCO)',
      '5-Stage IT Support Ticket Lifecycle (Open → Assigned → In-Progress → Testing → Resolved)',
      'Real-time spares & inventory catalog with low-stock alerts and vendor management',
      'Green Pulse sustainability analytics calculating device carbon footprint and e-waste reduction',
      '14-table normalized MySQL schema (techpulse369) with comprehensive audit trail logging',
      'Multi-role RBAC with dedicated Administrator, Support Technician, and Employee portals'
    ],
    github: 'https://github.com/MeetAj369/HP-TechPulse',
    liveDemo: 'https://meetaj369.github.io/HP-TechPulse/',
    image: '/Meet-Portfolio/uploads/hp-techpulse-logo.png',
    featured: true,
    category: 'Enterprise / Full Stack'
  },
  {
    id: 3,
    title: 'HP Mobile Store — Full-Stack E-Commerce & Retail POS Platform',
    fileName: 'invoice.php',
    codeSnippet: `// Pure PHP PDF Tax Invoice & POS Billing Engine
$items = mysqli_query($conn, "SELECT m.name, oi.quantity, oi.price 
  FROM order_items oi JOIN mobiles m ON oi.mobile_id = m.id 
  WHERE oi.order_id = $order_id");
$pdf->drawInvoice($order, $items, $grand_total, $gst_18);`,
    description: 'Full-stack e-commerce and retail Point-of-Sale (POS) management platform designed for consumer electronics retail. Features a 25+ flagship smartphone catalog across Apple, Samsung, OnePlus, Xiaomi, and Realme, an interactive shopping cart and checkout pipeline with COD, UPI and Card simulations, automated printable PDF GST tax invoice generation (invoice.php), real-time inventory reconciliation with low-stock warnings, and an administrative sales analytics suite.',
    shortDescription: 'Full-stack retail e-commerce portal with 25+ smartphone catalog, POS checkout, stock management & automated PDF GST invoicing.',
    technologies: ['PHP', 'MySQL (7 Tables)', 'FPDF / PDF Engine', 'JavaScript', 'HTML5', 'CSS3'],
    features: [
      'Multi-brand flagship smartphone catalog with detailed hardware specs (RAM, Storage, Optics)',
      'Interactive shopping cart & express checkout supporting COD, UPI QR, and Card payments',
      'Automated printable PDF tax invoice generation with GST breakdown and order stamps',
      'Real-time inventory and warehouse stock monitoring with low-stock threshold alerts',
      'Admin command center with revenue analytics, sales reporting, and order status tracking',
      'Customer portal for order history tracking and re-downloading tax invoices'
    ],
    github: 'https://github.com/MeetAj369/HP_MobileStore_Final',
    liveDemo: 'https://meetaj369.github.io/HP_MobileStore_Final/',
    image: '/Meet-Portfolio/uploads/hp-mobilestore.jpg',
    featured: true,
    category: 'E-Commerce / Full Stack'
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
    title: 'Interactive Liquid Glass Portfolio',
    fileName: 'PortfolioShowcase.jsx',
    codeSnippet: `import { AIAssistant, ParticleAurora } from './components';
// 2026 Liquid Glass Portfolio Engine
const theme = useTheme();
export default function Portfolio() { return <LiquidGlassUI />; }`,
    description: 'A personal portfolio engineered with React 19 featuring dark/light adaptive Liquid Glassmorphism, dynamic aurora particle canvas, and a conversational AI Assistant.',
    shortDescription: 'Modern interactive portfolio with Liquid Glassmorphism, dynamic aurora canvas & AI Assistant.',
    technologies: ['React 19', 'Vite', 'CSS Modules', 'JavaScript', 'Liquid Glass'],
    features: [
      'Modern 2026 Liquid Glassmorphism with specular inner highlights',
      'Conversational AI Assistant trained on verified background and projects',
      'Dynamic 4-orb liquid aurora background with mouse parallax',
      'Fully responsive, mobile-optimized experience across all devices'
    ],
    github: 'https://github.com/MeetAj369/Meet-Portfolio',
    liveDemo: 'https://meetaj369.github.io/Meet-Portfolio/',
    image: null,
    featured: false,
    category: 'Web Development'
  }
];
