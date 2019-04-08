# Reasy-vue-cli
`reasy team`基于vue的脚手架

集成以下功能配置：
- b28翻译机制
- 本地假数据服务器[yapi]()/[mock-mini-server](https://github.com/moshang-xc/mock-mini-server)
- vue-router
- 封装axios，并挂载在Vue.$http上

## 目录结构
```
├── compiler # 编译相关，template转ast转render函数
├── core # 核心代码
    ├── components # keep-alive组建
    ├── global-api # 挂载在Vue构造函数上的API
    ├── instance # Vue实例相关，主要的初始化，生命周期相关等和入口文件
        ├── index.js # Vue构造函数在此定义
    ├── observer # 观察者模式，响应式原理实现在这
    ├── util # 工具函数
    ├── vdom # 虚拟dom，核心patch，diff算法
├── platforms # 不同平台的支持
    ├──web
        ├── entry-runtime-with-compiler.js # runtime入口，包括了vue template的解析，源码分析从这个文件开始 
├── server # 服务端渲染
├── sfc # .vue 文件解析
├── shared # 共享代码
```