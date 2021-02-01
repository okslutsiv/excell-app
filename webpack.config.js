const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) => {
  return isDev ? `[name].${ext}` : `[name].[hash:7].${ext}`;
};
const getJsLoaders = () => {
  const loader = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];
  if (isDev) loader.push("eslint-loader");
  return loader;
};

module.exports = {
  context: resolve(__dirname, "src"),
  mode: isDev ? "development" : "production",
  entry: ["regenerator-runtime/runtime.js", "./index.js"],
  output: {
    filename: filename("js"),
    path: resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "src/favicon.ico"),
          to: resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /.s?[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: getJsLoaders(),
      },
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@core": resolve(__dirname, "src/core"),
    },
  },
  devtool: isDev ? "source-map" : false,
  devServer: {
    host: "localhost",
    port: 3000,
    hot: isDev,
  },
};
