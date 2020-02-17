const TerserPlugin = require('terser-webpack-plugin'); //去除console
module.exports = {
	optimization: {
	minimizer: [
		//打包时移除console
		new TerserPlugin({
			sourceMap: true, // Must be set to true if using source-maps in production
			terserOptions: {
				compress: {
					drop_console: true,
				},
			},
		}),
	],
	//公共代码抽离
	splitChunks: {
		// chunks: 'async',
		// minSize:1,
		// minRemainingSize: 0,
		maxSize: 0,
		minChunks: 1,
		maxAsyncRequests: 6,
		maxInitialRequests: 4,
		automaticNameDelimiter: '~',
		automaticNameMaxLength: 30,
		cacheGroups: {
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10
			},
			default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			}
		}
	},
	}
}
