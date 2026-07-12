"use client";

import { Shield, Server, Code, Zap, Database, Globe, BrainCircuit, Activity, Lock, Terminal, Box, GraduationCap, Trophy, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "700+", label: "CTF Participants", icon: BrainCircuit },
  { value: "100%", label: "OWASP Principles Applied", icon: Shield },
  { value: "2+", label: "Years Experience", icon: Activity },
  { value: "Multiple", label: "Security Research Projects", icon: Lock },
];

const engineeringPrinciples = [
  { title: "Security by Design", description: "Security is a product feature, not an afterthought or checklist." },
  { title: "Least Privilege", description: "Minimal access rights for users, containers, and services." },
  { title: "Defense in Depth", description: "Multiple layers of security controls (Auth, CSP, WAF, Validation)." },
  { title: "Fail Secure", description: "Systems should fail into a secure state, rejecting unauthorized access." },
  { title: "Privacy by Default", description: "Strict data minimization and zero-trust data sharing." },
  { title: "Automation First", description: "Automated linting, testing, and security scanning in CI/CD." },
];

const coreSkills = [
  {
    category: "Programming Languages",
    icon: Code,
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Bash"],
  },
  {
    category: "Cybersecurity",
    icon: Shield,
    skills: ["Application Security", "Web Security", "VAPT", "Threat Modeling", "OWASP Top 10", "CTF", "IoT Security"],
  },
  {
    category: "Development",
    icon: Globe,
    skills: ["Full-Stack Development", "REST APIs", "Next.js", "React", "Express.js"],
  },
  {
    category: "Cloud & DevOps",
    icon: Server,
    skills: ["Microsoft Azure", "Docker", "Git", "GitHub", "Linux", "VPS Management", "CI/CD"],
  },
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: ["Large Language Models (LLMs)", "Computer Vision", "Prompt Engineering"],
  },
  {
    category: "Databases",
    icon: Database,
    skills: ["MySQL", "MongoDB", "PostgreSQL", "SQLite"],
  },
  {
    category: "Platforms",
    icon: Terminal,
    skills: ["Linux", "Windows"],
  },
];

const timeline = [
  {
    role: "Partner, Cybersecurity Community Operations",
    company: "DCG Gurugram",
    period: "Aug 2025 - Present",
    description: "Lead planning and execution of cybersecurity events, workshops, and technical meetups, expanding community engagement.",
  },
  {
    role: "IoT Security Head",
    company: "MRISA (Manav Rachna InfoSec Army)",
    period: "Aug 2024 - Present",
    description: "Lead IoT security initiatives. Organized CTF competitions for 700+ participants. Authored web exploitation challenges.",
  },
  {
    role: "Core Team Member (ML & Web)",
    company: "Spillmate",
    period: "2024",
    description: "Architected AI-powered platforms and integrated modern web technologies.",
  },
  {
    role: "Subject Matter Expert",
    company: "DG Sentinels",
    period: "2023 - 2024",
    description: "Led security initiatives, vulnerability assessments, and delivered seminars.",
  }
];

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Manav Rachna International Institute of Research and Studies (MRIIRS)",
    location: "Faridabad, Haryana, India",
    period: "2023 - Present",
  }
];

const awards = [
  "Winner — INTRUSIONX, GLA University (2025)",
  "8th Place — CyCog CTF, IEEE MRU & MRU (2024)",
  "Finalist — Avinya Tech Fest, IIT Guwahati (2024)",
  "Winner — Hacksplash 1.0, Echelon Institute (2023)",
  "Ranked 170/1500+ — CyberHavoc CTF (2023)",
  "3rd Place — Tech Trover, Debugging Competition (2023)",
];

const publications = [
  {
    title: "AI-Driven Techniques for Web Search Vulnerability Identification",
    authors: "Saurav Kumar, Alan Jolly John, Sarthak Dubey",
    publisher: "IEEE Xplore, 2026",
    link: "https://ieeexplore.ieee.org/document/11386307",
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full animate-fade-in py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 space-y-16">
        
        {/* Header & Stats */}
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Engineering <span className="text-[#00FF9C]">Philosophy</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              "I believe security is a product feature, not a checklist."
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-card/50 glass-morphism rounded-xl border border-white/5 hover:border-[#00FF9C]/30 transition-colors text-center">
                <stat.icon className="h-6 w-6 text-[#00FF9C] mb-3" />
                <span className="font-code text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Principles & Timeline */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#00D9FF]" />
              Engineering Principles
            </h3>
            <div className="space-y-4">
              {engineeringPrinciples.map((principle, i) => (
                <div key={i} className="pl-4 border-l-2 border-white/10 hover:border-[#00D9FF] transition-colors">
                  <h4 className="font-bold text-foreground">{principle.title}</h4>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
              <Terminal className="h-5 w-5 text-[#00D9FF]" />
              Experience
            </h3>
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[#00D9FF]">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-foreground">{item.role}</h4>
                    <span className="text-xs font-code text-muted-foreground">{item.period}</span>
                  </div>
                  <p className="text-sm font-medium text-[#00D9FF]/80 mb-1">{item.company}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education, Publications & Awards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#00D9FF]" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((item, i) => (
                <div key={i} className="pl-4 border-l-2 border-white/10 hover:border-[#00D9FF] transition-colors">
                  <h4 className="font-bold text-foreground">{item.degree}</h4>
                  <p className="text-sm font-medium text-[#00D9FF]/80">{item.institution}</p>
                  <p className="text-xs text-muted-foreground">{item.location} • {item.period}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#00D9FF]" />
              Publications
            </h3>
            <div className="space-y-4">
              {publications.map((pub, i) => (
                <div key={i} className="pl-4 border-l-2 border-white/10 hover:border-[#00D9FF] transition-colors">
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    <h4 className="font-bold text-foreground text-sm">{pub.title}</h4>
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">{pub.authors}</p>
                  <p className="text-xs font-medium text-[#00D9FF]/80">{pub.publisher}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#00D9FF]" />
              Awards
            </h3>
            <div className="space-y-2">
              {awards.map((award, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#00D9FF] mt-1">✓</span>
                  <p className="text-sm text-foreground">{award}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Skills */}
        <div className="space-y-8">
          <h3 className="font-headline text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Box className="h-5 w-5 text-[#7CFFCB]" />
            Core Skills
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreSkills.map((box, i) => (
              <div key={i} className="p-6 bg-card/30 rounded-xl border border-white/5 space-y-4 hover:bg-card/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <box.icon className="h-5 w-5 text-[#7CFFCB]" />
                  <h4 className="font-bold">{box.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {box.skills.map((skill, j) => (
                    <Badge key={j} variant="secondary" className="font-code text-xs bg-white/5 hover:bg-white/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
