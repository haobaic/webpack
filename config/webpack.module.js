const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
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
					publicPath: "../" //背景图路径
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({ //分离less编译后的css文件
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader'],
					publicPath: "../"//背景图路径
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
	}
}