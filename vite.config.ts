import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa';

// Safely import TS data using dynamic require/import handling or pre-parsed data
import { corianStones } from './src/data/corianData';
import { grandexStones } from './src/data/grandexData';

const languages = ['hy', 'en', 'ru'];

// 1. Category landing pages
const stoneCategoryRoutes = languages.flatMap((lang) => [
  `/${lang}/stones/corian`,
  `/${lang}/stones/grandex`,
]);

// 2. Corian detail pages
const corianRoutes = (corianStones || []).flatMap((stone: any) => {
  const stoneId = stone.id || stone.slug;
  return languages.map((lang) => `/${lang}/stones/corian/${stoneId}`);
});

// 3. Grandex detail pages
const grandexRoutes = (grandexStones || []).flatMap((stone: any) => {
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
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'locales/**/*.json'],
      manifest: {
        name: 'Best Project',
        short_name: 'Best Project',
        description: 'Best Project - Stones & Design',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'hy',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: false, // Enables Service Worker during `npm run dev`
        type: 'module',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,json}'],
        globIgnores: ['sitemap.xml', 'robots.txt'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/],
        runtimeCaching: [
          {
            // Cache translation files for multi-language support offline
            urlPattern: /\/locales\/.*\.json$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'i18n-translations',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
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