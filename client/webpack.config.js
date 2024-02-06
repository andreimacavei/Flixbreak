const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: "development",
  // entry: {
  //   app: './src/app.js',
  //   tmdbApiData: './src/services/tmdbApiData.js',
  //   slider: './src/components/slider.js',
  // },
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
    ],
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all',
    // },
    // minimize: true, // uncomment if you want to minimize in development mode also
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/assets/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'shows.html',
      template: './src/assets/shows.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'movie-details.html',
      template: './src/assets/movie-details.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'tv-details.html',
      template: './src/assets/tv-details.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: './src/assets/search.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'images'),
          to: path.resolve(__dirname, '../public', 'images'),
        },
      ],
    }),
  ],

}