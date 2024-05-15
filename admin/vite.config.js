import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: env.VITE_PUBLIC_PATH || '/',
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      // '~': path.resolve(process.cwd()),
    },
  },
})
