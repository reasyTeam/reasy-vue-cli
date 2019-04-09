/**
 * @desc
 * webpack开发和生产环境的配置文件
 */

const path = require('path')

module.exports = {
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '',
        minify: true,
        sourceMap: true
    },
    dev: {
        port: 10000,
        proxyPort: 10100,
        assetsRoot: path.resolve(__dirname, '../distcache'),
        assetsPublicPath: '',
        proxypath: '',
        serverType: 1, // 服务器类型 1: mock-mini-server, 2: yapi
        sourceMap: true
    },
    index: path.resolve(__dirname, '../index.ejs'),
    assetsPublicPath: '',
    assetsRoot: path.resolve(__dirname, '../src'),
    dllRoot: path.resolve(__dirname, '../static/js')
}