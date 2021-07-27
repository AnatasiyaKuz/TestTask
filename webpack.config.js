const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    
    watch: true,
  mode: 'development',
  entry: './scripts/index.js',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
      
    ]
  },
 plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  }