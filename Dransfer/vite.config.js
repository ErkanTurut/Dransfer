import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  plugins: [
    react(),

    rollupNodePolyFill({
      include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")],
    }),
  ],

  build: {
    rollupOptions: {
      plugins: [
        // ↓ Needed for build
        rollupNodePolyFill(),
      ],
    },
    // ↓ Needed for build if using WalletConnect and other providers
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
