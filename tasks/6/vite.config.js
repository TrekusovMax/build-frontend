export default {
  build: {
    minify: false,
    rollupOptions: {
      input: ['./src/entry.js', './src/performance.js'],
      output: {
        dir: './dist/vite',
        entryFileNames: '[name].js',
      },
    },
  },
}
