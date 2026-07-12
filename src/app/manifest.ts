import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saurav Kumar - Portfolio',
    short_name: 'Saurav Portfolio',
    description: 'The personal portfolio of Saurav Kumar, a developer and cybersecurity practitioner.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#00FF9C',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
