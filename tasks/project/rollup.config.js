import css from 'rollup-plugin-import-css'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import html from '@rollup/plugin-html'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import path from 'path'
import alias from '@rollup/plugin-alias'

const isProd = process.env.NODE_ENV === 'production'

export default {
  input: './src/index.tsx',
  output: {
    dir: 'dist/rollup',
    format: 'iife',
  },

  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    }),
    isProd && terser(), // минимизация только в production

    css(),
    typescript({ outDir: 'dist/rollup', tsconfig: './tsconfig.json' }),
    html({
      publicPath: '/rollup/',
      fileName: 'index.html',
      title: 'Rollup Todo App',
      template: ({ files, publicPath, title }) => {
        const scripts = (files.js || [])
          .map(
            ({ fileName }) =>
              `<script type="module" src="${publicPath}${fileName}"></script>`,
          )
          .join('\n')

        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <title>${title}</title>
                </head>
                <body>
                    <div id="root"></div>
                    ${scripts}
                </body>
                </html>`
      },
    }),
    nodeResolve({ browser: true }),
    commonjs({
      transformMixedEsModules: true,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),

    alias({
      entries: [
        {
          find: 'components',
          replacement: path.resolve('./src/components'),
        },
        {
          find: 'containers',
          replacement: path.resolve('./src/containers'),
        },
        { find: 'routes', replacement: path.resolve('./src/routes') },
        { find: 'store', replacement: path.resolve('./src/store') },
      ],
    }),
  ].filter(Boolean),
}

