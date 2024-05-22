import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // "@": "./src",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  
  build: {
    outDir: 'lib',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/components/async-component.vue'),
      external: ["vue"],
      output: {
        globals: {
          vue: "vue",
        },
        extend: true,
      },
    },
  },
});
