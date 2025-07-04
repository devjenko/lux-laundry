import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      // Optimize JPEG images
      mozjpeg: {
        quality: 80,
      },
      // Optimize PNG images
      pngquant: {
        quality: [0.65, 0.8],
      },
      // Convert images to WebP format
      webp: {
        quality: 80,
      },
    }),
  ],
});
