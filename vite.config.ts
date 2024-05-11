import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import path from 'path';

// 기본 .env 파일 로드
dotenv.config({ path: path.resolve(__dirname, '.env') });

// NODE_ENV를 기반으로 추가 환경 파일 로드
const mode = process.env.NODE_ENV;

if (mode) {
  dotenv.config({ path: path.resolve(__dirname, `.env.${mode}`) });
}

// Vite 설정
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // '@' 앨리어스가 'src' 폴더를 정확하게 가리키도록 수정
    },
  },
  server: {
    proxy: {
      '/api/*': {
        target: process.env.VITE_APP_API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
