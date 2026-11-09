import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // For Development, Proxy Server, to overcome the CORS issues on Media Servers (Github, GCS)
  // server: {
  //   proxy: {
  //     '/api/video': {
  //       target: 'https://storage.googleapis.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/video/, ''),
  //     },
  //   },
  // },
})
