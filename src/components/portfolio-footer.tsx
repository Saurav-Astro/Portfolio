import { Github, Linkedin, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { GooeyText } from '@/components/ui/gooey-text-morphing';

const socialLinks = [
  {
    href: 'https://github.com/Astro-Saurav',
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

const securityBadges = [
  "HTTPS", "CSP", "HSTS", "security.txt", "Accessible", "Responsive"
];

const techStack = [
  "Next.js 15", "TypeScript", "TailwindCSS", "Framer Motion"
];

export default function PortfolioFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-background pt-12 pb-8 px-4 md:px-6 mt-20">
      <div className="container mx-auto flex flex-col gap-12 max-w-6xl">
        
        {/* Top section: Brand and Badges */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="h-12 w-full overflow-hidden md:h-14 md:w-[340px]">
                <GooeyText
                    texts={["Saurav Kumar", "Cybersecurity Analyst", "Full-Stack Developer", "CTF Architect"]}
                    className="font-bold"
                    textClassName="text-xl md:text-2xl font-headline text-foreground"
                />
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Engineering secure, performant, and scalable applications with a security-first mindset.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-headline flex items-center gap-2 text-[#00FF9C]">
              <Lock className="w-4 h-4" />
              Verified Practices
            </h4>
            <div className="flex flex-wrap gap-2 max-w-md">
              {securityBadges.map(badge => (
                <span key={badge} className="text-[10px] font-code px-2 py-1 bg-[#00FF9C]/10 text-[#00FF9C] rounded border border-[#00FF9C]/20 flex items-center gap-1">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        {/* Bottom section: Links and Stack */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-code text-white/50">Built with</span>
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span key={tech} className="px-2 py-0.5 bg-white/5 rounded text-white/70">{tech}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-code text-[#00FF9C] px-2 py-1 border border-[#00FF9C]/30 rounded">
              Security-First Design
            </span>
            <span className="text-xs font-code text-muted-foreground">
              Deployed on Vercel
            </span>
            <div className="h-4 w-px bg-white/20 mx-2" />
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="hover:text-foreground transition-colors"
              >
                <link.icon className="h-5 w-5 text-muted-foreground hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
