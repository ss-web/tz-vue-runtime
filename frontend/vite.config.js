import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
    // {
    //   VITE_API_BACKEND: process.env.VITE_API_BACKEND || JSON.stringify('http://localhost:3000')
    // }
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    }
  }
})
