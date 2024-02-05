import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const target = "http://127.0.0.1:5000";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "/navigate": {
                // target: "http://localhost:5000",
                target,
            },
            "/upload": {
                target,
            },
            "/download": {
                target,
            },
            "/auth": {
                target,
            },
            "/create": {
                target,
            },
            "/delete": {
                target,
            },
        },
    },
    build: {
        outDir: "../dist/client",
    },
});
