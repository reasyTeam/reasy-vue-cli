import Vue from 'vue';
import VueRouter from 'vue-router';
import '@/assets/lang/b28n.js';

Vue.use(VueRouter);

const login = () => import('@/pages/login');
const quickset = () => import('@/pages/quickset');
const index = () => import('@/pages/index');

// 多个组件合并成一个包
// const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
// const Bar = () => import( /* webpackChunkName: "group-foo" */ './Bar.vue')

const routes = [
    { path: '/', redirect: 'index' },
    { path: '/login', name: 'login', component: login },
    { path: '/quickset', name: 'quickset', component: quickset },
    { path: '/index', name: 'index', component: index, children: [] },
    // 未匹配到的路由全部重定向到index，如果项目提供404页面，可以修改为重定向到404
    { path: '*', redirect: 'index' }
]

const router = new VueRouter({
    routes
})

export default router;