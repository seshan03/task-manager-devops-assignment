import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
plugins: [
react(),
tailwindcss(),
],
// frontend root for vite
root: "./src/frontend",

// Proxy /api requests to the backend during development
server: {
proxy: {
"/api": {
target: "http://localhost:5000",
changeOrigin: true,
secure: false,
// optional: preserve path (default)
// rewrite: (path) => path.replace(/^/api/, '/api')
}
}
}
});