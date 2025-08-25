import { type MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ilm Cloud',
    short_name: 'Ilm',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/islamic-geometric-pattern.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/islamic-geometric-pattern.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}