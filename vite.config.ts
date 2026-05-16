import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

import tailwindcss from "@tailwindcss/vite";

import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Cube Colors",
        short_name: "Cube",
        description: "An app for practicing Rubik’s Cube color recognition",
        start_url: "/",
        scope: "/",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/web-app-manifest-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
