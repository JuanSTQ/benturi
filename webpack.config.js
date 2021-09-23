const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv').config();
const webpack = require('webpack');
const dev = process.env.MODE === "development"
const entry = ["./src/frontend/index.js"]
dev && (entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'))
module.exports = {
  mode: dev ? "development" : "production" ,
  entry,
  output: {
    path: path.resolve(__dirname, 'src/server/dist'),
    filename: 'assets/bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s?css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpge|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    dev ? new webpack.HotModuleReplacementPlugin() : ()=>{},
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  devServer: dev ? {historyApiFallback: true} : {},
};
