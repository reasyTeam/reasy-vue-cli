import { valid } from "@/libs/validate.js";
function checkSubmit(dataObj) {
    var errorMsg = "",
        checkFail = false;
    for (var prop in dataObj) {
        if (typeof dataObj[prop] != "object" || !isDefined(dataObj[prop].val)) {
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

function isDefined(val) {
    return val !== undefined && val !== null;
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
            dataKey.error = _("This field is required");
            return false;
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
        } else { //不存在数据验证时，直接返回
            isDefined(dataKey.error) && (dataKey.error = '');
            return true;
        }
    }

    dataKey.valid && dataKey.valid.forEach(function(item){
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



export {
    checkSubmit,
    checkData
    
};