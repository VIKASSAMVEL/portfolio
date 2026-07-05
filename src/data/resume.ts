export const resumeData = {
  personal: {
    name: "S. VIKAS",
    tagline: "Full-stack developer building production-grade systems & AI pipelines.",
    email: "vikassamvel123@gmail.com",
    phone: "+91-9790801678",
    linkedin: "https://linkedin.com/in/vikas-s070106",
    github: "https://github.com/vikassamvel"
  },
  stats: [
    { label: "CGPA", value: "8.58/10" },
    { label: "National Rank", value: "37/150", context: "TechXcelerate, BITS Goa" },
    { label: "Winner", value: "Agentic AI Hackathon 2025" },
    { label: "Top 5%", value: "ODOO x MSU FootPrints'25" },
    { label: "Patents", value: "2 Filed" }
  ],
  projects: [
    {
      id: "c2c",
      title: "Campus Recruitment Portal (C2C)",
      tagline: "Centralized placement portal with dual-database sync.",
      techStack: ["PHP", "MySQL", "MSSQL", "PDF Parsing"],
      engineeringNotes: [
        "Architected dual-database design (MSSQL/MySQL) to securely sync academic records.",
        "Developed an automated eligibility engine.",
        "Integrated custom ATS using PDF parsing to score student resumes."
      ],
      link: "https://miniapps.veltech.edu.in/c2c",
      architectureNodes: ["Student Data (MSSQL)", "Eligibility Engine", "Recruitment Portal (MySQL)"]
    },
    {
      id: "e2ee",
      title: "E2EE Chat System",
      tagline: "Secure Instant Messaging Platform with zero-knowledge privacy.",
      techStack: ["React", "Node.js", "Socket.io", "WebCrypto API", "PostgreSQL"],
      engineeringNotes: [
        "Engineered full-stack encrypted chat ensuring zero-knowledge privacy; backend routes without reading payloads.",
        "Implemented WebCrypto API for RSA key generation, exchanges, and AES-CBC encryption.",
        "Architected real-time messaging using Socket.io and PostgreSQL transaction state tracking."
      ],
      architectureNodes: ["Client A (RSA/AES)", "Socket.io Router", "Client B (RSA/AES)"]
    },
    {
      id: "farmer-ai",
      title: "Farmer AI Agent",
      tagline: "Intelligent Multilingual Decision Support System.",
      techStack: ["Python", "LangChain", "React", "FAISS", "Whisper STT"],
      engineeringNotes: [
        "Built a RAG-based AI assistant providing real-time crop advisory via voice and text.",
        "Architected low-latency data retrieval using vector search.",
        "Optimized pipeline for deployment in low-connectivity environments."
      ],
      architectureNodes: ["Voice/Text Input", "Whisper STT & FAISS Retrieval", "LangChain Advisory Output"]
    },
    {
      id: "agri-bot",
      title: "Autonomous Agricultural Robot",
      tagline: "Precision Automation & Vision.",
      techStack: ["C++", "Python", "YOLOv8", "Rock 5 ITX", "Teensy 4.1"],
      engineeringNotes: [
        "Engineered on-device automation system for weed detection and removal using real-time Computer Vision.",
        "Synthesized embedded control logic with deep learning inference.",
        "Managed high-frequency sensor streams from LIDAR and Encoders."
      ],
      architectureNodes: ["LIDAR/Camera Sensors", "YOLOv8 Inference (Rock 5)", "Embedded Control (Teensy)"]
    },
    {
      id: "isl-translator",
      title: "ISL Multilingual Translator",
      tagline: "AI-Powered Accessibility Engine.",
      techStack: ["TensorFlow", "OpenCV", "React", "Flask"],
      engineeringNotes: [
        "Developed real-time Indian Sign Language (ISL) to speech translator.",
        "Designed high-throughput inference layer server-side.",
        "Integrated with a responsive component-based React frontend."
      ],
      architectureNodes: ["Video Stream", "TensorFlow Inference", "Speech/Text Output"]
    },
    {
      id: "tantraz",
      title: "Tantraz 2026 Portal",
      tagline: "Technical Symposium Portal.",
      techStack: ["Next.js", "Tailwind CSS", "GSAP", "Google Sheets API", "PostgreSQL"],
      engineeringNotes: [
        "Designed immersive web portal with GSAP text-reveal and Framer Motion effects.",
        "Built serverless registration endpoint with Zod validation syncing to Google Sheets.",
        "Configured PostgreSQL for logs and NextAuth.js for administrative routes."
      ],
      link: "https://tantraz-2026.vercel.app",
      architectureNodes: ["Next.js Frontend", "Zod Validation & Auth", "PostgreSQL / Sheets Backend"]
    },
    {
      id: "medpal",
      title: "MedPal",
      tagline: "AI Healthcare Symptom Analyzer.",
      techStack: ["Python", "NLP", "LangChain", "Vector Databases"],
      engineeringNotes: [
        "Designed modular symptom-analysis engine offering context-aware medical guidance.",
        "Implemented intelligent knowledge lookup via vector retrieval."
      ],
      architectureNodes: ["Symptom Input", "Vector Retrieval", "Context-Aware Guidance"]
    }
  ],
  experience: [
    {
      role: "Web Development Intern",
      company: "Veltech University",
      period: "Aug 2025 – Present",
      summary: "Architecting centralized portals (C2C, Research Studies) with complex sync and dynamic timeline tracking."
    },
    {
      role: "AI Engineer Intern",
      company: "Siter Academy",
      period: "Aug 2025 – Oct 2025",
      summary: "Developed scalable AI product pipelines and recommendation engines."
    },
    {
      role: "Project Intern",
      company: "Ashok Leyland",
      period: "Mar 2024 – Dec 2024",
      summary: "Owned full lifecycle of an autonomous agricultural robot leading to patent filings."
    }
  ],
  capabilities: [
    {
      category: "Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "SQL", "HTML5/CSS3", "Python", "Java", "C/C++", "PHP"]
    },
    {
      category: "Frontend",
      skills: ["React.js", "React Router", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "RESTful API Design", "Next.js App Router", "Spring Boot"]
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "FAISS"]
    },
    {
      category: "Cloud & DevOps",
      skills: ["Vercel", "Render", "GitHub Actions", "Docker", "Secrets Management"]
    },
    {
      category: "Testing & Tools",
      skills: ["Git", "Postman", "Jest", "VS Code", "Chrome DevTools"]
    }
  ]
};
