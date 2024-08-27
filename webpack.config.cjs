const path = require('path');

module.exports = {
  entry: './src/index.ts',
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'module',
    path: path.resolve(__dirname, './dist/browser'),
  },
  resolve: {
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
    extensions: ['.ts'],
  },
  target: 'web',
};
