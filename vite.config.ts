// <reference types="vitest">
// <reference types="vite/client">

import react from '@vitejs/plugin-react-swc'
import { UserConfig, defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['POKEMONTCG_API_KEY'])],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
} as UserConfig)
