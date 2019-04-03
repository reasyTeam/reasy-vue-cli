// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';

//vue http和promise
import VueResource from 'vue-resource';
Vue.use(VueResource);

import reasyUIVue from '@reasy-team/reasy-ui-vue';
Vue.use(reasyUIVue);

import '@/assets/lang/b28n.js';
import '@/libs/rem';

import Login from '@/Login.vue';

//注册全局方法
import _global from '@/global';//引用
Vue.use(_global);

//Vue.config.productionTip = false
var vm = new Vue({
    el: '#app',

    components:  {Login},
    template: '<Login/>',
    mounted() {
    }
});