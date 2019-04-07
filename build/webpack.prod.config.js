/*eslint-disable*/
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
                    output: {
                        comments: false,
                    },
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ] : []
    },
    plugins: [
        // new UglifyJsPlugin({
        //     cache: 'node_modules/.cache_UglifyJsPlugin/',
        //     parallel: 4,
        //     chunkFilter: (chunk) => {
        //         // Exclude uglification for the `vendor` chunk
        //         if (chunk.name === 'components') {
        //             return true;
        //         }

        //         return false;
        //     }
        // }),
        new CleanWebpackPlugin()
    ]
});