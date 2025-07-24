import { Configuration } from 'webpack'
import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const isProd = process.env.NODE_ENV === 'production'

const config: Configuration = {
  entry: './src/webpack.tsx',
  mode: isProd ? 'production' : 'development',
  target: ['web'],
  output: {
    path: path.resolve('./dist/webpack/'),
    clean: true,
    publicPath: '/webpack/',
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.tsx'],
        configFile: path.resolve(import.meta.dirname, './tsconfig.json'),
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',

        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Webpack</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
    }),
  ],
}
export default config

