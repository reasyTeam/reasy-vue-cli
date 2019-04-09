/**
 * @desc
 * webpack开发环境配置
 */

/*eslint-disable*/
const path = require("path");
const fs = require("fs");
const config = require("../config");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const webpack = require("webpack");
const mockServer = require('mock-mini-server');

let mockConfig = require('../mockhttp.js'),
    server;
if (config.dev.serverType === 1) {
    // 修改地址，保证dev目录下面会有dist文件夹
    mockConfig.contentBase = path.join(__dirname, '../src/');
    mockConfig.port = config.dev.proxyPort
    mockConfig.openBrowser = false;
    server = mockServer.run(mockConfig);
}

// 强制使用yapi代理
let devServer = {
    hot: true,
    open: true,
    port: config.dev.port,
    proxy: {
        "/goform/**": {
            target: config.dev.serverType === 1 ? `http://127.0.0.1:${server.port}` : config.dev.proxypath,
            pathRewrite: { "^/goform": "" }
        }
    }
}

module.exports = merge(baseConfig, {
    devtool: '#eval-source-map',
    devServer
});