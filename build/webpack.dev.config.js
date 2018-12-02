/*eslint-disable*/
const path = require("path");
const fs = require("fs");
const userConfig = require("../config/user.config");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const webpack = require("webpack");
const MockServer = require("../tools/server/MockServer");

let devServer;
switch (userConfig.mock.type) {
    case "yapi":
        { //如果是ypai  ，则使用代理
            devServer = {
                proxy: {
                    "**": {
                        target: userConfig.mock.apiPrefix
                    }
                }
            }
        }
        break;
    case "local":
        { //如果是本地调试，则用mockServer来接管webpack的dev server
            let mockServer = new MockServer();
            devServer = {
                before: mockServer.before
            }
        }
        break;
    default:
        {
            throw new Error("非法的mock.type配置");
        }
};

module.exports = merge(baseConfig, {
    devtool: '#source-map',
    devServer,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
});