import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss()
],
  server: {
    port: 3000, // Optional: keep your original dev port
  },
  build: {
    outDir: 'build', // Matches Webpack's default 'dist' or 'build'
  }
});