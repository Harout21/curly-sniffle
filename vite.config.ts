import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa';

// Import named exports from TS/JS data files
import { corianStones } from './src/data/corianData';
import { grandexStones } from './src/data/grandexData';

const languages = ['hy', 'en', 'ru'];

// 1. Category landing pages (/hy/stones/corian, /hy/stones/grandex, etc.)
const stoneCategoryRoutes = languages.flatMap((lang) => [
  `/${lang}/stones/corian`,
  `/${lang}/stones/grandex`,
]);

// 2. Corian detail pages (/:lang/stones/corian/:id)
const corianRoutes = corianStones.flatMap((stone: any) => {
  const stoneId = stone.id || stone.slug;
  return languages.map((lang) => `/${lang}/stones/corian/${stoneId}`);
});

// 3. Grandex detail pages (/:lang/stones/grandex/:id)
const grandexRoutes = grandexStones.flatMap((stone: any) => {
  const stoneId = stone.id || stone.slug;
  return languages.map((lang) => `/${lang}/stones/grandex/${stoneId}`);
});

// 4. Project detail pages
const projectRoutes = Array.from({ length: 50 }, (_, i) => i + 1).flatMap((id) =>
    languages.map((lang) => `/${lang}/projects/${id}`)
);

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
        ...stoneCategoryRoutes,
        ...corianRoutes,
        ...grandexRoutes,
        ...projectRoutes,
      ],
    }),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Best Project',
        short_name: 'Best Project',
        description: 'Best Project - Solid Surface Stones',
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        globIgnores: ['sitemap.xml'],
        runtimeCaching: [
          {
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