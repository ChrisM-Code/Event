import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // default folder for production build
  },
  server: {
    port: 3000, // optional, for local development
  },
  base: "/", // Ensures correct path resolution on Netlify
});
