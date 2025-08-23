import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/taylor-dpt-portfolio/',
  plugins: [react()]
});
