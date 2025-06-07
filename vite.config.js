import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/todo-app/",
  build: {
    assetsInclude: ["**/*.mp3", "**/*.svg"],
  },
  publicDir: "public",
});
