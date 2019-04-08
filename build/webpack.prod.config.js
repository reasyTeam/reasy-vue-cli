/*eslint-disable*/

/**
 * @desc
 * webpack生产环境配置
 */

const path = require("path");
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
// const CopyWebpackPlugin = require('copy-webpack-plugin'); //将特定文件输出指定位置
const baseConfig = require("./webpack.base.config");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = require('../config');


module.exports = merge(baseConfig, {
    optimization: {
        minimizer: config.build.minify ? [
            new TerserPlugin({
                cache: 'node_modules/.cache_UglifyJsPlugin/',
                parallel: 4,
                sourceMap: config.build.sourceMap,
                terserOptions: {
                    compress: {
                        // 删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false
                    },
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ] : []
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
});