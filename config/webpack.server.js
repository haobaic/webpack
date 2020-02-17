module.exports = {
	devServer:{
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
	}
}