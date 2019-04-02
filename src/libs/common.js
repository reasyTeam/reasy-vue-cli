import { valid } from "@/libs/validate.js";
import { copyData} from "@/libs/utils";
function checkSubmit(dataObj) {
    var errorMsg = "",
        checkFail = false;
    for (var prop in dataObj) {
        if (typeof dataObj[prop] != "object") {
            continue;
        }
        errorMsg = checkData(dataObj[prop]);
        if (!errorMsg) {
            checkFail = true;
        }
    }

    if (checkFail) {
        return false;
    }
    return true;
}
/**
 * 检查元素的数据合法性
 * @param {object} dataKey 元素对象
 * @param {string} [value] 元素的值
 */
function checkData(dataKey, value) {
    var val = value || dataKey.val || "",
        errMsg = "",
        handleValid;

    if (dataKey.show === false
        || dataKey.ignore === true
        || dataKey.disabled === true) { //忽略验证时
        return true;
    }

    if (dataKey.required) {
        if (val === "" || val.length === 0) {
            errMsg = _("This field is required");
        }
    } else { //非必填时 为空则不验证
        if (val === "") {
            dataKey.error = '';
            return true;
        }
    }

    if (!Array.isArray(dataKey.valid)) {
        if (dataKey.valid) {
            dataKey.valid = [dataKey.valid];
        } else {
            dataKey.valid = [];
        }
    }

    !errMsg && dataKey.valid && dataKey.valid.forEach(function(item){
        handleValid = valid[item.type];
        if(typeof handleValid == "function") {
            errMsg = handleValid(val, ...item.args);
        } else if(typeof handleValid.all === "function") {
            errMsg = handleValid.all(val, ...item.args);
        }

        if(errMsg) {
            return false;
        }

    });

    //数据验证
    if (errMsg) {
        dataKey.error = errMsg;
        return false;
    }

    dataKey.error = '';
    return true;
}

let setOptions = function(data, defaluts) {

    //浅复制
    let defOpts = copyData(defaluts);
    for (var prop in defOpts) {
        if (typeof data[prop] == "undefined") {
            if(typeof this.$set == "function") {
                this.$set(data, prop, defOpts[prop]);
            } else {
                data[prop] = defOpts[prop];
            }
        }
    }
    //不允许data增加新属性
   // Object.preventExtensions(data);
    return data;
};

/**
 * 错误提示信息
 *
 * @class FormMessage
 */
class FormMessage {
    /**
     *Creates an instance of FormMessage.
     * @param {*} msg
     * @param {*} showTime
     * @memberof FormMessage
     */
    constructor() {
        this.msg = "";
        this.time = 2000;
        this.elemPool = [];
    }
    createElem() {
        let elem = document.createElement("div");
        elem.className = "form-message";
        return elem;
    }

    getMsgContent() {
        if(this.elemPool.length > 0) {
            return this.elemPool[0].cloneNode(true);
        }

        return this.createElem();
    }

    getContainer() {
        let elem = document.getElementsByClassName("message-container")[0];

        if(!elem) {
            elem = document.createElement("div");
            elem.className = "message-container";
            document.body.appendChild(elem);
        }

        return elem;
    }

    setMsg(msg, showTime) {
        let elem = this.getMsgContent(),
            containerElem = this.getContainer(),
            _this = this;
        if(typeof msg == "object" && msg.nodeType === 1) {
            msg = msg.outerHTML;
        }
        this.msg = msg;
        this.time = showTime || (2000 + msg.length * 30);

        elem.innerHTML = this.msg;
        containerElem.appendChild(elem);

        setTimeout(function() {
            _this.elemPool.push(elem);
            containerElem.removeChild(elem);
        }, this.time);
    }
}

let formMessage = new FormMessage();

export {
    checkSubmit,
    checkData,
    setOptions,
    formMessage
};