"use client";

import Image from "next/image";
import { Github, ExternalLink, ShieldCheck, ShieldAlert, Cpu, X, Expand, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "defendrix",
    title: "Defendrix",
    subtitle: "Advanced Web Application Vulnerability Scanner",
    isCaseStudy: true,
    caseStudy: {
      problem: "Manual security testing is time-consuming and often misses early-stage vulnerabilities.",
      approach: "Engineered an automated OWASP Top 10 vulnerability scanner in Python, Flask, and Selenium.",
      securityChallenges: "Automating endpoint discovery and mapping attack surfaces accurately without causing denial-of-service on target applications.",
      result: "Accelerated early-stage security assessments and reduced manual testing effort via structured, actionable reporting.",
    },
    securityHighlights: {
      threats: ["OWASP Top 10 Vulnerabilities", "Endpoint Misconfigurations"],
      controls: ["Automated Attack Surface Mapping", "Reusable Scanning Modules", "Structured Reporting"],
      architecture: "Python Engine ↓ Flask Backend ↓ Selenium Driver ↓ Target Application",
      lessons: "Gained deep insights into building resilient scanning architectures that can handle diverse web environments safely.",
    },
    tags: ["Python", "Flask", "Selenium", "MySQL", "REST APIs"],
    codeLink: "",
    liveLink: "",
    image: "/projects/Defendrix.jpeg",
  },
  {
    id: "smeh-news",
    title: "SMEH News Platform",
    subtitle: "Secure Full-Stack News CMS",
    isCaseStudy: true,
    caseStudy: {
      problem: "Institutional news distribution lacked a centralized, secure, and easily maintainable content management system.",
      approach: "Built a full-stack Next.js 15 and Express.js platform with automated deployment and server recovery.",
      securityChallenges: "Hardening the platform against unauthorized access, securing file uploads, and ensuring zero-downtime database migrations.",
      result: "A reliable news publishing platform with JWT auth, RBAC, and streamlined content management.",
    },
    securityHighlights: {
      threats: ["Unauthorized Content Modification", "Malicious File Uploads", "Privilege Escalation"],
      controls: ["JWT Authentication", "Role-Based Access Control (RBAC)", "Secure File Validation", "HTTP Security Headers"],
      architecture: "Next.js Frontend ↓ Express.js API ↓ Prisma ORM ↓ PostgreSQL/SQLite ↓ Docker/PM2",
      lessons: "Mastered deployment automation on Linux VPS and secure database migration strategies with Prisma.",
    },
    tags: ["Next.js 15", "React 19", "Express.js", "Prisma", "PostgreSQL", "Docker"],
    codeLink: "",
    liveLink: "",
    image: "/projects/SMEH.png",
  },
  {
    id: "assist-ai",
    title: "AssistAI",
    subtitle: "AI Accessibility Companion",
    isCaseStudy: true,
    caseStudy: {
      problem: "Digital inclusion tools often lack intelligent, context-aware assistance for varied accessibility needs.",
      approach: "Built a platform integrating Google Gemini and Firebase Genkit for real-time vision assistance and multimodal understanding.",
      securityChallenges: "Handling real-time multimodal data securely while ensuring scalable server-side inference.",
      result: "An accessible, keyboard-navigable interface providing sign language recognition and conversational AI support.",
    },
    securityHighlights: {
      threats: ["Data Privacy Leakage", "Insecure AI Inference"],
      controls: ["Scalable Server-Side Inference", "Accessible UI Design", "Secure API Integration"],
      architecture: "Next.js Frontend ↓ Firebase Genkit ↓ Google Gemini API",
      lessons: "Learned to balance real-time AI capabilities with strict accessibility standards and secure data handling.",
    },
    tags: ["Next.js", "TypeScript", "Firebase Genkit", "Google Gemini"],
    codeLink: "",
    liveLink: "",
    image: "/projects/Assist.png",
  },
  {
    id: "knoxguard",
    title: "KnoxGuard",
    subtitle: "URL Threat Detection System",
    isCaseStudy: true,
    caseStudy: {
      problem: "Users frequently fall victim to phishing and malicious websites disguised via short links or deceptive URLs.",
      approach: "Built a desktop-based threat detection system in Python and Flask that flags malicious sites via rule-based validation.",
      securityChallenges: "Delivering real-time alerts through a lightweight detection engine without degrading system performance.",
      result: "A modular desktop client that preemptively blocks malicious URLs and alerts users in real-time.",
    },
    securityHighlights: {
      threats: ["Phishing Links", "Malicious Domains", "API Key Exposure"],
      controls: ["Rule-Based Validation", "Real-Time Alerts", "Lightweight Detection Engine"],
      architecture: "Python Desktop Client ↓ Flask API ↓ Validation Engine ↓ MySQL",
      lessons: "Refined skills in building low-latency, modular desktop security applications.",
    },
    tags: ["Python", "Flask", "Selenium", "MySQL"],
    codeLink: "https://github.com/Astro-Saurav/Knoxguard",
    liveLink: "",
    image: "/projects/knoxguard.jpeg",
  },
  {
    id: "ghost-in-the-pic",
    title: "Ghost in the Pic",
    subtitle: "ML-Powered Deepfake Tool with Safety Rails",
    isCaseStudy: true,
    caseStudy: {
      problem: "Deepfake technology is highly accessible but often lacks built-in ethical constraints and watermarking.",
      approach: "Developed an ML application leveraging PyTorch for face swapping, explicitly integrating responsible AI guardrails.",
      securityChallenges: "Preventing misuse by integrating visible/invisible watermarking and restricting generation on known restricted datasets.",
      result: "A functional creative tool that prioritizes responsible AI use and demonstrates applied ML engineering.",
    },
    securityHighlights: {
      threats: ["Misinformation Generation", "Identity Spoofing", "Model Inversion"],
      controls: ["Invisible Watermarking", "Dataset Restrictions", "Rate Limiting on Inference", "Local-Only Processing"],
      architecture: "UI Frontend ↓ PyTorch Inference Engine ↓ Watermarking Module ↓ Output Generator",
      lessons: "Learned the complexities of deploying ML models securely and the importance of ethical AI guardrails.",
    },
    tags: ["Python", "PyTorch", "AI/ML", "Computer Vision"],
    codeLink: "https://github.com/Astro-Saurav/Ghost_in_the_pic",
    liveLink: "",
    image: "/projects/ghost-in-the-pic.png",
  },
  {
    id: "medibot",
    title: "Medibot",
    subtitle: "Your Friendly AI Health Assistant",
    isCaseStudy: true,
    caseStudy: {
      problem: "Complex medical jargon creates a barrier between patients and understanding their own health information.",
      approach: "Built a full-stack React and Express web platform with an AI chat assistant for clear, accessible answers and a comprehensive medicine search.",
      securityChallenges: "Ensuring user queries (potentially containing PHI) are handled securely and not persistently logged without consent.",
      result: "A scalable web platform bridging the gap between complex medical jargon and everyday understanding, empowering users with clear health information.",
    },
    securityHighlights: {
      threats: ["XSS", "Data Leakage (PHI)", "Prompt Injection"],
      controls: ["Strict Input Sanitization", "No-Log Policy for Chats", "CSP Headers", "Rate Limiting", "CORS Restrictions"],
      architecture: "React Frontend ↓ Express API Gateway ↓ AI Inference API ↓ Transient In-Memory State",
      lessons: "Reinforced the critical need for strict data minimization and prompt hardening when building LLM wrappers.",
    },
    tags: ["React", "TypeScript", "Express.js", "AI"],
    codeLink: "https://github.com/Astro-Saurav/Medibot",
    liveLink: "https://medibot-blond.vercel.app/",
    image: "/projects/medibot.png",
  },
  {
    id: "valorant-showcase",
    title: "Valorant Agent Showcase",
    subtitle: "Interactive 3D Web Experience",
    isCaseStudy: false,
    description: "An interactive web experience built with React and Framer Motion, showcasing Valorant agents with smooth animations and dynamic transitions.",
    securityHighlights: {
      threats: ["XSS", "Clickjacking", "DDoS on Assets"],
      controls: ["Strict CSP", "X-Frame-Options", "Asset CDN Caching"],
      architecture: "Next.js Frontend ↓ Vercel Edge Network",
      lessons: "Mastered Framer Motion for performant GPU-accelerated animations while maintaining secure headers.",
    },
    tags: ["React", "Framer Motion", "TypeScript", "UI/UX"],
    codeLink: "https://github.com/Astro-Saurav/Valorant",
    liveLink: "https://valorant-gamma-drab.vercel.app",
    image: "/projects/valotant.png",
  },
  {
    id: "chrome-new-tab",
    title: "Chrome New Tab",
    subtitle: "Reimagine Your Browser's New Tab Page",
    isCaseStudy: false,
    description: "A sleek and customizable extension inspired by Google's 'Material You' design. Features unified search, quick shortcuts, and themes—all while requiring zero permissions for your privacy.",
    securityHighlights: {
      threats: ["Data Exfiltration", "Malicious Manifest Updates"],
      controls: ["Zero External Permissions requested", "Local Storage Only", "No Tracking Scripts"],
      architecture: "Chrome Manifest V3 ↓ Local Storage ↓ DOM",
      lessons: "Learned how to build highly functional browser extensions without violating the principle of least privilege.",
    },
    tags: ["Chrome Extension", "JavaScript", "HTML5", "Privacy"],
    codeLink: "https://github.com/Astro-Saurav/Chrome_NewTab",
    liveLink: "",
    image: "/projects/chrome-new-tab.png",
  }
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getLiveButtonText = (id: string) => {
    if (id === 'the-librarian-game') return 'Play Game';
    return 'Live Demo';
  }

  return (
    <>
    <section id="projects" className="w-full py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Engineering <span className="text-[#00D9FF]">Showcase</span>
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              A selection of projects demonstrating full-stack engineering and security-first design principles.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 w-full">
            
            {/* Project List */}
            <div className="lg:order-1 lg:sticky lg:top-32 h-fit">
              <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[calc(100vh-12rem)] pb-4 lg:pb-0 custom-scrollbar snap-x lg:pr-2">
                {projects.map((project) => (
                <div
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className={cn(
                        "p-5 rounded-xl cursor-pointer transition-all duration-300 border flex-shrink-0 w-72 lg:w-full snap-start",
                        activeProject.id === project.id 
                            ? "bg-accent/40 border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.1)]" 
                            : "bg-card/30 border-white/5 hover:bg-accent/20 hover:border-white/20 glass-morphism"
                    )}
                >
                    <h4 className="font-bold text-lg text-foreground">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-code px-2 py-1 bg-white/5 rounded-md text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                </div>
                ))}
              </div>
            </div>

            {/* Active Project Details */}
            <div className="lg:order-2 space-y-6">
              <AnimatePresence mode="wait">
              <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full space-y-8"
              >
                  {/* Image & Header */}
                  <div className="space-y-6">
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/10 shadow-lg group">
                      {activeProject.image && (
                          <button
                            onClick={() => setLightboxImage(activeProject.image)}
                            className="absolute inset-0 w-full h-full group cursor-zoom-in"
                            aria-label={`View ${activeProject.title} screenshot fullscreen`}
                          >
                            <Image
                              src={activeProject.image}
                              alt={activeProject.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              priority
                            />
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-1.5 rounded-md">
                              <Expand className="h-4 w-4 text-white" />
                            </div>
                          </button>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6 pointer-events-none">
                        <div className="flex gap-3 w-full pointer-events-auto">
                          {activeProject.liveLink && (
                            <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button className="w-full bg-[#00D9FF] text-black hover:bg-[#00D9FF]/80">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  {getLiveButtonText(activeProject.id)}
                              </Button>
                            </a>
                          )}
                          {activeProject.codeLink && (
                            <a href={activeProject.codeLink} target="_blank" rel="noopener noreferrer" className={activeProject.liveLink ? "flex-1" : "w-auto"}>
                              <Button variant="secondary" className="w-full border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10">
                                  <Github className="mr-2 h-4 w-4" />
                                  View Source
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                        <h3 className="text-3xl font-bold font-headline mb-2">{activeProject.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {activeProject.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="font-code text-xs border-[#00D9FF]/30 text-[#00D9FF]">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                  </div>

                  {/* Case Study Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column: Case Study or general description */}
                    <div className="space-y-6">
                      {activeProject.isCaseStudy && activeProject.caseStudy ? (
                        <>
                          <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2 text-foreground">
                              <ShieldAlert className="h-4 w-4 text-[#00FF9C]" />
                              Problem
                            </h4>
                            <p className="text-sm text-muted-foreground">{activeProject.caseStudy.problem}</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2 text-foreground">
                              <Cpu className="h-4 w-4 text-[#00FF9C]" />
                              Approach
                            </h4>
                            <p className="text-sm text-muted-foreground">{activeProject.caseStudy.approach}</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold flex items-center gap-2 text-foreground">
                              <ShieldCheck className="h-4 w-4 text-[#00FF9C]" />
                              Result
                            </h4>
                            <p className="text-sm text-muted-foreground">{activeProject.caseStudy.result}</p>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4 h-full flex flex-col justify-center">
                           <div className="space-y-2">
                             <h4 className="font-bold flex items-center gap-2 text-foreground">
                               <FileText className="h-4 w-4 text-[#00FF9C]" />
                               Overview
                             </h4>
                             {activeProject.description ? (
                               <p className="text-sm text-muted-foreground leading-relaxed">
                                 {activeProject.description}
                               </p>
                             ) : (
                               <p className="text-sm text-muted-foreground italic">
                                 Standard project implementation showcasing modern frontend practices. See Security Highlights for architecture details.
                               </p>
                             )}
                           </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Security Highlights */}
                    <div className="bg-[#0F172A]/50 p-6 rounded-xl border border-[#00D9FF]/20 space-y-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                        <ShieldAlert className="h-24 w-24" />
                      </div>
                      
                      <h4 className="font-headline font-bold text-[#00D9FF] text-lg border-b border-[#00D9FF]/20 pb-2">
                        Security Highlights
                      </h4>
                      
                      <div className="space-y-4 relative z-10">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Threats Considered</span>
                          <div className="flex flex-wrap gap-1">
                            {activeProject.securityHighlights.threats.map(t => (
                              <span key={t} className="text-xs px-2 py-0.5 bg-red-500/10 text-red-400 rounded">{t}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Security Controls</span>
                          <ul className="text-sm text-foreground space-y-1">
                            {activeProject.securityHighlights.controls.map(c => (
                              <li key={c} className="flex items-start gap-2">
                                <span className="text-[#00FF9C] mt-0.5">✓</span> {c}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Architecture</span>
                          <p className="text-xs font-code text-[#7CFFCB] bg-black/30 p-2 rounded">{activeProject.securityHighlights.architecture}</p>
                        </div>

                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Lessons Learned</span>
                          <p className="text-sm text-muted-foreground italic">"{activeProject.securityHighlights.lessons}"</p>
                        </div>
                      </div>
                    </div>
                  </div>

              </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </section>

    { /* Lightbox Overlay */ }
    <AnimatePresence>
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl max-h-[90vh] aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage as string}
              alt="Project screenshot fullscreen"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white rounded-full p-2 transition-colors"
              aria-label="Close fullscreen image"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
    );
  }
