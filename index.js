#!/usr/bin/env node

const program = require("commander");
const fs = require('fs');
const path = require("path");
const child_process = require("child_process");
const {
    FileOperation,
    isOffLine,
    isCnpmInstalled,
    log
} = require('./util');

let cwd = process.cwd();
let fo = new FileOperation();
const args = process.argv;
const version = require('./package').version;
program
    .version(version, '-v, --version')
    .usage('<command> [options], use order(reasy-vue-cli -h) for help information');

program
    .command("init")
    .action(init);

function init() {
    console.log(`REASY-VUE-CLI v${version}`);
    console.log(`Creating project in ${cwd}`);
    console.log(`Installing CLI plugins.This might take a while...`);
    // 添加命令行交互，处理指令
    generateProject();
}

function generateProject() {
    //首先将webpack配置移植过去
    fo.copyDirSync(path.join(__dirname, "./webpack-config"), cwd, /(node_modules|static|dist)$/ig);

    //开始安装依赖   
    install()
        .catch(e => {
            throw e;
        });
}

/**
 * 开始安装依赖
 */
function install() {
    return new Promise((resolve, reject) => {
        //首先检查是否联网，通过get npm首页来判断
        isOffLine()
            // 检查cnpm是否安装  
            .then(isCnpmInstalled)
            // 使用cnpm安装   
            .then(installDependencies)
            .then(() => {
                console.log("现在可以运行如下指令:");
                console.log("调试环境: npm run dev");
                console.log("编译dll: npm run dll");
                console.log("生产环境: npm run build");
                resolve();
            })
            .catch(reject);
    });
}


/**
 * 安装全部依赖
 */
function installDependencies() {
    return new Promise((resolve, reject) => {
        try {
            log("安装依赖中...");
            child_process.execSync(`cnpm i`, { cwd });
            log("依赖安装完毕");
            resolve();
        } catch (e) {
            reject(new Error(`执行cnpm install时发生错误，请尝试手动安装`));
        }
    });
}

program.parse(args);