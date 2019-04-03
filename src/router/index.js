import Vue from 'vue';
import Router from 'vue-router';
import '@/assets/lang/b28n.js';

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'js/login1');
const status = r => require.ensure([], () => r(require('@/pages/status/status/status')), 'js/status');
const index = r => require.ensure([], () => r(require('@/pages/index_new')), 'js/index');
const menu = r => require.ensure([], () => r(require('@/pages/menu')), 'js/menu');
const change = r => require.ensure([], () => r(require('@/pages/change/change')), 'js/change');

//************一级菜单和二级菜单的component 必须为 menu

export default new Router({
    //mode: "history", 需后端支持
    routes: [{
            path: "/",
            component: index,
            children: [{
                path: "status",
                component: menu,
                title: "系统状态",
                children: [{
                    path: "system",
                    title: "WAN 状态",
                    component: menu,
                    children: [{
                        path: "wireless",
                        title: "wireless status 接入",
                        component: status
                    }, {
                        path: "internet",
                        title: "xxxxWAN 接入",
                        component: login
                    },{
                        path: "xxx",
                        title: "隐藏",
                        hide: true,
                        component: status
                    }]
                }, {
                    path: "wireless",
                    title: "LAN 状态",
                    component: login
                }]
            }, {
                path: "/wan",
                component: menu,
                title: "WAN设置",
                children: [{
                    path: "internet",
                    title: "WAN 接入",
                    component: menu,
                    children: [{
                        path: "internet",
                        title: _("Login"),
                        component: login
                    }, {
                        path: "wireless",
                        title: "wire123less status 接入",
                        component: status
                    }]
                }, {
                    path: "status",
                    title: "W 状态",
                    component: status
                }]
            },{
                path: "/change",
                component: menu,
                title: "切换",
                children: [{
                    path: "internet",
                    title: "替换",
                    component: change,
                    
                }]
            }]
        },
        
    ]


});