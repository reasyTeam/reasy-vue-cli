import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import ReasyUIVue from '@reasy-team/reasy-ui-vue';
import $http from '@/libs/http';
import '@/assets/lang/b28n.js';
import '@/css/common.scss';

// Vue插件全局注入
Vue.use(ReasyUIVue);

//全局守卫，判断当前用户的操作权限可以在此处进行
router.beforeEach((to, from, next) => {
    next();
});

// 挂载全局请求方法
Vue.prototype.$http = $http;

var vm = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});