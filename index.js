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
    .command('*')
    .action((baseDir) => {
        cwd = path.join(cwd, baseDir);
        init();
    });

function init() {
    log(`reasy-vue-cli v${version}`);
    log(`在目录[${cwd}]下初始化项目`);
    // 添加命令行交互，处理指令
    generateProject();
}

function generateProject() {
    //首先将webpack配置移植过去
    // fo.copyDirSync(path.join(__dirname, "./webpack-config"), cwd, /(node_modules|static|dist)$/ig);
    fo.copyDirSync(path.join(__dirname, "./test"), cwd);

    //开始安装依赖   
    install();
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
            .then(res => installDependencies(res))
            .then(() => {
                console.log("现在可以运行如下指令:");
                console.log("调试环境: npm run dev");
                console.log("编译dll: npm run dll");
                console.log("生产环境: npm run build");
                resolve();
            })
            .catch(error => {
                log(error);
            });
    });
}


/**
 * 安装全部依赖
 */
function installDependencies(type) {
    return new Promise((resolve, reject) => {
        try {
            log(`正在安装CLI plugins. 这可能需要一点时间...`);
            let cmd = `${type === 1 ? 'cnpm' : 'npm'} i`;
            child_process.execSync(cmd, { cwd });
            log("安装成功");
            resolve();
        } catch (e) {
            reject(new Error(`执行${type === 1 ? 'cnpm' : 'npm'} install时发生错误，请尝试手动安装`));
        }
    });
}

program.parse(args);
