const path = require('path')
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
	name: 'MineSearch',
	mode: 'development', // production
	devtool: 'eval', // hidden-source-map
	resolve: {
		extensions: ['.js', '.jsx']
	},
	entry: {
		app: './client',
	}, // 입력
	module: {
		rules: [{
			test: /\.jsx?/,
			loader: 'babel-loader',
			options: {
				presets: [
					['@babel/preset-env', {
						targets: {
							browsers: ['> 1% in KR'],
						},
						debug: true,
					}],
					'@babel/preset-react'
				],
				plugins: [
					'react-refresh/babel',
				],
			},
			exclude: path.join(__dirname, 'node_modules'),
		}],
	},
	plugins: [
		new RefreshWebpackPlugin()
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/dist',
	}, // 출력
	devServer: {
		devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
		hot: true,
	}
}