var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: './src/index.js',
  }, // Entry point
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JS/JSX files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test:/\.html$/, // Load HTML files
        use: {
          loader: 'html-loader',
          options: {
            minimize: true, // Minimize HTML files
          },
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Load image files
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]', // Output file naming convention
            outputPath: 'images/', // Output directory for images
          },
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve JS and JSX extensions
  }
};
