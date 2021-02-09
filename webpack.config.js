const { join } = require("path");

module.exports = {
  entry: {
    main: './app.ts'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  mode: 'production',
  watch: false,
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