const path = require('path')
settings = require('./settings')

module.exports = {
  entry: settings.themeLocation + 'ts/scripts.ts',
  mode: 'development',
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
