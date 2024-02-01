const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  mode: "development",
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
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
  ],

}