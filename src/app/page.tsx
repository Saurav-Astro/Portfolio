"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import { AnimatedHeroSection } from "@/components/ui/animated-hero-section";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <>
      <AnimatedHeroSection />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-end bg-transparent p-8 pb-16 text-center font-sans">
        <Link href="/home">
           <Button>
              Continue
              <MoveRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
           </Button>
        </Link>
      </main>
    </>
  );
}
