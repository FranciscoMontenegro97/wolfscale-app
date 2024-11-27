import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sassConfig from './sass.config';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: sassConfig
    }
  }
});