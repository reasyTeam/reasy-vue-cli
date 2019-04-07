const path = require('path')

module.exports = {
    build: {
        index: path.resolve(__dirname, '../index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        minify: true,
        sourceMap: true
    },
    dev: {
        port: 10000,
        proxyPort: 10101,
        proxypath: '',
        serverType: 1, // 添加服务器类型 1: mock-mini-server, 2: yapi
        suurceMap: true
    },
    assetsPublicPath: '',
    assetsRoot: path.resolve(__dirname, '../src'),
    dllRoot: path.resolve(__dirname, '../src/js/dll')
}