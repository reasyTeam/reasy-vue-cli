const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const src = path.resolve(process.cwd(), 'src');
const dist = path.resolve(process.cwd(), 'dist');
const evn = process.env.NODE_ENV == "production" ? "production" : "development";

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {

    mode: evn,

    entry: {
        'app': path.resolve(src, 'js', 'main.js')
    },

    output: {
        path: dist,
        filename: '[name].js'
    },

    module: {
        rules: [{ // NOTE: You also need to install eslint from npm, if you haven't already:
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
        }, {
            test: /\.html$/,
            use: 'happypack/loader?id=html',
            include: 'src',
            exclude: '' // 对于静态文件不进行转换
        },
        { test: /\.js$/, use: 'happypack/loader?id=js', include: 'src', exclude: '' },
        { test: /\.css$/, use: 'happypack/loader?id=css', include: 'src', exclude: '' },
        { test: /\.scss$/, use: 'happypack/loader?id=scss', include: 'src', exclude: '' }
        ]
    },

    resolve: {
        alias: {
            // 常用组件路径map
            jquery: path.resolve(src, "components", "jquery")
        },
        extensions: ['.js']
    },

    plugins: [
        new CleanWebpackPlugin(),
        // dllPlugin关联配置
        new webpack.DllReferencePlugin({
            context: process.cwd(), // 跟dll.config里面DllPlugin的context一致
            manifest: require(path.join(src, 'js', "dll", "vendor-manifest.json"))
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(), // 跟dll.config里面DllPlugin的context一致
            manifest: require(path.join(src, 'js', "dll", "vue-manifest.json"))
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
                loader: 'style-loader' //生成的css插入到html
            }, {
                loader: 'css-loader' //使js中能加载css
            }, {
                loader: 'postcss-loader' //添加兼容性前缀
            }],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "scss",
            loaders: [{
                loader: "style-loader" // creates style nodes from JS strings 
            }, {
                loader: "css-loader" // translates CSS into CommonJS 
            }, {
                loader: "fast-sass-loader" // compiles Sass to CSS 
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