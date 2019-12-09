//回去当前路径
export function  getUrlVars(){  
    var vars = [], hash;  
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
    for(var i = 0; i < hashes.length; i++)  
    {  
        hash = hashes[i].split('=');  
        vars.push(hash[0]);  
        vars[hash[0]] = hash[1];  
    }  
    return vars;  
}  
  
export function  getUrlVar(name){  
    return getUrlVars()[name];  
}
//封装双向数据绑定
export function setProxy(data,input,box){
	//双向数据绑定
	//数据
	var data = data;
	var input =document.getElementById(input) ;
	var box =document.getElementById(box);
	// 数据劫持
	Object.defineProperty(data, 'text', {
	  // 数据变化 --> 修改视图
	  set(newVal) {
	    input.value = newVal;
	    box.innerHTML = newVal;
		data.name=newVal
	  }
	});
	// 视图更改 --> 数据变化
	input.addEventListener('keyup', function(e) {
	  data.text = e.target.value;
	});
}
