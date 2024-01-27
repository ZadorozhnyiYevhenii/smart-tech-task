import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteGHPages from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [
    vue(),
    ViteGHPages(),
  ],
  base: '/smart-tech-task/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
