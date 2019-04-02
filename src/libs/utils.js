
//html转码
let escapeText = function(str) {
    let newStr = str.replace(/[<" >&]/g, function($1) {
        switch ($1) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case " ":
                return "&nbsp;";
            case "&":
                return "&amp;";
            case "\"":
            	return "&quot;";
        }
    });
    return newStr;
};

function copyData(item) {
    let newItem;
    if(Array.isArray(item)) {
        newItem = [];
        item.map(function(arr) {
            newItem.push(copyData(arr));
        });
    } else if (item instanceof Object) {
        newItem = {};
        for (let prop in item) {
            newItem[prop] =  copyData(item[prop]);
        }
    } else {
        newItem = item;
    }

    return newItem;
}

let hasCssList = (function() {
    return typeof document.body.cssList == "object";
}());



/**
 * dom元素添加类
 *
 * @returns
 */
HTMLElement.prototype.addClass = function() {
     if(hasCssList) {
        this.classList.add(arguments);
    } else {
        let classList = this.className.split(" "),
            args = arguments;
        for (let i = 0; i < args.length; i++) {
            if(classList.indexOf(args[i]) == -1) {
                classList.push(args[i]);
            }
        }
        this.className = classList.join(" ").trim();
    }
    return this;
};


/**
 * dom元素删除类
 *
 * @returns
 */
HTMLElement.prototype.removeClass = function() {
    if(hasCssList) {
       this.classList.remove(arguments);
   } else {
       let classList = this.className.split(" "),
           args = arguments,
           index;
       for (let i = 0; i < args.length; i++) {
            index = classList.indexOf(args[i]);
           if( index !== -1) {
               classList.splice(index, 1);
           }
       }
       this.className = classList.join(" ").trim();
   }
   return this;
};



/**
 * 数组排序
 *
 * @param {object} item1       数组元素对象
 * @param {object} item2       数组元素对象
 * @param {string|array} fields      排序属性
 * @param {object} sortTypeObj  排序属性的排序方式对象
 *
 * @return {numbber} 排序结果
 */
function sortByKey(item1, item2, fields, sortTypeObj) {
    var cps = [],
        i = 0,
        j = 0,
        prop,
        value1,
        value2,
        asc; //是否升序

    // asc: 升序
    // desc: 降序 默认
    if (typeof fields === "string") {
        fields = [fields];
    }

    if (fields && fields.length > 0) {
        for (i = 0; i < fields.length; i++) {
            asc = sortTypeObj[fields[i]] == "asc"; //升序
            prop = fields[i];
            if (typeof item1[prop] == "number" || typeof item2[prop] == "number") {
                value1 = item1[prop];
                value2 = item2[prop];
            } else {
                value1 = item1[prop].toString().toUpperCase();
                value2 = item2[prop].toString().toUpperCase();
            }
            if (value1 > value2) {
                cps.push(asc ? 1 : -1);
                break; // 大于时跳出循环。
            } else if (value1 === value2) {
                cps.push(0);
            } else {
                cps.push(asc ? -1 : 1);
                break; // 小于时跳出循环。
            }
        }
    }

    for (j = 0; j < cps.length; j++) {
        if (cps[j] === 1 || cps[j] === -1) {
            return cps[j];
        }
    }
    return 0;
}

export {
    escapeText,
    sortByKey,
    copyData
};