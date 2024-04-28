
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',  // '@' 앨리어스가 'src' 폴더를 정확하게 가리키도록 수정
    },
  },
  server: {
    proxy: {
      "/api/*": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});