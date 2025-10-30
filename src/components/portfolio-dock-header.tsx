import { Home, User, FolderGit, Phone } from 'lucide-react';
import Link from 'next/link';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const NameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-full w-full text-foreground/80"
  >
    <path d="M7.25,7.52C7.25,7.52 7.25,7.52 7.25,7.52C7.82,6.53 8.83,5.92 9.99,5.92C11.14,5.92 12.16,6.53 12.73,7.52C12.73,7.52 12.73,7.52 12.73,7.52L13.88,9.45L15.02,7.52C15.59,6.53 16.6,5.92 17.76,5.92C18.91,5.92 19.93,6.53 20.5,7.52L21.5,9.25L20.5,11.25L19.5,9.25C19.5,9.25 19.24,8.8 18.88,8.8C18.31,8.8 17.84,9.45 17.84,9.45L16.29,12.43L17.84,15.41C17.84,15.41 18.31,16.06 18.88,16.06C19.24,16.06 19.5,15.61 19.5,15.61L20.5,13.61L21.5,15.61L20.5,17.34C19.93,18.33 18.92,18.94 17.76,18.94C16.6,18.94 15.59,18.33 15.02,17.34L13.88,15.41L12.73,17.34C12.16,18.33 11.15,18.94 9.99,18.94C8.83,18.94 7.82,18.33 7.25,17.34L6.25,15.61L7.25,13.61L8.25,15.61C8.25,15.61 8.51,16.06 8.87,16.06C9.44,16.06 9.91,15.41 9.91,15.41L11.46,12.43L9.91,9.45C9.91,9.45 9.44,8.8 8.87,8.8C8.51,8.8 8.25,9.25 8.25,9.25L7.25,11.25L6.25,9.25L7.25,7.52Z M4,5C4,4.45 4.45,4 5,4L19,4C19.55,4 20,4.45 20,5L20,19C20,19.55 19.55,20 19,20L5,20C4.45,20 4,19.55 4,19L4,5Z" />
  </svg>
);


const navLinks = [
  {
    title: 'Saurav',
    icon: <NameIcon />,
    href: '/',
  },
  {
    title: 'Home',
    icon: <Home className='h-full w-full text-foreground/80' />,
    href: '/home',
  },
  {
    title: 'About',
    icon: <User className="h-full w-full text-foreground/80" />,
    href: '/home#about',
  },
  {
    title: 'Projects',
    icon: <FolderGit className='h-full w-full text-foreground/80' />,
    href: '/projects',
  },
  {
    title: 'Contact',
    icon: <Phone className='h-full w-full text-foreground/80' />,
    href: '/contact',
  },
];

export default function PortfolioDockHeader() {
  return (
    <header className='fixed top-2 left-1/2 z-50 -translate-x-1/2'>
      <Dock className='items-end pb-3'>
        {navLinks.map((item, idx) => (
          <Link href={item.href} key={idx}>
            <DockItem className='aspect-square rounded-full bg-transparent hover:bg-white/10'>
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </header>
  );
}
