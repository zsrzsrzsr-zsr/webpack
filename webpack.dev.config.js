const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  // app: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/js/bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port:3000,
    hot:true,
    historyApiFallback: true
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env','babel-preset-react'],
            plugins: [
              ["import", { libraryName: "antd",libraryDirectory: "es", style: "css" }] 
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use:
        ['style-loader','css-loader']
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
  new HtmlWebpackPlugin({
    template: 'public/index.html',
    filename: 'index.html'
  }),
  new OpenBrowserPlugin({
    url:"http://localhost:3000/"
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  ]
}
