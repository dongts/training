import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/training/', // Replace 'training' with your GitHub repository name
  build: {
    outDir: 'dist',
  },
})
