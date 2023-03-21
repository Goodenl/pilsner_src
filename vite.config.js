import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

import path from 'path'
const pwaPath = process.env.NODE_ENV === 'production' ? '/pilsner/pwa/': '/pwa/'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/pilsner/'
    : '/',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        path.join(pwaPath, '**/*.{png,webp,ico,svg,jpeg,jpg,woff}'),
      ],
      manifest: {
        $schema: "https://json.schemastore.org/web-manifest-combined.json",
        name: 'Pilsner',
        short_name: 'Pilsner',
        description: 'Pilsner PWA',
        start_url: ".",
        display: "standalone",
        orientation: 'portrait',
        background_color: "#23A67E",
        theme_color: '#23A67E',

        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'white',

        icons: [
          {
            src: path.join(pwaPath, '/favicon-16x16.png'),
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: path.join(pwaPath, '/favicon-32x32.png'),
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: path.join(pwaPath, '/pwa-192x192.png'),
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: path.join(pwaPath, '/pwa-512x512.png'),
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: path.join(pwaPath, '/pwa-512x512.png'),
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      },
      
      workbox: {
        // sourcemap: true,
        cleanupOutdatedCaches: process.env.NODE_ENV === "development" ? true : false,
        // globPatterns: [
        //   "/*.html",
        // ],
      },
    })
  ]
})
