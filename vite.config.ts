import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      api: "/src/api",
      assets: "/src/assets",
      components: "/src/components",
      contexts: "/src/contexts",
      helpers: "/src/helpers",
      hooks: "/src/hooks",
      pages: "/src/pages",
      routes: "/src/routes",
      settings: "/src/settings",
      styles: "/src/styles",
      types: "/src/types",
      ui: "/src/ui",
    },
  },
});
