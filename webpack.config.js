const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/test.tsx'
  ],
  output: {
    libraryTarget: "var",
    filename: 'test.js'
  },
  resolve: {
    extensions: [
        '',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ],
  },
  externals: [
    // 'babel-polyfill',
    // 'react',
    // 'react-dom'
  ],
  module: {
    loaders: [
      {
        include: /src/,
        test: /\.tsx$/, exclude: /node_modules/, loader: 'babel?cacheDirectory!ts'
      }
    ]
  },
  devtool: 'cheap-source-map',
  node: {
    Buffer: false
  },
  devServer: {
    inline: true,
    port: 8080
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

}