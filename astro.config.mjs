// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { remarkLazyLoadImages } from "./src/utils/remarkLazyLoadImages.mjs";
import { SITE } from "./src/config";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: "never",
  markdown: {
    remarkPlugins: [remarkLazyLoadImages],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => SITE.showArchives || !page.endsWith("/archives"),
      // Astro emits trailing slashes here even though the site uses
      // trailingSlash: "never" — normalise so sitemap URLs match the real ones.
      serialize: (item) => {
        if (item.url.endsWith("/") && item.url !== SITE.website + "/") {
          item.url = item.url.slice(0, -1);
        }
        return item;
      },
    }),
    AstroPWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "avatar.jpg"],
      manifest: {
        name: "romanychev",
        short_name: "romanychev",
        description: "Личный блог о технологиях, AI, блокчейне, приватности и разработке.",
        theme_color: "#006cac",
        background_color: "#fdfdfd",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
          {
            src: "avatar.jpg",
            sizes: "192x192",
            type: "image/jpeg",
            purpose: "any",
          },
          {
            src: "avatar.jpg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/404",
        globPatterns: ["**/*.{css,js,html,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}"],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
