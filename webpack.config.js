/*global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'react-sacrud';

let plugins = [], outputFile;

if (env === 'build') {
  outputFile = libraryName + '.min.js';
  plugins.push(new UglifyJsPlugin({
      minimize: true ,
      beautify: false,
      comments: false,
      compress: {
          sequences   : true,
          booleans    : true,
          loops       : true,
          unused      : true,
          warnings    : false,
          drop_console: true,
          unsafe      : true
      }
  }));
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader?presets[]=stage-0,presets[]=react,presets[]=es2015',
        exclude: /(node_modules|bower_components)/
      },
      {
          test: /\.(css)$/,
          use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              // { loader: 'postcss-loader' },
          ]
      },
      {
          test: /\.(scss)$/,
          use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              // { loader: 'postcss-loader' },
              { loader: 'sass-loader' }
          ],
          exclude: /(node_modules|bower_components)/
      },
      {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: 'url-loader'
      },
      {
          test: /\.(svg|png|gif|jpge?g)$/,
          use: [
              { loader: 'url-loader' },
              { loader: 'img-loader' }
          ]
      }
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/
      // }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: plugins
};

module.exports = config;
