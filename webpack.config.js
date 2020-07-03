const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-react', '@babel/preset-env'],
        //   plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-styled-components'],
        // },
      },
    ],
  },
};
