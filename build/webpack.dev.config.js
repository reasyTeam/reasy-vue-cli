/*eslint-disable*/
const path = require("path");
const fs = require("fs");
const config = require("../config");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const webpack = require("webpack");

// 强制使用yapi代理
let devServer = {
    port: config.dev.port,
    proxy: {
        "**": {
            target: port.dev.proxypath
        }
    }
}

module.exports = merge(baseConfig, {
    devtool: '#eval-source-map',
    devServer
});