/**
 * @desc 
 * 该文件为mock-mini-server的配置文件
 * 如果使用yapi忽略该文件即可
 */

module.exports = {
    /**
     * 全数据文件名称
     */
    defaultDataFile: "basicData.js",
    /**
     * 所有数据文件的根目录
     */
    baseDist: "goform",
    /**
     * 开启模拟服务器的上下文
     */
    contentBase: './dist',
    /**
     * 本地服务器端口
     */
    port: 10100,
    /**
     * 是否自动打开浏览器
     */
    openBrowser: true,
    /**
     * 中间件，拦截请求之类的操作
     */
    middleWare: null,
    /**
     * 是否是开发模式，开发模式会输出日志
     */
    dev: true,
    /**
     * Mock扩展
     */
    mockExtend: null
}