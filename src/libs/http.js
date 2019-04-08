import { request } from 'https';

const axios = require('axios');
const GO_TO = {
    quickset: 1,
    login: 2
}
let $http = {};

$http.getData = function(data, url, method = 'post', responseType = 'json') {
    return request(data, url, method, responseType);
}

$http.setData = function(data, url, method = 'post', responseType = 'json') {
    return request(data, url, method, responseType)
}

$http.setJson = function(data, url, method = 'post', responseType = 'json') {
    data = JSON.stringify(data);
    return request(data, url, method, responseType)
}

// 跨域请求
// CORS跨域content-type只能为text/plain, multipart/form-data, application/x-www-form-urlencoded中的一个，否则就是非简单请求
$http.getDataCros = function() {

}

function request(data, url, method = 'post', responseType = 'json') {
    let option = {
        method,
        url,
        responseType
    };

    if (method.toLocaleLowerCase() === 'get') {
        option.params = data;
    } else {
        option.data = data;
    }

    return axios(option).then(data => {
        let goto = _handleResult(data);

        switch (goto) {
            case GO_TO.quickset:
                // 跳转到快速设置页面
                break;
            case GO_TO.login:
                // 跳转到登录页
                break;
            default:
                if (responseType === 'json') {
                    data = JSON.parse(data);
                }
                return data;
        }
    }).catch(err => {
        return -1;
    });
}

/**
 * 验证账户信息是否超时
 * 如果通过其他方式验证，可以修改该方法
 */
function _handleResult(data) {
    if (data.indexOf("login.js") > 0) {
        return GO_TO.login;
    }
    if (data.indexOf("quickset.js") > 0) {
        return GO_TO.quickset;
    }
}

export default $http;