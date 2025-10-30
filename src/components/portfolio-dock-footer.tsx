import { Github, Linkedin, Mail } from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import Link from 'next/link';

const contactLinks = [
  {
    title: 'GitHub',
    icon: <Github className='h-full w-full text-foreground/80' />,
    href: 'https://github.com/Saurav-Astro',
  },
  {
    title: 'LinkedIn',
    icon: <Linkedin className='h-full w-full text-foreground/80' />,
    href: 'https://www.linkedin.com/in/saurav-kumar-astro/',
  },
  {
    title: 'Email',
    icon: <Mail className='h-full w-full text-foreground/80' />,
    href: 'mailto:0501saurav@gmail.com',
  },
];

export default function PortfolioDockFooter() {
  return (
    <footer className='fixed bottom-2 left-1/2 z-50 -translate-x-1/2'>
      <Dock className='items-end pb-3'>
        {contactLinks.map((item, idx) => (
          <Link href={item.href} key={idx} target='_blank' rel='noopener noreferrer'>
            <DockItem className='aspect-square rounded-full bg-transparent hover:bg-white/10'>
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </footer>
  );
}
