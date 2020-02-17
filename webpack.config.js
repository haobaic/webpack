const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {setHtml} = require('./config/webpack.html.js');
const setServer = require('./config/webpack.server.js');
const setConf = require('./config/webpack.conf.js');
const setModule = require('./config/webpack.module.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
	//进入
	entry: {
		babelPolyfill: '@babel/polyfill',
		index: './src/js/index/main.js',
		submit: './src/js/submit/main.js'
	},
	//输出
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name]-[hash].js'
	},
	//路径映射
	resolve: {
		alias: {
			'@': path.resolve(__dirname, "src"),
			cssUti: path.resolve(__dirname, 'src/css/'),
			jsUti: path.resolve(__dirname, 'src/js/'),
			commUti: path.resolve(__dirname, 'src/common/')
		}
	},
	//域名配置
	devServer: setServer.devServer,
	watch: true, // 开启监听文件更改，自动刷新
	watchOptions: {
		ignored: /node_modules/, //忽略不用监听变更的目录
		aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
		poll: 1000 //每秒询问的文件变更的次数
	},
	module:setModule.module,
	//去除console 公共代码抽离配置
	optimization: setConf.optimization,
	plugins: [
		//引入插件
		new Webpack.ProvidePlugin({
			'$': 'jquery'
		}),
		new CleanWebpackPlugin(),
		new ExtractTextPlugin('./css/[name][hash].min.css'),
	]
};
const htmlArray =['index', 'submit'] ; //打包的html 
//html循环打包
htmlArray.forEach((element) => {
	const chunksArray = [element];
	var newPlugin = setHtml(element, chunksArray)
	module.exports.plugins.push(newPlugin);
});
//判断是否打开分析页面
const report=process.env.npm_lifecycle_event==="report";
if(report){
	module.exports.plugins.push(new BundleAnalyzerPlugin());
}
