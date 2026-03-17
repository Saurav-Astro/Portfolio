"use client";

import { BrainCircuit, Code, Database, GitMerge, Component, Zap, Shield } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Python",
    date: "Programming",
    content: "Versatile programming for AI, scripting, security tools, and backend automation.",
    category: "Programming & Querying",
    icon: Code,
    relatedIds: [2, 3, 4, 6, 7, 13, 14],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "TypeScript",
    date: "Programming",
    content: "Strongly typed JavaScript for scalable and maintainable web applications.",
    category: "Programming & Querying",
    icon: Code,
    relatedIds: [1, 3, 5, 6],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "C & Bash",
    date: "Programming",
    content: "Systems programming and automation scripting in Linux environments.",
    category: "Programming & Querying",
    icon: Code,
    relatedIds: [1, 2, 14, 15],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 4,
    title: "SQL (MySQL)",
    date: "Databases",
    content: "Structured data querying and relational database management.",
    category: "Programming & Querying",
    icon: Database,
    relatedIds: [1, 12, 13],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 5,
    title: "Next.js & React",
    date: "Frameworks",
    content: "Building modern, server-side and client-side web applications.",
    category: "Frameworks & Development",
    icon: Component,
    relatedIds: [2, 6, 7],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 6,
    title: "Flask",
    date: "Frameworks",
    content: "Lightweight Python web framework for REST APIs and backend services.",
    category: "Frameworks & Development",
    icon: Zap,
    relatedIds: [1, 5, 7],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 7,
    title: "Firebase & Genkit",
    date: "Frameworks",
    content: "Serverless AI-integrated app hosting with GenAI workflow orchestration.",
    category: "Frameworks & Development",
    icon: Database,
    relatedIds: [5, 6, 2],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 8,
    title: "PySide6 & BS4",
    date: "Frameworks",
    content: "Desktop GUI development and automated web scraping with Python.",
    category: "Frameworks & Development",
    icon: Component,
    relatedIds: [1, 3, 14],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 9,
    title: "OWASP Top 10",
    date: "Cybersecurity",
    content: "Deep knowledge of the most critical web application security risks.",
    category: "Cybersecurity & Systems",
    icon: Shield,
    relatedIds: [10, 11, 16],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 10,
    title: "IoT Security",
    date: "Cybersecurity",
    content: "Securing interconnected embedded devices and IoT networks.",
    category: "Cybersecurity & Systems",
    icon: Shield,
    relatedIds: [9, 11, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 11,
    title: "Threat Modeling",
    date: "Cybersecurity",
    content: "Proactive attack surface mapping and vulnerability assessment.",
    category: "Cybersecurity & Systems",
    icon: Shield,
    relatedIds: [9, 10, 16],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 12,
    title: "MySQL",
    date: "Databases",
    content: "A robust relational database used for secure, structured data management.",
    category: "Databases",
    icon: Database,
    relatedIds: [4, 13],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 13,
    title: "MongoDB Atlas",
    date: "Databases",
    content: "Cloud-based NoSQL database for flexible, scalable document storage.",
    category: "Databases",
    icon: Database,
    relatedIds: [4, 12],
    status: "completed" as const,
    energy: 82,
  },
  {
    id: 14,
    title: "Linux & CLI",
    date: "Systems",
    content: "Daily operations, environment configuration, and scripting on Linux systems.",
    category: "Systems & Environments",
    icon: Zap,
    relatedIds: [1, 3, 15],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 15,
    title: "Git & GitHub",
    date: "Version Control",
    content: "Source code management, collaboration, and versioning workflows.",
    category: "Systems & Environments",
    icon: GitMerge,
    relatedIds: [1, 14, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 16,
    title: "CTF Design",
    date: "Cybersecurity",
    content: "Architecting web exploitation and cryptography CTF challenges for 300+ participants.",
    category: "Cybersecurity & Systems",
    icon: BrainCircuit,
    relatedIds: [9, 10, 11],
    status: "completed" as const,
    energy: 98,
  },
];


export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full animate-fade-in py-12 md:py-16 lg:py-20"
    >
      <div className="container mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr,0.95fr] lg:gap-16 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-[2.8rem]">
              About Me
            </h2>
            <div className="space-y-6 text-muted-foreground text-base md:text-lg lg:text-[1.1rem] xl:text-[1.1rem]">
              <p>
                Hello! I&apos;m Saurav, a developer and cybersecurity practitioner with a BCA from Manav Rachna International Institute of Research and Studies. My work spans full-stack web development, AI integration, and applied offensive security — a combination I actively apply across startup environments, research, and community-driven security competitions.
              </p>
              <p>
                As <strong className="text-foreground">IoT Security Head</strong> at Manav Rachna InfoSec Army and <strong className="text-foreground">Subject Matter Expert</strong> at DG Sentinels, I&apos;ve led CTF competitions for 700+ participants, delivered seminars at institutions including Delhi Technological University, and co-authored a research publication on AI-driven vulnerability identification in IEEE Xplore. I also contribute to the Unreal Engine source-level community at Epic Games as a remote contributor.
              </p>
              <p>
                On the development side, I&apos;ve worked as a Core Team Member (ML &amp; Web) at <strong className="text-foreground">Spillmate</strong> startup, architected AI-powered accessibility platforms using Next.js 15 and Google Gemini, and built security tooling like Defendrix — an OWASP-aligned vulnerability scanner. I thrive at the intersection of security and modern software engineering. Feel free to explore my projects or get in touch — I&apos;d love to connect!
              </p>
            </div>
          </div>

          <div className="relative min-h-[360px] md:min-h-[460px] lg:min-h-[500px]">
            <h3 className="font-headline text-2xl font-bold tracking-tighter sm:text-[2rem] text-center mb-6">
              My Skillset
            </h3>
            <RadialOrbitalTimeline timelineData={timelineData} />
          </div>
        </div>
      </div>
    </section>
  );
}
