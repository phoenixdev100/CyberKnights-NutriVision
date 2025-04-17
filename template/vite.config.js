import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['6fe3-103-255-232-154.ngrok-free.app', 'localhost'],
    port: 5173,
    strictPort: true,
  }
})
 