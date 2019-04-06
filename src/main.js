// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import '@/css/styles.css';


import Vue from 'vue';
import App from '@/App';

import router from '@/router';

//vue http和promise
// import VueResource from 'vue-resource';
// Vue.use(VueResource);

import ReasyUIVue from '@reasy-team/reasy-ui-vue';
Vue.use(ReasyUIVue);

import '@/assets/lang/b28n.js';
import '@/libs/rem';

//全局守卫
router.beforeEach((to, from, next) => {
    next();
});

//注册全局方法
import _global from './global'; //引用
Vue.use(_global);

//Vue.config.productionTip = false
var vm = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    mounted() {


    }
});