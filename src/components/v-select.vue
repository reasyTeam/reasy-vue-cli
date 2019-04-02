<template>
    <div>
        <div class="form-el-content form-select" :class="{'error-group': dataKey.error, [dataKey.css]: true}"  v-show="dataKey.show">
            <div @click.stop="showOption">
                <input
                    :readonly="dataKey.hasManual !== true"
                    type="text"
                    class="text"
                    :class="dataKey.css"
                    v-model="selectLabel"
                    :disabled="dataKey.disabled"
                    @keyup="changeValue()"
                    @blur="setKeyValue()"
                    :maxlength="dataKey.maxLength"
                    ref="input"
                >
                <div class="select-arrow" :class="dropdownShow ? 'arrow-up' : 'arrow-down'">
                    <div class="select-arrow-icon icon-arrrow-down"></div>
                </div>
            </div>
            <transition>
                <ul class="select-dropdown" v-if="dropdownShow && !dataKey.disabled">
                    <template v-for="item in dataKey.sortArray">
                        <li
                            :value="item.value"
                            :key="item.value"
                            class="select-li"
                            :class="{'active': dataKey.val == item.value, 'disabled': item.disabled}"
                            @click.stop="changeSelect(item.value, item.title)"
                        >{{item.title}}</li>
                    </template>
                    <li
                        v-if="dataKey.hasManual"
                        class="select-li"
                        @click.stop="hanlderManual()"
                    >{{dataKey.manualText}}</li>
                </ul>
            </transition>
            <div class="error-bottom text-error" v-if="dataKey.error">{{dataKey.error}}</div>
        </div>
        <span v-if="dataKey.description">{{dataKey.description}}</span>
    </div>
</template>

<script>
let defaults = {
    required: true,
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    hasManual: false, //是否支持自定义
    manualText: "自定义",
    maxLength: "",
    error: "",
    val: "", //组件id
    options: {}, //options 和sortArray 同时存在时优先以sortArray存在
    description: "", //描述
    changeCallBack: function() {}
};

let MANUAL_VALUE = "-1";

export default {
    name: "v-select",
    props: ["dataKey"],
    created() {
        this.dataKey = this.setOptions(this.dataKey, defaults);
        if (!Array.isArray(this.dataKey.sortArray)) {
            this.$set(this.dataKey, "sortArray", []);
        }

        //sortArray为空时，默认以dataKey.options 对象属性排序
        if (this.dataKey.sortArray.length === 0) {
            for (let prop in this.dataKey.options) {
                this.dataKey.sortArray.push({
                    title: this.dataKey.options[prop],
                    value: prop
                });
            }
        }
    },
    data() {
        return {
            error: "",
            dropdownShow: false,
            selectLabel: "",
            dataOption: {}
        };
    },
    mounted() {
        //定义body click事件
        this.globalClick(this.hide);
    },
    methods: {
        changeSelect(value, label) {

            this.dropdownShow = false;
            if (value === this.dataKey.val) {
                return;
            }
            this.dataKey.error = '';
            this.dataKey.val = value;
            this.selectLabel = label;
            this.dataKey.changeCallBack(value);
        },
        showOption() {
            if(!this.dataKey.disabled) {
                this.dropdownShow = !this.dropdownShow;
            }
        },
        setInputValue() {
            var newVal,
                _this = this;

            this.dataKey.sortArray.forEach(function(item) {
                //当值存在于下拉列表时
                if (_this.dataKey.val == item.value) {
                    newVal = item.title;
                }
            });

            if (!newVal) {
                newVal = this.dataKey.val;
            }
            this.selectLabel = newVal;
        },

        /**
         * 失去焦点时，修改KEY值
         */
        setKeyValue() {
            var newVal,
                _this = this;

            this.dataKey.sortArray.forEach(function(item) {
                //当显示的文字存在于下拉列表时
                if (_this.selectLabel == item.title) {
                    newVal = item.value;
                }
            });

            if (!newVal) {
                newVal = this.selectLabel;
            }

            this.dataKey.val = newVal;
        },

        changeValue() {
            this.checkData(this.dataKey, this.selectLabel);
            this.dropdownShow = false;
        },
        hanlderManual() {
            this.$refs.input.focus();
            this.hide();
            this.dataKey.changeCallBack &&
                this.dataKey.changeCallBack(MANUAL_VALUE);
        },
        hide() {
            this.dropdownShow = false;
        }
    },
    watch: {
        "dataKey.val": {
            handler(newValue, oldValue) {
                this.setInputValue();
            },
            //立即执行
            immediate: true
        }
    }
};
</script>

<style lang="scss">
.form-select {
    width: $elem-width;
    cursor: pointer;
    position: relative;
    .select-arrow {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 20px;
        text-align: center;
        transition: all 0.3s;
        .select-arrow-icon {
            height: $form-line-height;
            line-height: $form-line-height;
            font-size: 1.6rem;
        }
    }
    .arrow-up {
        transform: rotateZ(180deg);
        transition: all 0.3s;
    }
    .text {
        cursor: pointer;
        padding-right: 20px;
    }
    .select-dropdown {
        position: absolute;
        min-width: 100%;
        list-style: none;
        border: solid 1px #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        margin: 5px 0;
        z-index: 99;
        .select-li {
            padding: 6px;
            line-height: 1;
            white-space: nowrap;
            &:hover {
                background: #ddd;
            }
        }
    }
}
</style>