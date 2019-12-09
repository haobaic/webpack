/**
 * 用Promise简单的封装一个AJAX函数
 */
function myAjax(method, url, params) {
	return new Promise((resolve, reject) => {
		const XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function() {
			if (XHR.readyState === 4) {
				if (XHR.status === 200) {
					resolve(JSON.parse(XHR.responseText));
				} else {
					resolve(JSON.parse(XHR.status));
				}
			}
		};
		// get
		if (method === 'get' || method === 'GET') {
			if (typeof params === 'object') {
				// params拆解成字符串
				params = Object.keys(params)
					.map(function(key) {
						return (
							encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
						);
					}).join('&');
			}
			url = params ? url + '?' + params : url;
			XHR.open(method, url, true);
			XHR.send();
		}
		//post
		if (method === 'post' || method === 'POST') {
			XHR.open(method, url, true);
			XHR.setRequestHeader(
				'Content-type',
				'application/json; charset=utf-8'
			);
			XHR.send(JSON.stringify(params));
		}
	});
}
export function getJson(url, data) {
	return myAjax('GET', url, data);
}
export function postJson(url, data) {
	return myAjax('POST', url, data);
}
