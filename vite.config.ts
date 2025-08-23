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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/setup.ts',
        'src/vitest.setup.ts',
        'src/mocks/**/*',
        'src/templates/**/*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
} as UserConfig)
