let env = process.env.NODE_ENV || 'development';

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");  

console.log('NODE_ENV:', env);

let plugins = [];

if (env === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin(), 
    new OptimizeJsPlugin({
      sourceMap: false
    })
  );
}

module.exports = {
  entry: (env !== 'production' ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ] : []).concat(['./client/index.js']),
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    ...plugins,
    new HTMLWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "body"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};


