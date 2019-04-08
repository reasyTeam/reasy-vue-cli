/**
 * @desc 
 * 该文件用于调试mock-mini-server插件的middleWare，即Express的中间件
 * 如果使用yapi接口，忽略该文件即可
 */

// 引用mock-mini-server
const mockServer = require('mock-mini-server');

// 启动server
mockServer.run();