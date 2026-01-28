import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Performance optimizations
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true, // Split CSS for each async chunk
    rollupOptions: {
      output: {
        // Improved code splitting for better caching
        manualChunks: {
          // Core React runtime
          'react-vendor': ['react', 'react-dom'],
          // Router - separate chunk
          'router': ['react-router-dom'],
          // Animations - often large, separate chunk
          'animations': ['framer-motion'],
          // UI utilities
          'ui-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        // Optimize chunk file names for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Inline small assets to reduce requests
    assetsInlineLimit: 4096,
    // Disable source maps in production for smaller files
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Enable module preload polyfill
    modulePreload: {
      polyfill: true,
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: [],
  },
  // Optimize dev server
  server: {
    warmup: {
      clientFiles: ['./src/main.tsx', './src/App.tsx'],
    },
  },
  // Enable faster esbuild for CSS
  css: {
    devSourcemap: false,
  },
})
