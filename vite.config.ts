import { defineConfig } from 'vite';

export default defineConfig({
  // This ensures your assets load correctly on GitHub Pages
  base: '/business-site/',
  
  build: {
    // Optional: Better compatibility for Pixi.js 8
    target: 'esnext',
  },
  
  server: {
    open: true, // Opens the browser automatically when you run 'npm run dev'
  }
});