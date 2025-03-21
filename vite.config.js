import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import createSitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    createSitemap({
      hostname: 'https://datadragons.live',
      lastmod: new Date().toISOString().slice(0, 10),
      changefreq: 'weekly',
      priority:1,  
      dynamicRoutes: [
          '/member/charith_dev',
          '/member/gimhana_dev',
          '/member/sameera_dev',
          '/member/janith_dev',
          '/project/Ruhuna ScheduleEase'
        ],
      generateRobotsTxt: true, // This generates robots.txt
    })
  ],
})
