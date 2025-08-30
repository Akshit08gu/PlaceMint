// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    hmr: mode !== 'production', // ✅ only enable HMR in dev
  },
  preview: {
    hmr: false, // ✅ disable WebSocket in production preview
  },
  build: {
    outDir: 'dist',
  },
}))
