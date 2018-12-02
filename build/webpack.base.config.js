const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const src = path.resolve(process.cwd(), 'src');
const dist = path.resolve(process.cwd(), 'dist');
const evn = process.env.NODE_ENV == "production" ? "production" : "development";

module.exports = {

    mode: evn,

    entry: {
        'app': path.resolve(src, 'js', 'main.js')
    },

    output: {
        path: dist,
        filename: '[name].js'
    },

    resolve: {
        alias: {
            // 常用组件路径map
            jquery: path.resolve(src, "components", "jquery")
        },
        extensions: ['.js']
    },

    plugins: [
        // dllPlugin关联配置
        new webpack.DllReferencePlugin({
            context: process.cwd(), // 跟dll.config里面DllPlugin的context一致
            manifest: require(path.join(src, 'js', "dll", "vendor-manifest.json"))
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(), // 跟dll.config里面DllPlugin的context一致
            manifest: require(path.join(src, 'js', "dll", "vue-manifest.json"))
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 文件路徑
            template: path.resolve(process.cwd(), 'index.html'),
            // src後面的路徑，前面不要加/ 
            filename: 'index.html',
            inject: 'body',
            // 需要加載的js，對應entries屬性名
            chunks: ['app']
        }),
        new CopyPlugin([{
            from: 'src/js/dll/*.js',
            to: 'dll/',
            flatten: true
        }])
    ]

}