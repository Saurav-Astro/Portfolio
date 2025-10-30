"use client";

import { BrainCircuit, Code, Database, GitMerge, Languages, Component, Zap } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "React",
    date: "Languages & Frameworks",
    content: "Building dynamic and responsive user interfaces.",
    category: "Languages & Frameworks",
    icon: Component,
    relatedIds: [2, 3, 4, 5, 6, 7],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "JavaScript",
    date: "Languages & Frameworks",
    content: "The foundation of modern web development.",
    category: "Languages & Frameworks",
    icon: Code,
    relatedIds: [1, 3, 4, 5, 6, 7],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 3,
    title: "TypeScript",
    date: "Languages & Frameworks",
    content: "Adding static types to JavaScript for robust applications.",
    category: "Languages & Frameworks",
    icon: Code,
    relatedIds: [1, 2, 4, 5, 6, 7],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "HTML5",
    date: "Languages & Frameworks",
    content: "Structuring web content semantically.",
    category: "Languages & Frameworks",
    icon: Code,
    relatedIds: [1, 2, 3, 5, 6, 7],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 5,
    title: "CSS3",
    date: "Languages & Frameworks",
    content: "Styling modern and responsive web pages.",
    category: "Languages & Frameworks",
    icon: Code,
    relatedIds: [1, 2, 3, 4, 6, 7],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 6,
    title: "C++",
    date: "Languages & Frameworks",
    content: "For performance-critical applications and game development.",
    category: "Languages & Frameworks",
    icon: Code,
    relatedIds: [1, 2, 3, 4, 5, 7],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 7,
    title: "Vite",
    date: "Languages & Frameworks",
    content: "Next-generation front-end tooling.",
    category: "Languages & Frameworks",
    icon: Zap,
    relatedIds: [1, 2, 3, 4, 5, 6],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 8,
    title: "MySQL",
    date: "Databases",
    content: "A reliable relational database management system.",
    category: "Databases",
    icon: Database,
    relatedIds: [9, 10, 11],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 9,
    title: "Supabase",
    date: "Databases",
    content: "The open-source Firebase alternative.",
    category: "Databases",
    icon: Database,
    relatedIds: [8, 10, 11],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 10,
    title: "MongoDB",
    date: "Databases",
    content: "A flexible NoSQL database for modern applications.",
    category: "Databases",
    icon: Database,
    relatedIds: [8, 9, 11],
    status: "completed" as const,
    energy: 75,
  },
  {
    id: 11,
    title: "Firebase",
    date: "Databases",
    content: "Google's mobile and web application development platform.",
    category: "Databases",
    icon: Database,
    relatedIds: [8, 9, 10],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 12,
    title: "NumPy",
    date: "Data Science & ML",
    content: "Fundamental package for scientific computing with Python.",
    category: "Data Science & Machine Learning",
    icon: BrainCircuit,
    relatedIds: [13, 14, 15, 16],
    status: "completed" as const,
    energy: 70,
  },
  {
    id: 13,
    title: "Pandas",
    date: "Data Science & ML",
    content: "Powerful data analysis and manipulation library for Python.",
    category: "Data Science & Machine Learning",
    icon: BrainCircuit,
    relatedIds: [12, 14, 15, 16],
    status: "completed" as const,
    energy: 70,
  },
  {
    id: 14,
    title: "PyTorch",
    date: "Data Science & ML",
    content: "An open-source machine learning framework.",
    category: "Data Science & Machine Learning",
    icon: BrainCircuit,
    relatedIds: [12, 13, 15, 16],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 15,
    title: "Scikit-learn",
    date: "Data Science & ML",
    content: "Simple and efficient tools for predictive data analysis.",
    category: "Data Science & Machine Learning",
    icon: BrainCircuit,
    relatedIds: [12, 13, 14, 16],
    status: "completed" as const,
    energy: 65,
  },
  {
    id: 16,
    title: "TensorFlow",
    date: "Data Science & ML",
    content: "An end-to-end open-source platform for machine learning.",
    category: "Data Science & Machine Learning",
    icon: BrainCircuit,
    relatedIds: [12, 13, 14, 15],
    status: "in-progress" as const,
    energy: 55,
  },
  {
    id: 17,
    title: "Git",
    date: "Developer Tools & Platforms",
    content: "A distributed version control system for tracking changes.",
    category: "Developer Tools & Platforms",
    icon: GitMerge,
    relatedIds: [18, 19, 20],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 18,
    title: "GitHub",
    date: "Developer Tools & Platforms",
    content: "A provider of Internet hosting for software development.",
    category: "Developer Tools & Platforms",
    icon: GitMerge,
    relatedIds: [17, 19, 20],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 19,
    title: "Anaconda",
    date: "Developer Tools & Platforms",
    content: "A distribution of Python and R for scientific computing.",
    category: "Developer Tools & Platforms",
    icon: Component,
    relatedIds: [17, 18, 20],
    status: "completed" as const,
    energy: 70,
  },
  {
    id: 20,
    title: "Arduino",
    date: "Developer Tools & Platforms",
    content: "An open-source electronics platform based on easy-to-use hardware and software.",
    category: "Developer Tools & Platforms",
    icon: Component,
    relatedIds: [17, 18, 19],
    status: "completed" as const,
    energy: 60,
  },
];


export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full animate-fade-in py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-24 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <div className="space-y-6 text-muted-foreground text-base md:text-lg lg:text-base xl:text-lg">
              <p>
                Hello! I&apos;m Saurav, a Front-End Developer with a deep-seated
                passion for both creating beautiful, intuitive user interfaces
                and ensuring their digital security. My journey into technology
                began with a curiosity for how things work, which quickly
                evolved into a career focused on building high-quality web
                applications using modern technologies like React and
                JavaScript. I thrive on the challenge of turning a great idea
                into a tangible, responsive, and visually appealing product that
                users love.
              </p>
              <p>
                Beyond my core development skills, I have a strong foundation
                in cybersecurity. As an IoT Security Head and Subject Matter
                Expert, I&apos;ve had the privilege of leading security
                initiatives, mentoring enthusiasts, and conducting workshops
                for hundreds of students. This dual expertise allows me to
                approach development with a unique, security-first perspective,
                ensuring that the applications I build are not only functional
                and user-friendly but also robust and secure from the ground up.
              </p>
              <p>
                I am passionate about collaborating with cross-functional teams
                to solve complex problems and am always eager to learn and adapt
                to new technologies. I&apos;m currently seeking opportunities where
                I can leverage my skills in front-end development and
                cybersecurity to contribute to innovative and impactful
                projects. Feel free to explore my projects or get in touch —
                I&apos;d love to connect!
              </p>
            </div>
          </div>

          <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-full">
            <h3 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">
              My Skillset
            </h3>
            <RadialOrbitalTimeline timelineData={timelineData} />
          </div>
        </div>
      </div>
    </section>
  );
}
