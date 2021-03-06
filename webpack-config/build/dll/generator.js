/**
 * @desc
 * webpack配置生成器
 * 解决相互依赖，重复打包问题
 */

const path = require('path')
const webpack = require('webpack')

const src = path.resolve(__dirname, '../../static'); // 源码目录

const buildConfig = require('../../config');

// 现有的vender配置
const dllVendors = require('./venders');

// generate config
const gen = function(vendors) {
    return vendors.map(function(item) {
        const base = {
            mode: 'production',

            entry: {
                [item.name]: item.plugins
            },

            output: {
                path: path.join(src, 'js'),
                filename: '[name].dll.js',
                library: '[name]_[hash:5]'
                // libraryTarget: 'this' // 将全局的指令挂载的地方
            },

            plugins: [
                new webpack.DllPlugin({
                    context: process.cwd(),
                    path: path.join(src, 'js', '[name]-manifest.json'),
                    name: '[name]_[hash:5]'
                })
            ]
        }

        if (item.ref) {
            // 在有ref的dll配置中，插入dll reference的plugin，内容是所依赖的dll包的manifest
            base.plugins.push(new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(path.join(buildConfig.dllRoot, `${item.ref}-manifest.json`))
            }))
        }

        return base
    })
}

// 根据依赖，将vender分为baseVender和refVender，先打包baseVender
const [baseVendors, refVendors] = dllVendors.reduce((config, v) => {
    config[v.ref ? 1 : 0].push(v)
    return config
}, [
    [],
    []
]);

// 生成base config
const getConfig = function() {
    return gen(baseVendors)
}

// 生成ref config
const getRefConfig = function() {
    return gen(refVendors)
}

module.exports = {
    getConfig,
    getRefConfig
}