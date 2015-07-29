module.exports = {
  entry: ['./app/main.jsx'],
  output: {
    path: './build',
    filename: 'bundle.js',
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!sass'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    hot: true,
    progress: true,
    colors: true,
  }
};
