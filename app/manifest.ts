import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HomeDaemon Web app',
    short_name: 'HomedWeb',
    description: 'HomeDaemon web application',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#121212',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}