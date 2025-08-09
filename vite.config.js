import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@common': '/src/components/common',
      '@features': '/src/features/slices',
      '@pages': '/src/pages',
      '@store': '/src/store',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@lib': '/src/lib',
    },
  },
})