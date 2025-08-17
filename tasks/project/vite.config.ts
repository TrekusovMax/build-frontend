import path from 'node:path'

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    minify: false,
    outDir: path.resolve('./dist/vite'),
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  base: '/vite/',

  plugins: [tsconfigPaths()],

  root: path.resolve('./'),
  publicDir: path.resolve('/vite/'),
})

