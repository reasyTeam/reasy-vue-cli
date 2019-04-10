#!/usr/bin/env node

const program = require("commander");
const fs = require('fs');
const ora = require('ora')
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
        if (fs.existsSync(cwd)) {
            log.tip(`错误：目标路径'${baseDir}'已经存在且不是空目录。`);
            return;
        }
        fo.mkDir(cwd);
        init();
    });

function init() {
    log.blue(`reasy-vue-cli v${version}`);
    log.blue(`在目录[${cwd}]下初始化项目`);
    // 添加命令行交互，处理指令
    generateProject();
}

function generateProject() {
    //首先将webpack配置移植过去
    fo.copyDirSync(path.join(__dirname, "./webpack-config"), cwd, /(node_modules|static|dist)$/ig);

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
                log.tip("现在可以运行如下指令:");
                log.normal("调试环境: npm run dev");
                log.normal("编译dll: npm run dll");
                log.normal("生产环境: npm run build");
                resolve();
            })
            .catch(error => {
                log.error(error);
            });
    });
}


/**
 * 安装全部依赖
 */
function installDependencies(type) {
    return new Promise((resolve, reject) => {
        const spinner = ora('正在安装依赖包. 这可能需要一点时间...').start();
        let cmd = `${type === 1 ? 'cnpm' : 'npm'} i`;
        child_process.exec(cmd, { cwd }, (error, stdout, stderr) => {
            if (error) {
                spinner.fail("依赖包安装失败\n");
                reject(new Error(`执行${type === 1 ? 'cnpm' : 'npm'} install时发生错误，请尝试手动安装`));
                return;
            }

            spinner.succeed("依赖包安装成功\n");
            resolve();
        });
    });
}

program.parse(args);

if (program.args.length === 0) {
    log.tip('指令：reasy-vue-cli -v 或 reasy-vue-cli myApp, 其中myApp为项目初始化的地址');
}