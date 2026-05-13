import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` is set to './' so the built `dist/` works whether it is served
// from the root, from a Jekyll subfolder, or as an iframe target.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
