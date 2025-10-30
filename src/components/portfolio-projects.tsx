"use client";

import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "ghost-in-the-pic",
    title: "Ghost in the Pic",
    subtitle: "MI-Powered Deepfake Tool",
    description: "An ML-powered application for real-time face swapping and video deepfakes, designed for creative professionals. Built with a strong emphasis on responsible AI, it includes built-in safety features to ensure ethical use.",
    tags: ["Python", "AI/ML", "PyTorch", "Computer Vision"],
    codeLink: "https://github.com/Saurav-Astro/Ghost_in_the_pic",
    liveLink: "",
    image: "/projects/ghost-in-the-pic.png",
  },
  {
    id: "knoxguard",
    title: "KnoxGuard",
    subtitle: "Cybersecurity Desktop App",
    description: "A desktop security application that proactively protects you from malicious links. It monitors your clipboard in real-time, scans URLs using the VirusTotal API, and blocks dangerous sites at the firewall level before they can do harm.",
    tags: ["Python", "PySide6", "Cybersecurity", "Desktop App"],
    codeLink: "https://github.com/Saurav-Astro/Knoxguard",
    liveLink: "",
    image: "/projects/knoxguard.jpeg",
  },
  {
    id: "valorant-showcase",
    title: "Valorant Agent Showcase",
    subtitle: "Interactive 3D Web Experience",
    description: "An immersive web experience that brings the agents of Valorant to life. Built with Framer Motion, this showcase features a stunning neon glass UI, dynamic animations, and interactive 3D effects that respond to your cursor.",
    tags: ["React", "Framer Motion", "TypeScript", "UI/UX"],
    codeLink: "https://github.com/Saurav-Astro/Valorant",
    liveLink: "https://valorant-gamma-drab.vercel.app",
    image: "/projects/valotant.png",
  },
  {
    id: "the-librarian-game",
    title: "The Librarian Game",
    subtitle: "Text-Based Adventure",
    description: "A cozy, text-based adventure game built with vanilla JavaScript where your choices shape the story. Navigate the library, solve puzzles, and try to find the specific book to win. Features branching paths for high replay value.",
    tags: ["JavaScript", "HTML5", "CSS3", "Game Dev"],
    codeLink: "https://github.com/Saurav-Astro/The-Librarian-Game",
    liveLink: "https://the-librarian-game-rho.vercel.app",
    image: "/projects/the-librarian-game.png",
  },
  {
    id: "chrome-new-tab",
    title: "Chrome New Tab",
    subtitle: "Productivity Extension",
    description: "Reimagine your browser's new tab page. A sleek and customizable extension inspired by Google's 'Material You' design. Features unified search, quick shortcuts, and themes—all while requiring zero permissions for your privacy.",
    tags: ["Chrome Extension", "JavaScript", "HTML5", "Privacy"],
    codeLink: "https://github.com/Saurav-Astro/Chrome_NewTab",
    liveLink: "",
    image: "/projects/chrome-new-tab.png",
  },
  {
    id: "medibot",
    title: "Medibot",
    subtitle: "AI Health Assistant",
    description: "Your friendly AI health assistant. This web platform bridges the gap between complex medical jargon and everyday understanding, featuring an AI chat assistant for clear answers and a comprehensive medicine search to empower users.",
    tags: ["React", "TypeScript", "Express.js", "AI"],
    codeLink: "https://github.com/Saurav-Astro/Medibot",
    liveLink: "https://medibot-blond.vercel.app/",
    image: "/projects/medibot.png",
  },
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  const getLiveButtonText = (id: string) => {
    if (id === 'the-librarian-game') return 'Play Game';
    if (id === 'valorant-showcase') return 'View Live';
    return 'Live Demo';
  }

  return (
    <section id="projects" className="w-full py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              My Projects
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my work, from secure desktop applications to immersive web experiences. Each project was a unique challenge that I'm proud to have built.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            
            <div className="lg:col-span-1 lg:order-2">
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 lg:flex-col lg:overflow-x-visible lg:pb-0 lg:gap-4 custom-scrollbar">
                  {projects.map((project) => (
                  <div
                      key={project.id}
                      onClick={() => setActiveProject(project)}
                      className={cn(
                          "p-4 rounded-lg cursor-pointer transition-all duration-300 border flex-shrink-0 w-64 lg:w-auto",
                          activeProject.id === project.id 
                              ? "bg-accent/50 border-accent shadow-md" 
                              : "bg-card/50 border-white/10 hover:bg-accent/20 hover:border-accent/50 glass-morphism"
                      )}
                  >
                      <h4 className="font-bold text-lg text-foreground">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Column: Featured Project */}
            <div className="lg:col-span-2 space-y-6 lg:order-1">
                <AnimatePresence mode="wait">
                <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg border border-white/10 shadow-lg">
                    {activeProject.image && (
                        <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority
                        />
                    )}
                    </div>
                    <div className="space-y-4">
                    <div>
                        <h3 className="text-3xl font-bold font-headline">{activeProject.title}</h3>
                        <p className="text-lg text-muted-foreground">{activeProject.subtitle}</p>
                    </div>
                    <p className="text-base text-muted-foreground">{activeProject.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                        {activeProject.liveLink && (
                          <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer">
                            <Button>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                {getLiveButtonText(activeProject.id)}
                            </Button>
                          </a>
                        )}
                        {activeProject.codeLink && (
                          <a href={activeProject.codeLink} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline">
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                            </Button>
                          </a>
                        )}
                    </div>
                    </div>
                </motion.div>
                </AnimatePresence>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}
