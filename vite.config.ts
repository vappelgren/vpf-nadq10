import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // aumenta el límite a 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // separa dependencias pesadas
        },
      },
    },
  },
});
