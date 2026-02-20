import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { withSdbUI } from "@sdbank/ui/vite";

export default defineConfig(
  withSdbUI({
    plugins: [react(), tailwindcss()],
  })
);
