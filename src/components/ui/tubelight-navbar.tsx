"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon, Home, User, FolderGit, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const NameIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full"
    >
      <path d="M7.25,7.52C7.25,7.52 7.25,7.52 7.25,7.52C7.82,6.53 8.83,5.92 9.99,5.92C11.14,5.92 12.16,6.53 12.73,7.52C12.73,7.52 12.73,7.52 12.73,7.52L13.88,9.45L15.02,7.52C15.59,6.53 16.6,5.92 17.76,5.92C18.91,5.92 19.93,6.53 20.5,7.52L21.5,9.25L20.5,11.25L19.5,9.25C19.5,9.25 19.24,8.8 18.88,8.8C18.31,8.8 17.84,9.45 17.84,9.45L16.29,12.43L17.84,15.41C17.84,15.41 18.31,16.06 18.88,16.06C19.24,16.06 19.5,15.61 19.5,15.61L20.5,13.61L21.5,15.61L20.5,17.34C19.93,18.33 18.92,18.94 17.76,18.94C16.6,18.94 15.59,18.33 15.02,17.34L13.88,15.41L12.73,17.34C12.16,18.33 11.15,18.94 9.99,18.94C8.83,18.94 7.82,18.33 7.25,17.34L6.25,15.61L7.25,13.61L8.25,15.61C8.25,15.61 8.51,16.06 8.87,16.06C9.44,16.06 9.91,15.41 9.91,15.41L11.46,12.43L9.91,9.45C9.91,9.45 9.44,8.8 8.87,8.8C8.51,8.8 8.25,9.25 8.25,9.25L7.25,11.25L6.25,9.25L7.25,7.52Z M4,5C4,4.45 4.45,4 5,4L19,4C19.55,4 20,4.45 20,5L20,19C20,19.55 19.55,20 19,20L5,20C4.45,20 4,19.55 4,19L4,5Z" />
    </svg>
);

interface NavItem {
  name: string
  url: string
  icon: LucideIcon | React.ElementType
}

const navItems: NavItem[] = [
    { name: 'Saurav', url: '/', icon: NameIcon },
    { name: 'Home', url: '/home', icon: Home },
    { name: 'About', url: '/home#about', icon: User },
    { name: 'Projects', url: '/projects', icon: FolderGit },
    { name: 'Contact', url: '/contact', icon: Phone },
]

interface NavBarProps {
  className?: string
}

export function TubelightNavbar({ className }: NavBarProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(navItems[0].name);

  useEffect(() => {
    // Handle hash links for about section
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setActiveTab('About');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on initial load

    // Set active tab based on pathname
    const currentPath = pathname.split('#')[0];
    const activeItem = navItems.find(item => item.url.split('#')[0] === currentPath && item.url.includes(window.location.hash));
    const simpleActiveItem = navItems.find(item => item.url === currentPath);
    
    if (window.location.hash === '#about') {
      setActiveTab('About');
    } else if (activeItem) {
      setActiveTab(activeItem.name);
    } else if (simpleActiveItem) {
      setActiveTab(simpleActiveItem.name);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);


  return (
    <div
      className={cn(
        "fixed top-4 sm:top-0 left-1/2 -translate-x-1/2 z-50 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 sm:px-6 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center w-6 h-6">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
