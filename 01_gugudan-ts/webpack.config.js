const path = require('path')

module.exports = {
	mode: 'development', // production
	devtool: 'eval', // hidden-source-map
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	entry: {
		app: './client.tsx'
	},
	module: {
		rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
	},
}