import Vue from 'vue';
import VueRouter from 'vue-router';
import '@/assets/lang/b28n.js';

Vue.use(VueRouter);

// 中间的注释【webpackChunkName: "login"】为按需加载打包后的chunkfilename
// 如果不配置，默认以id进行命名
const login = () => import( /* webpackChunkName: "login" */ '@/pages/login');
const quickset = () => import( /* webpackChunkName: "quickset" */ '@/pages/quickset');
const index = () => import( /* webpackChunkName: "index" */ '@/pages/index');
const sysInfo = () => import( /* webpackChunkName: "sysInfo" */ '@/pages/modules/sysInfo');
const wanSet = () => import( /* webpackChunkName: "wanSet" */ '@/pages/modules/wanSet');
const wirelessAccess = () => import( /* webpackChunkName: "wirelessAccess" */ '@/pages/modules/wireless/wirelessAccess');
const wirelessName = () => import( /* webpackChunkName: "wirelessName" */ '@/pages/modules/wireless/wirelessName');

const routes = [
    { path: '/login', name: 'login', component: login },
    { path: '/quickset', name: 'quickset', component: quickset },
    {
        path: '/',
        name: 'index',
        component: index,
        children: [
            { path: '', redirect: 'sysinfo' },
            { path: 'sysinfo', name: 'sysinfo', component: sysInfo },
            { path: 'wanset', component: wanSet },
            { path: 'wirelessAccess', component: wirelessAccess },
            { path: 'wirelessName', component: wirelessName }
        ]
    },
    // 未匹配到的路由全部重定向到index，如果项目提供404页面，可以修改为重定向到404
    { path: '*', redirect: 'index' }
];

const router = new VueRouter({
    routes
});

export default router;