var browser = 'chrome';

module.exports = {
	context: __dirname + '/src',
	entry: './main.js',
	resolve: {
		alias: {
			'browser-specific': __dirname + '/browsers/' + browser + '/index.js'
			}
	},
	output: {
		path: __dirname + '/build/' + browser,
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
