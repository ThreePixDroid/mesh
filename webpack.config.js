const { join } = require("path");

const devmode = false

module.exports = {
  entry: {
    main: './main.ts'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  mode: devmode ? 'development' : 'production',
  watch: devmode,
  resolve: { extensions: ['.ts'] },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
}