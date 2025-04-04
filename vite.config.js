// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to the subdirectory name on GitHub Pages
  base: '/Belediyti/', // <<< CORRECT SETTING FOR GITHUB PAGES
});