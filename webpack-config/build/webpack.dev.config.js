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
// mock-mini-server引用了全局的mockhttp配置，修改配置文件需谨慎
let mockConfig = require('../mockhttp.js'),
    server;

// mock-mini-server相关配置
if (config.dev.serverType === 1) {
    mockConfig.contentBase = path.join(__dirname, '../src/');
    mockConfig.port = config.dev.proxyPort;
    mockConfig.dev = false;
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