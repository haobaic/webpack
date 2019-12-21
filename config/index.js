const TerserPlugin = require('terser-webpack-plugin');//去除console
//域名配置
var setServer = {
	port: 8070,//端口号
	open: true,//是否自动打开页面
	contentBase: "./dist", //本地服务路径
	inline: true, //实时刷新
	hot: true, //热替换
	proxy: {
		'/api': {
			target: 'https://cnodejs.org',
			secure: false,
			changeOrigin: true,
			pathRewrite: {
				'^/api': '/api/v1' //需要rewrite重写
			}
		},
	}
};
var common={
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
		}
	};
const config = {
	htmlArray: ['index', 'submit'], //打包的html
	setServer,
	common
};
//导出该变量
module.exports = config;
