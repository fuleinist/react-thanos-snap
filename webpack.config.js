module.exports = {
  entry: ["@babel/polyfill", './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=8192',
        ]
      } 
    ]
  },
  output: {
	 filename: 'bundle.js',
	 path: __dirname + '/dist'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};