import Vue from 'vue';
//环境变量控制请求接口
var baseUrl = PROXY_HTTP_HOST || "";

class Http {
	get(url, callback) {
		if (url.indexOf("/") != 0) {
			url = "/" + url;
		}
		Vue.http({
			url: baseUrl + url,
			method: "GET",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			timeout: 60000
		}).then(function (res) {
			callback(res.data);

		}, function (res) {});
	}
	post(url, data, callback) {
		if (url.indexOf("/") != 0) {
			url = "/" + url;
		}
		Vue.http({
			url: baseUrl + url,
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
			timeout: 60000,
			body: data,
			//emulateJSON: true  是否为application/x-www-form-urlencoded
		}).then(function (res) {
			callback(res.data);

		}, function (res) {});
	}
}

let http = new Http();
export {
	http
};