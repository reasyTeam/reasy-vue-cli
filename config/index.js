/**
 * @desc
 * webpack开发和生产环境的配置文件
 */

const path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, '../index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '',
        minify: true,
        sourceMap: true
    },
    dev: {
        port: 10000,
        proxyPort: 10101,
        assetsRoot: path.resolve(__dirname, '../distcache'),
        assetsPublicPath: '',
        proxypath: '',
        serverType: 1, // 添加服务器类型 1: mock-mini-server, 2: yapi
        sourceMap: true
    },
    assetsPublicPath: '',
    assetsRoot: path.resolve(__dirname, '../src'),
    dllRoot: path.resolve(__dirname, '../static/js')
}