import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure map image is copied to public assets
const uploadedMap = "C:/Users/LENOVO/.gemini/antigravity/brain/ffa39055-e933-47e0-8b8b-f8b8ae1253d6/.user_uploaded/media_1788629060733.png";
const targetMap = path.resolve(__dirname, "public/images/general/india-map-stat.png");
try {
  if (fs.existsSync(uploadedMap)) {
    fs.copyFileSync(uploadedMap, targetMap);
  }
} catch (e) {
  // fallback handled
}

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
  },

  preview: {
    host: "0.0.0.0",
    port: 8443,
  },
});
