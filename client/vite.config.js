import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Import tailwindcss plugin for Vite
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // React plugin for Vite
    // Tailwind CSS plugin is automatically applied via PostCSS, no need to add directly to plugins
  ],
})
