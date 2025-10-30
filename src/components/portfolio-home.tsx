"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedTiles } from "@/components/ui/animated-tiles";
import AboutSection from "./portfolio-about";
import { Download } from "lucide-react";
import { MagnetizeButton } from "@/components/ui/magnetize-button";

export default function HomeSection() {
  return (
    <div>
      <section
        id="home"
        className="w-full animate-fade-in pt-32 pb-16 md:py-24 lg:py-32 xl:py-40"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center justify-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div
              className="relative mx-auto flex w-full max-w-sm items-center justify-center animate-slide-in-left order-1 lg:order-1 lg:justify-self-start"
              data-ai-hint="portrait man"
            >
              <div className="h-[360px] w-[240px] md:h-[450px] md:w-[300px] overflow-hidden rounded-lg">
                <AnimatedTiles
                  imageUrl="/me/my_photo.jpeg"
                  fallbackImageUrl="https://picsum.photos/seed/1/300/450"
                  tileSize={40}
                  rows={9}
                  cols={6}
                />
              </div>
            </div>
            <div className="space-y-4 text-center animate-slide-in-right lg:text-left lg:justify-self-start order-2 lg:order-2">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Saurav Kumar
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Front-End Developer | Cybersecurity Enthusiast
                </p>
                <p className="max-w-[600px] text-base text-muted-foreground md:text-lg">
                  I build secure, user-friendly web applications with a passion
                  for clean code and intuitive design. Specializing in
                  JavaScript and React, I bring a security-first mindset to
                  front-end development.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-start justify-center">
                <a href="/documents/resume.pdf" download>
                  <MagnetizeButton>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </MagnetizeButton>
                </a>
                <a href="/documents/cv.docx" download>
                  <MagnetizeButton>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </MagnetizeButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AboutSection />
    </div>
  );
}
