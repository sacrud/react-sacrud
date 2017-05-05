const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2

let debug = env !== 'build';
let libraryName = 'react-sacrud';
let plugins = [];
let outputFile = libraryName + '.min.js';

if (!debug) {
  plugins.push(
    new UglifyJsPlugin({
      minimize: true ,
      beautify: false,
      comments: false,
      compress: {
        sequences   : true,
        booleans    : true,
        loops       : true,
        unused      : true,
        dead_code   : true,
        warnings    : false,
        drop_console: true,
        unsafe      : true
      }
    })
  );
}

const config = {
  entry: path.join(__dirname, '/src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          // { loader: 'postcss-loader' },
        ],
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
        ],
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.jsx']
  },
  plugins: plugins
};

module.exports = config;
