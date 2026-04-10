export type ExperienceItem = {
  year: string;
  role: string;
  company: string;
  location: string;
  points: string[];
};

export type ProjectItem = {
  name: string;
  stack: string[];
  description: string;
  details: string[];
  badge?: string;
};

export type AwardItem = {
  title: string;
  detail: string;
};

export type SkillCategory = {
  label: string;
  items: string[];
};

export type DetailPayload = {
  title: string;
  subtitle?: string;
  lines: string[];
  link?: {
    label: string;
    href: string;
  };
};

export const experience: ExperienceItem[] = [
  {
    year: "Aug 2023 - Mar 2024",
    role: "Learning & Foundation Phase",
    company: "Self-Learning Journey",
    location: "Bhilai, India",
    points: [
      "Started focused learning in 2023 with Python, C++, SQL, data structures, and system fundamentals.",
      "Built mini projects and practice pipelines to prepare for production-grade AI and full-stack work.",
    ],
  },
  {
    year: "Apr 2024 - Jun 2025",
    role: "Open Source Contributor",
    company: "AOSSIE",
    location: "Remote",
    points: [
      "Resolved TailwindCSS / PostCSS ESM configuration conflict that blocked all CI builds, unblocking 5+ contributors.",
      "Added TypeScript support, GitHub Actions CI/CD, and Docker configuration; reduced manual deployment steps by about 60%.",
    ],
  },
  {
    year: "Sep 2024 - Nov 2025",
    role: "AI Developer",
    company: "CogniAble",
    location: "Remote",
    points: [
      "Engineered YOLOv8 + Deep SORT real-time tracking, achieving 95%+ accuracy on multi-subject therapy videos.",
      "Processed and annotated 50+ hours of video, enabling behavioral pattern extraction about 3x faster than manual review.",
    ],
  },
  {
    year: "Apr 2025 - Present",
    role: "Full Stack Developer",
    company: "Oncorg",
    location: "Remote",
    points: [
      "Delivered 3+ full-stack C#/.NET applications in agile workflow; improved feature delivery speed by around 30%.",
      "Optimized SQL Server query paths for high-frequency endpoints; reduced average API response times by 40%.",
    ],
  },
  {
    year: "Apr 2025 - Present",
    role: "Freelance Developer",
    company: "Self-Employed",
    location: "Remote",
    points: [
      "Completed 10+ client projects across AI, computer vision, data science, and web development with 100% on-time delivery.",
      "Published 3+ open-source ML and automation tools on GitHub with active developer usage.",
    ],
  },
  {
    year: "Jan 2026 - Feb 2026",
    role: "Full Stack Developer",
    company: "Code2Dbug",
    location: "Bhilai, India",
    points: [
      "Built and deployed 4 full-stack web apps with Node.js, Express, and React (Vite) in 6 weeks.",
      "Resolved frontend-backend integration failures in legacy projects, reducing user-facing errors by over 80%.",
    ],
  },
  {
    year: "Jan 2026 - Present",
    role: "Open Source Contributor",
    company: "Supabase",
    location: "Remote",
    points: [
      "Fixed a storage URL initialization bug in supabase-py affecting storage SDK calls across client environments.",
      "Added 12+ unit tests for Sync and Async clients covering five URL edge-case scenarios and baseline coverage.",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    name: "FAMS - AI Medical Assistant",
    stack: ["Python", "Computer Vision", "Voice AI", "LLM"],
    description:
      "Real-time visual assessment and voice-guided diagnosis pipeline using computer vision and LLM integration.",
    details: [
      "Built multimodal medical assistant flow combining visual inference and conversational guidance.",
      "Designed real-time pipeline orchestration for low-latency assessment loops.",
      "Won 2nd place at AVISHKAR 2025 in Bhilai among 80+ teams.",
    ],
    badge: "2nd Place - AVISHKAR 2025 (80+ teams)",
  },
  {
    name: "Computed Fields Engine (Notion/Airtable-style)",
    stack: ["TypeScript", "Node.js", "System Design"],
    description:
      "Formula-based derivation engine with dependency graph, topological sorting, circular dependency detection, and safe server evaluation.",
    details: [
      "Implemented generic computed expressions such as Price * Quantity and FullName composition.",
      "Built dependency graph evaluator with deterministic execution order.",
      "Resolved AsyncLocalStorage execution issues for consistent server-side updates.",
    ],
  },
  {
    name: "SamarthyaBot - AI Agent OS",
    stack: ["Node.js", "Automation", "Multi-Agent AI"],
    description:
      "Privacy-first self-hosted AI agent enabling autonomous workflows with multi-LLM integration and secure local memory.",
    details: [
      "Built agent orchestration for coding, browsing, and deployment workflows.",
      "Implemented privacy-oriented local execution model.",
      "Integrated multiple LLM providers into one agent runtime.",
    ],
  },
  {
    name: "Money Muling Detector (PWIOI)",
    stack: ["C++", "React", "TypeScript", "Graph Algorithms"],
    description:
      "AI-powered fraud engine detecting money muling and smurfing with Red-Black Tree and Decision Tree at O(N log N).",
    details: [
      "Processed 10,000+ transactions with algorithmic fraud pattern scoring.",
      "Combined structured graph features with decision models for risk detection.",
      "Won RIFT Hackathon in Bangalore, India.",
    ],
    badge: "Winner - RIFT Hackathon, Bangalore",
  },
  {
    name: "FarmView AI - Smart Crop Monitoring",
    stack: ["YOLOv8", "OpenCV", "Machine Learning"],
    description:
      "Real-time system for crop disease, pest, and nutrient deficiency detection from live camera streams.",
    details: [
      "Classified 5+ crop issue categories from field imagery.",
      "Optimized model loop for near real-time inference behavior.",
      "Presented at HackOmania 2025 as finalist.",
    ],
    badge: "Finalist - HackOmania 2025",
  },
  {
    name: "Agentic Honeypot - Cyber Threat Detection",
    stack: ["Python", "AI Agents", "Security"],
    description:
      "Agent-based honeypot simulating vulnerable services to capture structured attacker telemetry.",
    details: [
      "Designed service simulation patterns to attract intrusion attempts.",
      "Captured and normalized threat events into machine-readable intelligence.",
      "Automated triage path using agentic reasoning loops.",
    ],
  },
  {
    name: "Kuya Cloud - Data Analytics Platform",
    stack: ["Python", "Data Processing", "Visualization"],
    description:
      "Rule-based analytics and automated visualization platform enabling non-technical users to explore datasets with zero code.",
    details: [
      "Built configurable rule engine for data transformation and chart generation.",
      "Designed no-code data exploration UX for non-technical workflows.",
      "Published peer-reviewed research at Zenodo (doi:10.5281/zenodo.18803300).",
    ],
    badge: "Peer-reviewed - Zenodo DOI:10.5281/zenodo.18803300",
  },
];

export const awards: AwardItem[] = [
  {
    title: "2nd Place - AVISHKAR 2025",
    detail: "FAMS AI Medical Assistant | Bhilai, India | 80+ teams",
  },
  {
    title: "Winner - RIFT Hackathon",
    detail: "Money Muling Detector | Bangalore, India",
  },
  {
    title: "Finalist - HackOmania 2025",
    detail: "FarmView AI Crop Monitoring System | Bhilai, India",
  },
  {
    title: "Participant - MumbaiHacks 2025",
    detail: "FEZI Autonomous Fact-Verification System | Mumbai, India",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Go", "C", "SQL"],
  },
  {
    label: "Frameworks",
    items: [
      "Node.js",
      "Express",
      "React (Vite)",
      "Flask",
      ".NET",
      "TensorFlow",
      "OpenCV",
    ],
  },
  {
    label: "AI / ML",
    items: [
      "YOLOv8",
      "Deep SORT",
      "Computer Vision",
      "Deep Learning",
      "LLM Integration",
      "Graph Algorithms",
    ],
  },
  {
    label: "Databases",
    items: ["MySQL", "MongoDB", "SQL Server"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub Actions",
      "Docker",
      "CI/CD",
      "REST APIs",
      "CMake",
      "Power BI",
    ],
  },
  {
    label: "Concepts",
    items: [
      "Real-time Inference",
      "Agentic AI",
      "Data Pipelines",
      "Distributed Systems",
      "Red-Black Trees",
    ],
  },
];

export const publication = {
  title:
    "Sahu, B. P. (2026). Kuya Cloud: A Rule-Based Data Analytics and Automated Visualization Platform for Democratizing Data Science.",
  doi: "10.5281/zenodo.18803300",
  doiUrl: "https://doi.org/10.5281/zenodo.18803300",
  pdfPath: "/kuya_cloud_paper.pdf",
};

export const resumeProfile = {
  name: "BISHNU PRASAD SAHU",
  contact:
    "Bhilai, India | +91 9301105706 | mebishnusahu@gmail.com | linkedin.com/in/mebishnusahu05 | github.com/mebishnusahu0595",
  summary:
    "Full Stack Engineer with 2+ years of hands-on experience in Python, AI/ML, and Computer Vision. Shipped 10+ production projects across real-time inference, REST APIs, and open-source SDKs. Contributed to Supabase and AOSSIE, won 2 hackathons, and published peer-reviewed research.",
  education: "Bachelor of Computer Applications | Rungta College of Science and Technology | Aug 2023 - Apr 2026",
  certification: "Generative AI Certification | NULL Class | Apr 2024 - Aug 2025",
};
