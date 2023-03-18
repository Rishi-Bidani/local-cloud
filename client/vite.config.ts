import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    server: {
        proxy: {
            "/navigate": {
                // target: "http://localhost:5000",
                target: "http://127.0.0.1:5000",
            },
            "/upload": {
                // target: "http://localhost:5000",
                target: "http://127.0.0.1:5000",
            },
            "/download": {
                // target: "http://localhost:5000",
                target: "http://127.0.0.1:5000",
            },
            "/auth": {
                // target: "http://localhost:5000",
                target: "http://127.0.0.1:5000",
            },
        },
    },
});
