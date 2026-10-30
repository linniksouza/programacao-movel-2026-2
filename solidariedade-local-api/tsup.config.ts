import { defineConfig } from "tsup";

export default defineConfig({
    entry: [
        "src/**/*.*.ts"
    ],
    format: ["cjs"],
    target: "node22",
    sourcemap: false,
    clean: true,
    dts: false
});
