import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mp3'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          audio: ['./src/assets/audio/audio-file.mp3']
        }
      }
    }
  }
});

