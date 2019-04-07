1. 添加vue-router
2. babel
3. 添加警告，如果没有安装eslint
4. 强制使用yapi
5. 是否需要Vuex
7. 发送请求使用axios
7. 添加开发环境sourcemap
8. 添加css压缩
9. 配置不同的服务器方式： ypai/mock-server
10. app.js文件中还存在vue.js文件
11. 添加端口被占用，从新端口开启server

babel-plugin-transform-runtime不能转换所有新的api，故使用babel-polyfill

为什么使用了@babel/polyfill-useBuiltIns-usage还要安装依赖core-js@2.5.7

VUE-CLI v3.5.5
Creating project in D:
Installing CLI plugins. This might take a while...