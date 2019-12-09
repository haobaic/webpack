const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require("./config/index.js");
const {setHtml} = require('./config/common.js');
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
	devServer: config.setServer,
	watch: true, // 开启监听文件更改，自动刷新
	watchOptions: {
		ignored: /node_modules/, //忽略不用监听变更的目录
		aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
		poll: 1000 //每秒询问的文件变更的次数
	},
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: { //如果有这个设置则不用再添加.babelrc文件进行配置
						"babelrc": false, // 不采用.babelrc的配置
						"plugins": [
							"dynamic-import-webpack",
							"babel-plugin-transform-runtime" //async await兼容配置
						],
						presets: [
							"env", "react"
						]
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({

					fallback: "style-loader",
					use: [{
						loader: 'css-loader',
						options: {
							minimize: true
							//css压缩
						}
					}],
					publicPath: "../"
				})
			},
			{
				test: /\.(jpg|png|jpeg|gif)$/,
				use: 'file-loader?limit=1024&name=./images/[name][hash].[ext]'
			},
			{
				test: /\.(htm|html)$/i,
				use: 'html-withimg-loader'
			},
			{
				test: /\.(woff|ttf|svg|eot|xttf|woff2)$/,
				use: 'file-loader?limit=1024&name=./fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		//引入插件
		new Webpack.ProvidePlugin({
			'$': 'jquery'
		}),
		new CleanWebpackPlugin(),
		new ExtractTextPlugin('./css/[name][hash].min.css')
	]
};
const htmlArray = config.htmlArray; //打包的html 
//html循环打包
htmlArray.forEach((element) => {
	const chunksArray = [element];
	var newPlugin = setHtml(element, chunksArray)
	module.exports.plugins.push(newPlugin);
});
