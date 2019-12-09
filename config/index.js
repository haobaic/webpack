
//域名配置
var setServer = {
	port: 8080,
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
const config = {
	htmlArray: ['index', 'submit'], //打包的html
	setServer
};
//导出该变量
module.exports = config;
