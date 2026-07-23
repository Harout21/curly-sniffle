import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';

import stoneSlugs from './src/data/stoneSlugs.json';

// Generate all stone URLs
const stoneRoutes = stoneSlugs.flatMap((stone) => [
  `/hy/stones/${stone}`,
  `/en/stones/${stone}`,
  `/ru/stones/${stone}`,
]);

// Generate project URLs (1-50)
const projectRoutes = Array.from({ length: 50 }, (_, i) => i + 1).flatMap((id) => [
  `/hy/projects/${id}`,
  `/en/projects/${id}`,
  `/ru/projects/${id}`,
]);

export default defineConfig({
  plugins: [
    react(),

    sitemap({
      hostname: 'https://bestproject.am',
      dynamicRoutes: [
        '/',
        '/hy',
        '/en',
        '/ru',

        '/hy/projects',
        '/en/projects',
        '/ru/projects',

        '/hy/stones',
        '/en/stones',
        '/ru/stones',

        ...projectRoutes,
        ...stoneRoutes,
      ],
    }),

    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
});