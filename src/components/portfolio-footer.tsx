import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { GooeyText } from '@/components/ui/gooey-text-morphing';

const socialLinks = [
  {
    href: 'https://github.com/Saurav-Astro',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/saurav-kumar-astro/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:0501saurav@gmail.com',
    icon: Mail,
    label: 'Email',
  },
];

export default function PortfolioFooter() {
  return (
    <footer className="w-full border-t border-white/10 py-4 px-4 md:px-6">
      <div className="container mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 md:flex-row">
        <div className="h-12 w-full overflow-hidden md:h-14 md:w-[340px] md:flex-none">
            <GooeyText
                texts={["Saurav Kumar", "Full Stack Developer", "Creator", "Innovator"]}
                className="font-bold"
                textClassName="text-lg md:text-xl"
            />
        </div>
        <div className="flex items-center gap-4 md:justify-end">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
