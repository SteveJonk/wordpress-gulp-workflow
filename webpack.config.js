const webpack = require('webpack')
const path = require('path')
settings = require('./settings')

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    settings.themeLocation + 'ts/scripts.ts',
  ],
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: [/\.ts?$/, /\.tsx?$/],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
