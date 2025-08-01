import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TÍO PELOTTE - Pastas Artesanales Frescas',
    short_name: 'TÍO PELOTTE',
    description: 'Pastas artesanales frescas hechas con amor en La Plata. Más de 30 años de tradición familiar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBE6D4',
    theme_color: '#FBE6D4',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}