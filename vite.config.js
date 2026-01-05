import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['luxuryball-16.png', 'luxuryball-32.png', 'luxuryball-192.png', 'luxuryball-512.png'],
      manifest: {
        name: 'Pokemon App',
        short_name: 'Pokemon 🎯',
        description: 'Pokemon FFast Pokemon Finder built with React. Infinite scroll, offline support, and SEO optimized.',
        start_url: '/',
        display: 'standalone',
        theme_color: '#438d95',
        background_color: '#2f2f2f',
        icons: [
          {
            src: '/luxuryball-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/luxuryball-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }) 
  ],
})
