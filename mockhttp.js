module.exports = {
	/**
	 * 全数据文件名称
	 */
	defaultDataFile: "basicData.js",
	/**
	 * 所有数据文件的根目录
	 */
	baseDist: "goform",
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
	 * Mock扩展
	 */
	mockExtend: null
}