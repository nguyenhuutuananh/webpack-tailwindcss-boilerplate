/*
 * Copyright (c) 2021.
 * Author: Tuan Anh Nguyen
 * Email: nguyenhuutuananh2@gmail.com
 */
const path = require('path');
const env = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,

  entry: './src/bootstrap.js',

  output: {
    clean: true,
    path: path.join(__dirname, 'dist'),
    publicPath: 'auto',
    filename: (pathData) => {
      if (pathData.chunk.name === 'main') {
        return env === 'development' ? 'js/bundle.js' : 'js/bundle.[contenthash].min.js';
      }
      return env === 'development' ? 'js/[name].js' : 'js/[name].[contenthash].min.js';
    },
  },
  // TODO: find this option
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2, sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { implementation: require('sass'), sourceMap: true } },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].min.css'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
  devServer: {
    watchFiles: ['src/**/*.html', 'public/**/*'],
  },
};
