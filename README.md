
## 简介

   webpack封装的一个多页面打包工具 

##打开项目
   
    npm install   下载相关依赖
	
##启动项目

    npm run dev  启动
	
##手机上运行查看

    npm run serve  需要在package.json里面把host的数字替换成自己的电脑ip

##目录结构
	config webpack.config.js一些封装配置
	src 文件目录
	  common 一些共用页面 比如:页面头部底部
	  css 页面中用到的css
	  html 页面
	  images 图片
	  js 用到的js
	    index 对应index.html
		submit 对应 submit.html
		utils 公共js的一些封装
	package.json 用到的依赖
	webpack.config.js  打包配置