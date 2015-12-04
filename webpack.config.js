module.exports = {
	context: __dirname + '/src',
	entry: './main.js',
	output: {
		path: __dirname + '/build/core/',
		filename: 'content.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|browsers|build|cache)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
};
