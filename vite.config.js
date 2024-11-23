import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/rbac/',  // This must match your GitHub Pages subfolder
  plugins: [react()],
});
