import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [vue()],  resolve: {
    alias: {      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }});
