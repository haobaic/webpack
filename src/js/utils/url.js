//判断是否是生产环境
const development=process.env.NODE_ENV=="development";
const apiUrl=development?"/api":"https://cnodejs.org/api/v1";
const topics=apiUrl+'/topics';
 export{
	 topics
 }

