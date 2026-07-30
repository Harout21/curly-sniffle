import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa';

import stoneSlugs from './src/data/stoneSlugs.json';

const stoneRoutes = stoneSlugs.flatMap((stone) => [
  `/hy/stones/${stone}`,
  `/en/stones/${stone}`,
  `/ru/stones/${stone}`,
]);

const projectRoutes = Array.from({ length: 50 }, (_, i) => i + 1).flatMap((id) => [
  `/hy/projects/${id}`,
  `/en/projects/${id}`,
  `/ru/projects/${id}`,
]);

export default defineConfig({
  base: '/',
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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Best Project',
        short_name: 'Best Project',
        description: 'Best Project - Natural Stone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'hy',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Cache all built assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Don't cache the sitemap (it changes)
        globIgnores: ['sitemap.xml'],
        runtimeCaching: [
          {
            // Cache your API calls — adjust the URL pattern to match yours
            urlPattern: /^https:\/\/bestproject\.am\/api\//i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
});