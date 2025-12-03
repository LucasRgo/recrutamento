import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        allowedHosts: [
            "beloved-barnacle-smart.ngrok-free.app",
            "creditotalento.pt"
        ],
    },
});
