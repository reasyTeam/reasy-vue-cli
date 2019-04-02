import Vue from 'vue';
import Router from 'vue-router';
import '@/assets/lang/b28n.js';

Vue.use(Router);
const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'js/login');
const status = r => require.ensure([], () => r(require('@/pages/status/status/status')), 'js/status');
const index = r => require.ensure([], () => r(require('@/pages/index_new')), 'js/index');
const menu = r => require.ensure([], () => r(require('@/pages/menu')), 'js/menu');
const tplSlot = r => require.ensure([], () => r(require('@/pages/slot/slot')), 'js/slot');
const tplEvent = r => require.ensure([], () => r(require('@/pages/slot/event')), 'js/event');

//************一级菜单和二级菜单的component 必须为 menu

export default new Router({
    //mode: "history", 需后端支持
    routes: [{
            path: "/",
            component: index,
            children:[{
                path: "status",
                component: menu,
                title: "组件",
                children: [{
                    path: "system",
                    title: "组件实例",
                    component: menu,
                    children: [{
                        path: "wireless",
                        title: "表格",
                        component: status
                    }, {
                        path: "internet",
                        title: "表单",
                        component: login
                    }]
                }]
            }, {
                path: "/slot",
                title: "自定义",
                component: menu,
                children: [{
                    path: "internet",
                    title: "插槽",
                    component: tplSlot,
                }, {
                    path: "event",
                    title: "事件",
                    component: tplEvent,
                }]
            }]
        }
        
    ]


});