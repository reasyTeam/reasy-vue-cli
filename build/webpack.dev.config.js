/*eslint-disable*/
const path = require("path");
const fs = require("fs");
const config = require("../config");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const webpack = require("webpack");
const mockConfig = require('../mockhttp.js');
const mockServer = require('mock-mini-server');
let server;
// if (config.dev.serverType === 1) {
//     // 修改地址，保证dev目录下面会有dist文件夹
//     mockConfig.contentBase = '../dist';

//     console.log(mockConfig)
//     server = mockServer.run(mockConfig);
// }

// 强制使用yapi代理
let devServer = {
    port: config.dev.port
    // proxy: {
    //     "/**": {
    //         target: config.dev.serverType === 1 ? `http:127.0.0.1:${server.port}` : config.dev.proxypath
    //     }
    // }
}

module.exports = merge(baseConfig, {
    devtool: '#eval-source-map',
    devServer
});