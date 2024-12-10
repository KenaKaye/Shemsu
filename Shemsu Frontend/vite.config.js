import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "C:\\Users\\maass\\cert.key",
      cert: "C:\\Users\\maass\\cert.crt",
    },
  },
});
