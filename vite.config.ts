import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [react()],
  server: {
    port: 5170,
    proxy: {
      '/api': {
        target: 'http://localhost:7000',
        changeOrigin: true
      }
      
    }
  }
})