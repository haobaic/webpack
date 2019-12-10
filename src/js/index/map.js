export function LoadBaiduMapScript() {
    console.log("初始化百度地图脚本...");
    const AK = "自己的百度地图ak";
    const BMap_URL = "http://api.map.baidu.com/api?v=2.0&ak="+ AK +"&s=1&callback=onBMapCallback";
    return new Promise((resolve, reject) => {
        // 如果已加载直接返回
        if(typeof BMap !== "undefined") {
            resolve(BMap);
            return true;
        }
        // 百度地图异步加载回调处理
        window.onBMapCallback = function () {
            console.log("百度地图脚本初始化成功...");
			var map = new BMap.Map("container");
			/* 创建地图实例   */
			var point = new BMap.Point(116.295691, 40.052094);
			/* 创建点坐标 */
			map.centerAndZoom(point, 15);
			/* 创建标注 */
			var marker = new BMap.Marker(point);
			/* 将标注添加到地图中*/
			map.addOverlay(marker);
			/*  初始化地图，设置中心点坐标和地图级别 */
			map.enableScrollWheelZoom(true); /* //开启鼠标滚轮缩放 */
            resolve(BMap);
        };
        // 插入script脚本
        let scriptNode = document.createElement("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("src", BMap_URL);
        document.body.appendChild(scriptNode);
    });
};