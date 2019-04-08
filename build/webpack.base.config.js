/**
 * @desc
 * webpack基础配置
 */

const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require('../config');

const env = process.env.NODE_ENV == "production" ? "production" : "development";
const devMode = env === "development";

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: env,

    entry: {
        app: './src/main.js'
    },

    output: {
        filename: '[name].js?[hash:5]',
        path: devMode ? config.dev.assetsRoot : config.build.assetsRoot,
        publicPath: devMode ? config.dev.assetsPublicPath : config.build.assetsPublicPath,
        // 按需加载配置
        chunkFilename: 'pages/[name].js?[hash:5]'
    },
    resolve: {
        extensions: ['.vue', '.js'], // 引用对应的文件可以省略后缀名
        alias: {
            'vue': 'vue/dist/vue.min.js',
            '@': path.resolve('src')
        }
    },

    module: {
        rules: [
            // { // NOTE: You also need to install eslint from npm, if you haven't already:
            //     enforce: "pre",
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            // }, 
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: config.projectRoot
                // exclude: '' // 对于静态文件不进行转换
            }, {
                test: /\.css$/,
                use: [
                    devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                use: [
                    devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            // sourceMap: true,
                            resources: require.resolve('../src/css/vars.scss')
                        }
                    }
                ],
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'img:data-src', 'audio:src'],
                    removeAttributeQuotes: false,
                    minimize: true
                },
                include: config.projectRoot,
                // exclude: ''
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        "cacheDirectory": "./node_modules/.cache_babel/"
                    }
                }],
                // include: config.projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|png|jpeg|bmp|webp|gif)$/, //处理css和js中的图片文件
                loader: 'url-loader',
                options: {
                    limit: 8,
                    name: 'assets/images/[name]_[hash:5].[ext]'
                },
                include: config.projectRoot //排除node_module下的所有文件
            },
            { //处理字体文件
                test: /\.(eot|woff2|woff|ttf|svg)/,
                loader: 'url-loader',
                options: {
                    name: 'assets/fonts/[name]_[hash:5].min.[ext]',
                    limit: 5000
                },
                include: config.projectRoot
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        // dllPlugin关联配置
        new webpack.DllReferencePlugin({
            context: process.cwd(), // 跟dll.config里面DllPlugin的context一致
            manifest: require(path.join(config.dllRoot, "plugin-manifest.json"))
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(path.join(config.dllRoot, "vue-manifest.json"))
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(path.join(config.dllRoot, "lib-manifest.json"))
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'style.css' : 'style.[hash:8].css'
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            // 文件路徑
            template: config.build.index,
            filename: 'index.html',
            inject: 'body',
            // 需要加載的js，對應entries屬性名
            chunks: ['app']
        }),
        new CopyPlugin([{
            from: 'static/js/*.js',
            to: 'dll/',
            flatten: true
        }, {
            from: 'src/assets/goform/',
            to: 'goform/',
            flatten: true
        }, {
            context: 'src/assets/lang',
            from: '**/*.json',
            to: 'lang/',
            flatten: false
        }])
    ]
}