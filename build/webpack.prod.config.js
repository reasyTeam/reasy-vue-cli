/*eslint-disable*/
const path = require("path");
const webpack = require('webpack');
const uglifyJs = require("uglifyjs-webpack-plugin");
const cleanDist = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require('copy-webpack-plugin'); //将特定文件输出指定位置
const baseConfig = require("./webpack.base.config");


module.exports = merge(baseConfig, {
    plugins: [
        // 使用uglifyjs 来处理 default catch等关键字IE8下报错的问题
        new uglifyJs({
            cache: 'node_modules/.cache_uglify/',
            parallel: 4,
            uglifyOptions: {
                ie8: true
            }
        }),
        new cleanDist(["dist/*"], {
            root: path.join(__dirname, "../"),
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin([{ //reference from：https://www.npmjs.com/package/copy-webpack-plugin
            from: './src/**/*.mock.js',
            to: './__mock',
            flatten: true
        }])
    ]
});