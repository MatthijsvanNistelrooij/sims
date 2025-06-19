import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'], // Treat .glb files as assets
  resolve: {
    alias: {
      // Optional: Add alias for imports if needed
      '@models': '/src/models',
    },
  },
})
