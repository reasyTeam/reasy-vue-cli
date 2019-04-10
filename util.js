const fs = require("fs");
const path = require("path");
const https = require("https");
const child_process = require("child_process");
const inquirer = require('inquirer');
const chalk = require('chalk')
const ora = require('ora');

class FileOperation {
    /**
     * 递归的创建文件夹
     */
    mkDir(dirPath) {
        let dirStack = dirPath.split(/(\\|\/)/),
            depth = dirStack.length,
            createdCount = 1,
            curPath = dirStack[0];

        while (createdCount < depth) {
            curPath = path.join(curPath, dirStack[createdCount]);
            !fs.existsSync(curPath) && fs.mkdirSync(curPath);
            createdCount++;
        }
    }

    /**
     * 同步方法  删除一个文件夹  -r
     * @param {*要删除的文件夹} dir 
     * @param {*callback} cb 
     */
    rmdirSync(dir, deleteSelf = true) {
        (function() {
            function iterator(url, dirs) {
                let stat = fs.statSync(url);
                if (stat.isDirectory()) {
                    dirs.unshift(url); //收集目录
                    inner(url, dirs);
                } else if (stat.isFile()) {
                    fs.unlinkSync(url); //直接删除文件
                }
            }

            function inner(path, dirs) {
                let arr = fs.readdirSync(path);
                for (let i = 0, el; el = arr[i++];) { //eslint-disable-line
                    iterator(path + "/" + el, dirs);
                }
            }
            return function(dir) {
                let dirs = [];

                try {
                    iterator(dir, dirs);
                    !deleteSelf && dirs.shift(); //如果不要删除自身，就把自己给移出来
                    for (let i = 0, el; el = dirs[i++];) { //eslint-disable-line
                        fs.rmdirSync(el); //一次性删除所有收集到的目录
                    }
                } catch (e) { //如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
                    if (e.code !== "ENOENT") {
                        throw e;
                    }
                }
            };
        })()(dir, deleteSelf);
    }

    /**
     * 将单个文件从src复制至dest
     */
    copySingleFile(src, dest, encode = null) {
        try {
            fs.writeFileSync(dest, fs.readFileSync(src, encode), encode);
        } catch (e) {
            log.error(e);
        }
    }

    /**
     * 将单个大文件从src复制至dest
     */
    copyBigSingleFile(src, dest, encode = null) {
        fs.createReadStream(src, encode).pipe(fs.createWriteStream(dest, encode));
    }

    /**
     * 将整个文件夹复制至目标路径
     */
    copyDirSync(src, dest, exclude) {
        let dirs = [], //收集src下所有目录
            files = [],
            i; //收集src下所有文件

        try {
            iterator(src, dirs, files); //递归获取目录和文件

            dirs.shift();
            for (i = 0; i < dirs.length; i++) {
                let subfix = dirs[i].split(src).pop(),
                    destDir = path.join(dest, subfix);

                try {
                    !fs.existsSync(destDir) && fs.mkdirSync(destDir);
                } catch (e) {
                    log.error(e)
                }
            }

            for (i = 0; i < files.length; i++) {
                let subfix = files[i].split(src).pop();
                this.copySingleFile(files[i], path.join(dest, subfix));
            }

        } catch (e) { //如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            if (e.code !== "ENOENT") {
                throw e;
            }
        }

        function iterator(url, dirs, files) {
            let stat = fs.statSync(url);
            if (stat.isDirectory()) {
                if (!(exclude && exclude.test(url))) {
                    dirs.push(url);
                    inner(url, dirs, files);
                }
            } else if (stat.isFile()) {
                if (!(exclude && exclude.test(url))) {
                    files.push(url);
                }
            }
        }

        function inner(path, dirs, files) {
            let arr = fs.readdirSync(path);
            for (let i = 0, el; el = arr[i++];) { //eslint-disable-line
                iterator(path + "\\" + el, dirs, files);
            }
        }
    }

}

/**
 * 检测是否联网
 */
function isOffLine() {
    const spinner = ora('检查网络连接状态').start();

    return new Promise((resolve, reject) => {
        https
            .get("https://www.npmjs.com", res => {
                res.on("data", () => {});
                res.on("end", () => {
                    spinner.succeed(`网络通畅`);
                    resolve();
                });
            })
            .on("error", err => {
                spinner.color = 'red';
                spinner.fail('网络异常');
                log.error('网络连接失败，无法连接至npmjs.com');
                switch (err.code) {
                    case "UNABLE_TO_VERIFY_LEAF_SIGNATURE":
                        {
                            log.tip(`兄弟，你忘记登录了。`);
                        }
                        break;
                    case "ENOTFOUND":
                        {
                            log.tip("检查一下是不是忘记插网线了");
                        }
                        break;
                    default:
                        {
                            log.error("网络错误");
                        }
                }
                reject(err);
            });
    });
}

/**
 * 检测是否按照cnpm
 */
function isCnpmInstalled() {
    const spinner = ora('检查是否已安装cnpm\n');
    spinner.start();

    return new Promise((resolve, reject) => {
        child_process.exec('cnpm -v', (error) => {
            if (error) {
                spinner.text = 'cnpm未安装,安装中,请稍等...(安装过程注意保持网络通畅)';

                child_process.exec(`npm i cnpm -g`, (error => {
                    if (error) {
                        spinner.fail('cnpm安装过程中出现错误，请手动安装后重试');

                        inquirer
                            .prompt([{
                                name: 'confirm',
                                type: 'confirm',
                                message: 'cnpm安装过程中出现错误，是否通过npm进行安装(部分依赖包可能会安装失败)？'
                            }])
                            .then(answers => {
                                if (answers.confirm) {
                                    resolve(-1);
                                } else {
                                    reject(error);
                                }
                            });
                        return;
                    }

                    spinner.succeed(`cnpm安装完毕`);
                    resolve(1);
                }));
                return;
            }

            spinner.succeed(`cnpm已经安装`);
            resolve(1);
        });
    });
}

let log = {
    normal(msg) {
        console.log(chalk.white(msg));
    },
    blue(msg) {
        console.log(chalk.green(msg));
    },
    error(msg) {
        console.log(chalk.red(msg));
    },
    tip(msg) {
        console.log(chalk.yellow(msg));
    },
    success(msg) {
        console.log(chalk.cyan(msg));
    }
}

module.exports = {
    FileOperation,
    isOffLine,
    isCnpmInstalled,
    log
}