import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore",
      "firebase/storage",
      "recharts",
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
      "@tanstack/react-table",
      "mapbox-gl",
      "sonner",
      "zod",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    // Tabler icons are ESM — excluding from pre-bundle avoids the optimizer hang
    exclude: ["@tabler/icons-react"],
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("react") || id.includes("react-dom")) {
            return "vendor";
          }

          if (id.includes("firebase")) {
            return "firebase";
          }

          if (id.includes("recharts")) {
            return "charts";
          }

          if (id.includes("@dnd-kit")) {
            return "dnd";
          }

          if (id.includes("@tanstack/react-table")) {
            return "table";
          }
        },
      },
    },
  },
});
