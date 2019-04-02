<template>
    <div class="button-item" v-if="show !== false">
        <button class="btn" :class="css" @click.stop="clickCallBack()">{{title}}</button>
    </div>
</template>

<script>


export default {
    name: "v-button",
    props: ["title", "css", "callback", "show"],
    created() {

    },
    data() {
        return {

        };
    },
    methods: {
        clickCallBack() {
            if(typeof this.callback == "function") {
               this.callback();
            }
        }
    }

};
</script>

<style lang="scss">
    .button-item {
        display: inline-block;
        & + .button-item {
            margin-left: 20px;
        }
    }
</style>