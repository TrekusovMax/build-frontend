import esbuild from 'esbuild'

const options = {
  entryPoints: ['./src/entry.js', './src/performance.js'],
  outdir: './dist/esbuild',
}
esbuild.build(options)
