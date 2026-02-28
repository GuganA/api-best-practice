const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server.ts',
  target: 'node', // important for Node.js apps
  externals: [nodeExternals()], // don't bundle node_modules
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // resolve these extensions
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map', // optional: enables source maps
  mode: 'production', // or 'production'
};