import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // honor a harness/CI-assigned port; falls back to vite's default 5173
    port: Number(process.env.PORT) || undefined,
  },
})
