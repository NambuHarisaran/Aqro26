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
  // Exclude unnecessary files from public folder during build
  publicDir: 'public',
  build: {
    // Copy only necessary public files, exclude dev/backup files
    copyPublicDir: true,
    // Performance optimizations
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true, // Split CSS for each async chunk
    rollupOptions: {
      output: {
        // Improved code splitting for better caching
        manualChunks: (id) => {
          // Core React runtime - essential, load first
          if (id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react/') && !id.includes('react-dom')) {
            return 'react-vendor';
          }
          // Router - needed early for navigation
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // Framer Motion - split into smaller chunks, lazy load
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
          // UI utilities - small, can be bundled together
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'ui-utils';
          }
          // Icons - separate chunk
          if (id.includes('lucide-react') || id.includes('@tabler/icons-react')) {
            return 'icons';
          }
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
    include: ['react', 'react-dom', 'react-router-dom'],
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
