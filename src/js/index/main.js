import  'jsUti/utils/babel.js';
import 'cssUti/index.css';
import 'cssUti/index.less';
import  {topics} from  'jsUti/utils/url.js';
import {setProxy} from 'jsUti/utils/common.js';
import {LoadBaiduMapScript} from './map.js';
import {getJson,postJson} from 'jsUti/utils/ajax.js'
//百度地图
LoadBaiduMapScript();
//双向数据绑定
var data={
	name:"name"
}
var data1={
	name:"a"
}
setProxy(data,'input','span');
setProxy(data1,'input1','span1')
$('#button').on('click',function(){
	console.log(data,data1)
})
//async await用法
setList ()
 async function setList (){
	  var parms={
	  	 page: 1,
	  	 tab:"all",
	  	 limit:10
	  	}
		 var res=await getJson(topics,parms);
		 console.log(res)
}	



