<template>

    <div class="form-swicth form-el-content" v-show="dataKey.show">
        <span class="switch-item" @click="setCheckbox()" :class="checked ? 'checked' : ''"></span>
        <span>{{dataKey.title}}</span>
    </div>

</template>

<script>

let defaults = {
    css: "", //样式
    show: true, //是否显示
    ignore: true, //是否忽略
    disabled: false, //是否禁用
    val: "", //组件id
    values: [true, false],
    title: "", //描述
    changeCallBack: function() {}
};

export default {
    name: "v-switch",
    props: ["dataKey"],
    created() {
        this.dataKey = this.setOptions(this.dataKey, defaults);
        this.checked = this.dataKey.val === this.dataKey.values[0];
    },
    data() {
        return {
            checked: false
        };
    },
    mounted() {

    },
    methods: {
        setCheckbox() {
            if(this.disabled) {
                return;
            }
            this.checked = !this.checked;
            this.dataKey.val = this.checked ? this.dataKey.values[0] : this.dataKey.values[1];
        }
    },
    watch: {
        'dataKey.val': {
            handler(newValue, oldValue) {
                this.dataKey.changeCallBack && this.dataKey.changeCallBack(newValue);
            },
            //立即执行
            immediate: true
        }
    }
};
</script>
<style lang="scss">
    .switch-item {
        width: 52px;
        height: $form-line-height;
        position: relative;
        border: 1px solid #dfdfdf;
        background-color: #fdfdfd;
        box-shadow: #dfdfdf 0 0 0 0 inset;
        border-radius: 20px;
        background-clip: content-box;
        display: inline-block;
        user-select: none;
        cursor: pointer;
        &:focus {
            outline: 0;
        }
        &.checked {
            border-color: $main-active-color;
            box-shadow: $main-active-color 0 0 0 16px inset;
            background-color: $main-active-color;
            &:before {
                left: 21px;
            }
        }
        &:before {
            content: ' ';
            width: 29px;
            height: 29px;
            position: absolute;
            top: 0px;
            left: 0;
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
            transition: all .3s;
        }
    }
</style>