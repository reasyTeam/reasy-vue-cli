<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>

export default {
    name: "App",
    provide() {
        return {
            reload: this.reload
        };
    },
    mounted() {
        //TODO: 刷新跳转到首页  需要判断是登录还是设置向导
        //console.log("this.$route.path", this.$route)
        // this.$router.push('/index');
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    methods: {
        reload(url) {
            url && this.$router.push(url);
            this.isRouterAlive = false;
            this.$nextTick(() => (this.isRouterAlive = true));
        }
    }
};
</script>