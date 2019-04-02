<template>
    <div class="form-el-content" v-show="dataKey.show" :class="{'error-group': dataKey.error}">
        <template v-if="groups">
            <template v-for="(item, index) in dataKey.sortArray">
                <input
                    type="checkbox"
                    ref="v-checkbox"
                    :value="item.value"
                    v-show="false"
                    :checked="getChecked(item.value, index)"
                    :key="item.key"
                >
                <label
                    class="form-checkbox"
                    :class="{'disabled': item.disabled}"
                    @click.stop="changeCheckbox(index)"
                    :data-index="index"
                    :key="item.key"
                >
                    <span
                        class="checkbox-item"
                        :class="getChecked(item.value, index) ? 'icon-checkbox-checked' : 'icon-checkbox-unchecked'"
                    ></span>
                    <span class="checkbox-text">{{item.title}}</span>
                </label>
            </template>
        </template>
        <template v-else>
            <label class="form-checkbox" @click.stop="changeCheckbox()">
                <input
                    type="checkbox"
                    class="none"
                    ref="v-checkbox"
                    v-show="false"
                    :checked="getChecked()"
                >
                <span
                    class="checkbox-item"
                    :class="getChecked() ? 'icon-checkbox-checked' : 'icon-checkbox-unchecked'"
                ></span>
                <span class="checkbox-text">{{dataKey.title}}</span>
            </label>
        </template>
        <div class="error-bottom text-error" v-if="dataKey.error">{{dataKey.error}}</div>
    </div>
</template>

<script>
let defaults = {
    required: true,
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    val: "", //组件id
    values: [true, false], //选中和不选中 默认用options的数据
    error: "",
    sortArray: [/*{
        title: "",
        value: "",
        disabled: ""
    }*/],
    options: {
        //[value]: [title]
    },
    title: "", //
    changeCallBack: function() {}
};

export default {
    name: "v-checkbox",
    props: ["dataKey"],
    created() {
        this.dataKey = this.setOptions(this.dataKey, defaults);

        //sortArray为空时，默认以dataKey.options 对象属性排序
        if (this.dataKey.sortArray.length === 0) {
            for (let prop in this.dataKey.options) {
                this.dataKey.sortArray.push({
                    title: this.dataKey.options[prop],
                    value: prop
                });
            }
        }

        if (this.dataKey.sortArray.length <= 1) {
            this.groups = false;
        } else {
            this.groups = true;
        }
    },
    data() {
        return {
            groups: false
        };
    },
    methods: {
        changeCheckbox(index) {
            var valArr = [],
                _this = this;

            if (!this.groups) {
                this.$refs["v-checkbox"].checked = !this.$refs["v-checkbox"]
                    .checked;
                this.dataKey.val = this.$refs["v-checkbox"].checked
                    ? this.dataKey.values[0]
                    : this.dataKey.values[1];
            } else {
                this.$refs["v-checkbox"][index].checked = !this.$refs[
                    "v-checkbox"
                ][index].checked;
                this.$refs["v-checkbox"].forEach(function(item) {
                    if (item.checked) {
                        valArr.push(item.value);
                    }
                });
                this.dataKey.val = valArr;
                this.checkData(this.dataKey, valArr);
            }
        },
        getChecked(value, index) {
            if (!this.groups) {
                if (this.dataKey.val === this.dataKey.values[0]) {
                    return true;
                }
                return false;
            }

            if (!Array.isArray(this.dataKey.val)) {
                return false;
            }

            return this.dataKey.val.indexOf(value) !== -1;
        }
    },
    watch: {
        "dataKey.val": {
            handler(newValue, oldValue) {
                this.dataKey.changeCallBack &&
                    this.dataKey.changeCallBack(newValue);
            }
            //立即执行
           // immediate: true
        }
    }
};
</script>

<style lang="scss">
.form-checkbox {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    .checkbox-item {
        vertical-align: middle;
        margin-right: 4px;
        font-size: 18px;
        color: $main-active-color;
    }
    .checkbox-text {
        display: inline-block;
        vertical-align: middle;
    }
}
</style>