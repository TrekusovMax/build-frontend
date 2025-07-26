import esbuild from 'esbuild'
import path from 'node:path'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'
const isProd = process.env.NODE_ENV === 'production'
const options = {
  entryPoints: [path.resolve('./src/index.tsx')],
  metafile: true,
  bundle: true,
  outdir: './dist/esbuild',
  minify: isProd,
  resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  alias: {
    components: path.resolve('./src/components'),
    containers: path.resolve('./src/containers'),
    routes: path.resolve('./src/routes'),
    store: path.resolve('./src/store'),
  },
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: [path.resolve('src/index.tsx')],
          filename: './index.html',
          extraScripts: [
            {
              src: '/esbuild/index.js',
            },
          ],
          htmlTemplate: `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <title>esbuild</title>
                            </head>
                            <body>
                                <div id="root"></div>                                
                            </body>
                        </html>`,
        },
      ],
    }),
  ],
}

esbuild.build(options).catch(() => process.exit(1))

