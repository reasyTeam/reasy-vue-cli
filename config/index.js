const path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, '../src/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/dist/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        port: 8088,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [], //代理路径
        proxypath: 'http://192.168.99.123:3010/mock/32',
        cssSourceMap: false
    },
    assetsRoot: path.resolve(__dirname, '../src'),
    dllRoot: path.resolve(__dirname, '../src/js/dll')
}