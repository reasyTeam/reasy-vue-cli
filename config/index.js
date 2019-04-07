const path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, '../index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        minify: true,
        sourceMap: true
    },
    dev: {
        port: 8088,
        proxyPort: 10101,
        assetsSubDirectory: 'static',
        assetsPublicPath: 'dist/',
        proxypath: '',
        serverType: 1, // 添加服务器类型 1: mock-mini-server, 2: yapi
        suurceMap: true
    },
    assetsRoot: path.resolve(__dirname, '../src'),
    dllRoot: path.resolve(__dirname, '../src/js/dll')
}