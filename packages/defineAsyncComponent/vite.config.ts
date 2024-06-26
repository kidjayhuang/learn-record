import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // "@": "./src",
      '@': fileURLToPath(new URL('./src', import.meta.url))

    },
  },
  server: {
    host: "0.0.0.0", // 启用本地IP
  },
});
