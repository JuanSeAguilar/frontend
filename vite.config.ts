import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [react()],
  server: {
    port: 5171,
    proxy: {
      '/api': {
        target: 'http://localhost:5170',
        changeOrigin: true
      }
      
    }
  }
})