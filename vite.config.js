import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
        mealList: resolve(__dirname, "src/meal-list/index.html"),
        mealDetail: resolve(__dirname, "src/meal-detail/index.html"),
      },
    },
  },
});
