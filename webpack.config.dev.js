const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      index: "./src/index.js",
    },
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new Dotenv({
        path: "./.development.env",
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        title: "Development",
      }),
      new CopyPlugin({
        patterns: [{ from: "./other", noErrorOnMissing: true }],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
  };
};
