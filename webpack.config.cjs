const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: "web",
  output: {
    libraryTarget: 'module',
    path: path.resolve(__dirname, './dist/browser'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  },
  experiments: {
    outputModule: true
  },
  resolve: {
    extensions: ['.ts'],
  }
};
