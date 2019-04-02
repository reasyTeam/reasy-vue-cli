import Vue from 'vue';
import {
    escapeText
} from '@/libs/utils';
import Tooltip from '@/components/v-tooltip';
const TooltipBox = Vue.extend(Tooltip);
let tooltipBox = new TooltipBox(),
    msgBoxEl = tooltipBox.$mount().$el;

    document.body.appendChild(msgBoxEl);
let directiveConfig = {
    // 注册一个局部的自定义指令 v-focus
    focus: {
        // 指令的定义
        inserted: function (el) {
            // 聚焦元素
            el.focus();
        }
    },
    tooltip: {
        bind(el, binding, vnode) {
          
        },
        inserted (el, binding, vnode) {
            el.addEventListener("mouseenter", function(event) {
               
                tooltipBox.parseHtml = !!this.getAttribute("parse-html");
                tooltipBox.content = binding.value;
                tooltipBox.show = true;
                tooltipBox.left = event.pageX;
                tooltipBox.top = event.pageY - event.target.offsetHeight;
                tooltipBox.relativeWidth = event.target.offsetWidth;
                tooltipBox.relativeHeight = event.target.offsetHeight;
                //console.log("event.relatedTarget", vnode.context);
                //vnode.context[binding.expression](event);

            });
            el.addEventListener("mouseleave", function(event) {

                tooltipBox.show = false;
          
            }); 
            

        },
        updated (el) {
            console.log("update");
        }
    }
};

for (let Vname in directiveConfig) {
    Vue.directive(Vname, directiveConfig[Vname]);
}


//过滤器
Vue.filter('upperCase', function (value) {
    if (!value) return '';
    return value.toUpperCase();
});