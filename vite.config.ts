import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@/imports', replacement: path.resolve(__dirname, './imports') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
})
