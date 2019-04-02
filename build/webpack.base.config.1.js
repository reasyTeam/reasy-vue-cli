const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');

const config = require('../config');

const evn = process.env.NODE_ENV == "production" ? "production" : "development";

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {

    mode: evn,

    entry: {
        app: './src/main.js'
    },

    output: {
        path: config.build.assetsRoot,
        publicPath: evn === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },

    module: {
        rules: [{ // NOTE: You also need to install eslint from npm, if you haven't already:
                //     enforce: "pre",
                //     test: /\.js$/,
                //     exclude: /node_modules/,
                //     loader: "eslint-loader",
                // }, {
                test: /\.vue$/,
                // loader: 'vue-loader',
                use: 'happypack/loader?id=vue',
                include: config.projectRoot
                // exclude: '' // 对于静态文件不进行转换
            }, {
                test: /\.html$/,
                use: 'happypack/loader?id=html',
                include: config.projectRoot,
                // exclude: ''
            },
            {
                test: /\.js$/,
                use: 'happypack/loader?id=js',
                // include: config.projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css',
                include: config.projectRoot
            },
            {
                test: /\.scss$/,
                use:
                    // ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader', {
                    //     loader: 'sass-resources-loader',
                    //     options: {
                    //         // Provide path to the file with resources
                    //         resources: [
                    //             path.resolve(__dirname, '../src/css/var.scss')
                    //         ],
                    //     }
                    // }],
                    [
                        "vue-style-loader",
                        //MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                // Provide path to the file with resources
                                resources: '../src/css/var.scss',
                            },
                        }
                    ],
                include: config.projectRoot
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

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js', //解决 [Vue warn]: You are using the runtime-only build of Vue
            '@': path.resolve('src'),
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components')
            // jquery: path.resolve(src, "components", "jquery")
        },
        extensions: ['.js', '.vue', '.scss', '.css']
    },

    plugins: [
        // new CleanWebpackPlugin(),
        // dllPlugin关联配置
        // new webpack.DllReferencePlugin({
        //     context: process.cwd(), // 跟dll.config里面DllPlugin的context一致
        //     manifest: require(path.join(config.dllRoot, "polyfill-manifest.json"))
        // }),
        new webpack.DllReferencePlugin({
            context: process.cwd(), // 跟dll.config里面DllPlugin的context一致
            manifest: require(path.join(config.dllRoot, "vue-manifest.json"))
        }),
        new HappyPack({
            id: 'vue',
            loaders: [{
                loader: 'vue-loader'
            }],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: 'js',
            loaders: [{
                loader: 'babel-loader',
                query: {
                    "cacheDirectory": "./node_modules/.cache_babel/"
                }
            }],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "html",
            loaders: [{
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'img:data-src', 'audio:src'],
                    minimize: true
                }
            }],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "css",
            loaders: [{
                loader: 'vue-style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "scss",
            loaders: [{
                loader: "vue-style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: 'postcss-loader'
            }, {
                loader: "sass-loader"
            }],
            threadPool: happyThreadPool
        }),
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