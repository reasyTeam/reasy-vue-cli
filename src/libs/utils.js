
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



export {
    escapeText
};