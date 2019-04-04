/**
 * @desc 静态公共资源打包配置
 * 如果dll之间没有import重复的资源可以使用该配置文件生成dll
 */

'use strict'

const path = require('path')
const webpack = require('webpack')

const src = path.resolve(process.cwd(), 'src'); // 源码目录
const evn = process.env.NODE_ENV == "production" ? "production" : "development";

module.exports = {
    mode: evn,

    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        vue: ['vue', 'vue-router'],
        vendor: ['@reasy-team/reasy-ui-vue']
        // polyfill: ['@babel/polyfill']
    },

    output: {
        path: path.join(src, 'js', 'dll'),
        filename: '[name].dll.js'
        // library: '[name]_[hash]',
        // libraryTarget: 'this'
    },

    plugins: [
        new webpack.DllPlugin({
            // 定义程序中打包公共文件的入口文件vendor.js
            context: process.cwd(),

            // manifest.json文件的输出位置
            path: path.join(src, 'js', 'dll', '[name]-manifest.json'),

            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]'
        })
    ]
}