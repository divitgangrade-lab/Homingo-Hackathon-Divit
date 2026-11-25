import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Relative base so the build works under /Homingo-Hackathon-Divit/ on GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
