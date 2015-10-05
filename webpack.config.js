module.exports = {
  entry: "./app/main.jsx",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      	{
      		test: /\.js$/, 
      		loader: 'jsx-loader'
      	}, {
	      	test: /\.jsx$/, 
	      	exclude: /(node_modules|bower_components)/,
	      	loader: 'babel-loader'
    	}
    ]
  }
};
