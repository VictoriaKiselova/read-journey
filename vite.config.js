import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
  @import "${path
    .resolve(__dirname, "src/scss/common/_vars.scss")
    .replace(/\\/g, "/")}"; 
  @import "${path
    .resolve(__dirname, "src/scss/common/_breakpoints.scss")
    .replace(/\\/g, "/")}"; 
  @import "${path
    .resolve(__dirname, "src/scss/common/_reset.scss")
    .replace(/\\/g, "/")}"; 
  @import "${path
    .resolve(__dirname, "src/scss/common/_mixins.scss")
    .replace(/\\/g, "/")}"; 
`,
      },
    },
  },
});
