import 'jsUti/utils/babel.js';
import 'cssUti/submit.css';
/* 验证码 */
var codename = "获取短信验证码"
var disabled = true
$('.code').text(codename)

$('.code').on('click', function() {
	if (!disabled) return;
	var phone = $('.phone').val();
	var _this = this;
	var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
	if (phone == "") {
		alert("手机号码不正确")
		return false;
	} else if (!myreg.test(phone)) {
		alert("请输入正确的手机号")
		return false;
	} else {
		// 提交ajax;
		var url = 'http:xxxxx';
		var parms = {
			"phone": phone
		}
		$.post(url, parms, function(res) {
			cosnole.log(res)
			var num = 121;
			var timer = setInterval(function() {
				num--;
				if (num <= 0) {
					clearInterval(timer);
					$('.code').text('重新发送')
					disabled = true;
				} else {
					$('.code').text(num + "s");
					disabled = false;
				}
			}, 1000)
		})

	}
});
/* 提交点击 */
$('.button').on('click', function() {
	var that = this
	if ($('.myname').val() == '') {
		alert('请输入您的姓名')
		return false;
	} else if ($('.WeChat').val() == '') {
		alert('请输入您的微信号')
		return false;
	} else if ($('.company').val() == '') {
		alert('请输入公司/组织')
		return false;
	} else if ($('.position').val() == '') {
		alert('请输入您的职务')
		return false;
	} else if ($('.phone').val() == '') {
		alert('请输入您的手机号')
		return false;
	} else if ($('.phone').val() && !(/^1[3456789]\d{9}$/.test($('.phone').val()))) {
		alert('请输入正确的手机号')
		return false;
	} else if ($('.mycode').val() == '') {
		alert('请输入验证码')
		return false;
	}
	var url = 'http:xxxxx';
	var parms = {
		name: $('.myname').val(),
		phone: $('.phone').val(),
		weixin: $('.WeChat').val(),
		vocation: $('.position').val(),
		company: $('.company').val(),
		code: $('.mycode').val(),
	};
	$.post(url, parms, function(i) {
		var res = JSON.parse(i);
		alert(res.msg)
		$('.myname').val('')
		$('.phone').val('')
		$('.WeChat').val('')
		$('.position').val('')
		$('.company').val('')
		$('.mycode').val('')
		window.location.reload()
	})
})
