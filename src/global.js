import { checkSubmit, checkData, setOptions, formMessage } from '@/libs/common';
import { http } from "@/http/index";
import msgboxVue from '@/components/MessageBox';

export default function(Vue, options) {

    /**
     * 表单验证
     *
     * @param {object} dataObj 表单数据
     * @param {boolean} [hasPromise] 是否使用promise方式
     * @returns 
     */
    Vue.prototype.checkFormData = function(dataObj, hasPromise) {

        //配置为支持promise时
        if (hasPromise) {
            let submitFunc = new Promise((resolve, reject) => {
                let checkSuccess = checkSubmit(dataObj);
                if (checkSuccess) {
                    resolve();
                } else {
                    Vue.prototype.$message("check error");
                }
            });
            return submitFunc;
        }

        let checkSuccess = checkSubmit(dataObj);
        if (!checkSuccess) {
            Vue.prototype.$message("check error");
        }
        return checkSuccess;
    };

    Vue.prototype.checkData = checkData;
    Vue.prototype.setOptions = setOptions;


    /**
     * 显示弹出层
     *
     * @param {object | string} msgOptions
     * @returns
     */
    let msgBox;
    const MessageBoxInstance = Vue.extend(msgboxVue);

    function showDialog(msgOptions, hasCancel) {

        let defaults = {
            title: "提示",
            isShowMessageBox: false,
            parseHtml: false,
            okText: "确定",
            cancelText: "取消",
            content: "",
            resolve: '',
            reject: '',
            hasCancel: true,
            promise: '' // 保存promise对象
        };

        let currentMsg,
            msgBoxEl;
        if (!msgBox) {
            currentMsg = new MessageBoxInstance();
            msgBoxEl = currentMsg.$mount().$el;
            document.body.appendChild(msgBoxEl);
            //msgBox = currentMsg;
        } else {
            currentMsg = msgBox;
            // Vue.extend(currentMsg, defaults);
        }


        if (typeof msgOptions.content == "object" && msgOptions.content.nodeType === 1) {
            msgOptions.content = msgOptions.content.outerHTML;
            msgOptions.parseHtml = true;
        }
        if (typeof msgOptions === 'string') {
            currentMsg.content = msgOptions;
        } else if (typeof msgOptions === 'object') {
            Object.assign(currentMsg, msgOptions);
        }

        currentMsg.hasCancel = !!hasCancel;

        return currentMsg.showMsgBox()
            .then(val => {
                currentMsg = null;
                return Promise.resolve(val);
            })
            .catch(err => {
                currentMsg = null;
                return Promise.reject(err);
            });
    }

    // 定义全局点击函数
    Vue.prototype.globalClick = function(callback) {
        document.body.addEventListener("click", callback);
    };
    //提示信息
    Vue.prototype.$message = function(msg, time) {
        //let formMessage = new FormMessage();
        formMessage.setMsg(msg, time);
    };

    //请求接口
    Vue.prototype.$getData = http.get;
    Vue.prototype.$post = http.post;

    // 在Vue的原型上添加实例方法，以全局调用
    Vue.prototype.$confirm = function(msgOptions) {

        return showDialog(msgOptions, true);
    };

    Vue.prototype.$alert = function(msgOptions) {
        return showDialog(msgOptions);

    };
};