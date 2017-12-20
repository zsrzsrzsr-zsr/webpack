const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')
const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/js/bundle.js'
  },
  // devtool: 'source-map',
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env','babel-preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            {
              loader: 'postcss-loader',
              options: {
                plugins:[
                  require('autoprefixer'),
                  require('cssnano')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename:'static/css/bundle.min.css'
    }),
    new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new HtmlWebpackPlugin({
    template: 'public/index.html',
    filename: 'index.html'
  }),
  new CleanWebpackPlugin(['dist']),
  ]
}
