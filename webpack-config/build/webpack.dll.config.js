/**
 * @desc 如果dll之间存在重复的import引用，需要使用这种方式进去提出重复打包项
 * 将打包配置分为两个配置进行，先打包基础的dll，再打包依赖基础dll的dll
 */


const webpack = require('webpack');
const generator = require('./dll/generator')

// 因为ref config依赖于base config，所以要保证base config先打包出来
const runWebpack = function(config) {
    return new Promise(function(resolve) {
        webpack(config, function(err, stats) {
            if (err) {
                console.error(err);
                return;
            }

            console.log(stats.toString({
                displayModules: true,
                colors: true
            }));
            // ...
            resolve()
        })
    })
}

function run() {
    runWebpack(generator.getConfig())
        .then(() => runWebpack(generator.getRefConfig()))
}

run();