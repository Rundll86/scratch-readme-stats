import { defineConfig } from "tsup";

export default defineConfig({
    entry: [
        "./src/engine/internal/serverless/edgeone.ts",
        "./src/engine/internal/serverless/esa.ts"
    ],
    clean: true,
    dts: true,
    loader: {
        ".svg": "text"
    }
});