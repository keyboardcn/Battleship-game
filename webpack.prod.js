const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production", // Set mode to production for optimized builds
  output:{
    filename: "[name].[contenthash].bundle.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  optimization: {    
    minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html", // HTML template
            minify:{
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}), // Extract CSS into separate files
    new CleanWebpackPlugin.CleanWebpackPlugin(), // Clean the output directory before each build
  ],
    module: {
    rules: [
      {
        test: /\.css$/, // Load CSS files
        use: [
            MiniCssExtractPlugin.loader, 
            "css-loader"
        ],
      },
    ],
  }
});