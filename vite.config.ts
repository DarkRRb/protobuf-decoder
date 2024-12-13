import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    base: "./",
    plugins: [solidPlugin()],
    server: {
        host: "127.0.0.1",
        port: 3000,
    },
    build: {
        target: "esnext",
    },
});
