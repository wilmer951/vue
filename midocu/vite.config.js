import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    proxy: {
      '/api': { // todo lo que empiece con /api lo mandará al backend PHP
        target: 'http://localhost/PHP/base_login_crud/mydocu/Vista/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // quita /api al reenviar
      }
    }
  }
})
