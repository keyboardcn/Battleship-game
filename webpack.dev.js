const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output:{
    filename: "[name].bundle.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Load CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "inline-source-map", // Enable source maps for easier debugging
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000, // Development server port
    historyApiFallback: true, // For single-page applications
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // HTML template
      filename: "index.html", // Output file name
    }),
  ],
});