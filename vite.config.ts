import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // The base must match your GitHub repository name
  base: "/business-site/",
  build: {
    outDir: "dist",
  },
});
