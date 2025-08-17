import esbuild from 'esbuild'
import path from 'node:path'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'
const isProd = process.env.NODE_ENV === 'production'
const options = {
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  publicPath: '/esbuild/',
  outdir: './dist/esbuild',
  minify: isProd,
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: ['src/index.tsx'],
          filename: './index.html',
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

