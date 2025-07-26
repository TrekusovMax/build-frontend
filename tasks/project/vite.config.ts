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
  base: './',
  resolve: {
    alias: {
      components: path.resolve('./src/components'),
      containers: path.resolve('./src/containers'),
      routes: path.resolve('./src/routes'),
      store: path.resolve('./src/store'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  plugins: [tsconfigPaths()],

  root: path.resolve('./'),
  publicDir: path.resolve('/vite/'),
})

