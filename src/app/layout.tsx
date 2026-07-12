import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Inter, Space_Grotesk, Fira_Code } from 'next/font/google';
import { cn } from "@/lib/utils";
import { TerminalEasterEgg } from "@/components/ui/terminal-easter-egg";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
});


export const metadata: Metadata = {
  title: "Saurav Kumar | Security Engineer & Full-Stack Developer",
  description: "Portfolio of Saurav Kumar, specializing in secure full-stack development, AI/ML engineering, and offensive cybersecurity.",
  metadataBase: new URL('https://astro-saurav.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Saurav Kumar | Security Engineer & Full-Stack Developer',
    description: 'Portfolio of Saurav Kumar, specializing in secure full-stack development, AI/ML engineering, and offensive cybersecurity.',
    url: 'https://astro-saurav.xyz',
    siteName: 'Saurav Kumar | Security Engineer & Full-Stack Developer',
    images: [
      {
        url: '/me/my_photo.jpeg', // Fallback to your main photo or an OG specific image
        width: 1200,
        height: 630,
        alt: 'Saurav Kumar Portfolio preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurav Kumar | Security Engineer',
    description: 'Portfolio of Saurav Kumar, specializing in secure full-stack development, AI/ML engineering, and offensive cybersecurity.',
    creator: '@0501saurav',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saurav Kumar',
  url: 'https://astro-saurav.xyz',
  jobTitle: 'Cybersecurity Analyst | Application Security | Full-Stack Developer',
  sameAs: [
    'https://github.com/Astro-Saurav',
    'https://www.linkedin.com/in/saurav-kumar-astro/',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(
        "font-sans antialiased",
        inter.variable,
        spaceGrotesk.variable,
        firaCode.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <TerminalEasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
