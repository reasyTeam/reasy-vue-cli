import { checkSubmit, checkData } from '@/libs/common';
import { http } from '@/http';
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
    Vue.prototype.$getData = http.get;
    Vue.prototype.$post = http.post;
};