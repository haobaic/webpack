const config =  require("./index.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Htmlminify = {
	removeAttributeQuotes: true, //去除引号
	removeComments: true, //去除注释
	removeEmptyAttributes: true, //去除空属性
	collapseWhitespace: true, //去除空格
	//是否压缩html里的js（使用uglify-js进行的压缩）
	minifyJS: true,
	//从脚本和样式删除的注释 默认false
	removeCommentsFromCDATA: true,
	//删除多余的属性
	removeRedundantAttributes: true,
	//删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
	removeScriptTypeAttributes: true,
	//删除style的类型属性， type="text/css" 同上
	removeStyleLinkTypeAttributes: true,
	//使用短的文档类型，默认false
	useShortDoctype: true,
	//是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
	collapseBooleanAttributes: true,
	//是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
	minifyCSS: true
}
function setHtml(element,chunksArray){
	   return new HtmlWebpackPlugin({
	    filename: element + '.html',
	    template: './src/html/'+element + '.html',   // 获取最初的html末班
	    inject: true,//js插入的位置，true/'head'/'body'/false
	    chunks: chunksArray,
	    date: new Date(),
	    minify: Htmlminify
	  });
}
exports.setHtml=setHtml;