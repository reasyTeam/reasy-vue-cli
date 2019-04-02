<template>
    <div class="form-group" v-show="tableOptions.show" :class="tableOptions.css">
        <div class="table-search" v-if="tableOptions.search">
            <input
                type="text"
                placeholder
                class="text form-search-input"
                v-model="searchValue"
                @keyup.enter="goSearch()"
            >
            <span class="icon-search" @click="goSearch()"></span>
        </div>
        <table class="table table-fixed">
            <thead>
                <tr>
                    <th
                        :width="columns.width"
                        v-for="columns in tableOptions.columns"
                        :key="columns.field"
                    >
                        <span
                            :class="{'pointer': columns.sort}"
                            @click="sortTable(columns, columns.field)"
                        >
                            {{columns.title}}
                            <span
                                v-if="columns.sort"
                                :class="{'icon-unsort': sortType === '',
                                    'icon-sort-up': sortType === 'asc' && sortKey == columns.field,
                                    'icon-sort-down': sortType === 'desc' && sortKey == columns.field}"
                                class="th-sort"
                            ></span>
                        </span>
                    </th>
                    <th width="17px" v-if="tableScroll"></th>
                </tr>
            </thead>
        </table>
        <div class="table-body" :style="{'height': bodyHeight + 'px'}">
            <table class="table table-fixed" ref="table-body">
                <tbody>
                    <tr
                        ref="table-body-tr"
                        v-for="(rowsData, rowsIndex) in pageData"
                        :key="rowsData[tableOptions.key]"
                    >
                        <template v-for="(columns, index) in tableOptions.columns">
                            <td
                                v-if="!columns.componentName"
                                :style="{'width': columns.width}"
                                :key="index"
                            >
                                <div
                                    v-if="columns.parseHtml"
                                    v-html="rowsData[columns.field]"
                                    :class="columns.css"
                                    class="fixed"
                                ></div>
                                <div
                                    v-else
                                    v-tooltip="rowsData[columns.field]"
                                    style="cursor: text"
                                    :class="columns.css"
                                    class="fixed"
                                >{{rowsData[columns.field]}}</div>
                            </td>
                            <!--自定义组件-->
                            <td
                                v-if="columns.componentName"
                                :class="columns.css"
                                class="fixed"
                                :style="{'width': columns.width}"
                                :key="index"
                            >
                                <component
                                    :is="columns.componentName"
                                    @on-custom-comp="customCompFunc"
                                    :rowData="rowsData"
                                    :originData="findOriginData(rowsData[tableOptions.key])"
                                    :field="columns.field"
                                    :index="findIndex(rowsData[tableOptions.key])"
                                    :style="{'width': columns.width}"
                                ></component>
                            </td>
                        </template>
                    </tr>
                    <tr v-if="pageData.length === 0">
                        <td :colspan="tableOptions.columns.length">
                            <div class="table-no-data">没有数据</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div
            class="table-footer clearfix"
            v-if="tableOptions.showPage && tableOptions.totalPage > 1"
        >
            <div class="footer-tips">
                <span>共{{tableData.length || 0}}个，{{tableOptions.totalPage}}页，当前第{{tableOptions.page + 1}}页</span>
            </div>
            <div class="footer-page">
                <a class="table-btn" @click="gotoPage('prev')" v-show="tableOptions.page > 0">上一页</a>
                <a
                    class="table-btn"
                    :class="{'active': footerBtn.value == tableOptions.page}"
                    v-for="footerBtn in footer"
                    :key="footerBtn.value"
                    @click="gotoPage(footerBtn.value)"
                >{{footerBtn.text}}</a>
                <a
                    class="table-btn"
                    @click="gotoPage('next')"
                    v-show="tableOptions.page < (tableOptions.totalPage-1)"
                >下一页</a>
            </div>
        </div>
    </div>
</template>

<script>
import { copyData, escapeText, sortByKey } from "@/libs/utils";

const PAGE_PREV_NUM = 2; //当前页前后显示页数
const MAX_PAGE_SHOW = 2 * PAGE_PREV_NUM + 1 + 2 + 2; // 前后页 + 本身页 + 2个省略 + 首尾两页

let defaluts = {
    columns: [
        /*
        {
            title: "无线名称",
            field: "ssid",
            width: "40%",
            sort: true/false, //是否支持排序
            format:function() {return str},
            parseHtml: true/false, // 是否是html
            componentName: string //自定义组件
        }
     */
    ], //表头配置
    show: true,
    showPage: false, //分页
    maxTableRow: 10, //每页显示多少行，超过行则出现滚动条
    pagePer: 10, //每页多少数据
    totalPage: 1, //共几页
    page: 0, //当前页  从0开始
    key: "", //关键标志
    sortOpt: {}, //元素排序顺序
    sortOrder: [], //默认排序顺序
    search: false,
    searchItem: []
};

//判断是否存在
let fileterField = (searchV, content) => {
    try {
        if (content.indexOf(searchV) != -1) {
            return true;
        }
    } catch (e) {}

    return false;
};

/**
 * 表格过滤
 *
 * @param {Array} tableData 当前表格数据
 * @param {string} filterStr 查找字符串
 * @param {[string]} field   查找类型
 *
 * @return {[type]} [description]
 */
let filterTable = (tableData, filterStr, field) => {
    let newTable = [];
    tableData.forEach(function(item) {
        for (let prop in item) {
            if (field.length > 0) {
                if(field.indexOf(prop) != -1) {
                    if (fileterField(filterStr, item[field])) {
                        newTable.push(item);
                    }
                }
                
            } else {
                if (fileterField(filterStr, item[prop])) {
                    newTable.push(item);
                    break;
                }
            }
        }
    });

    return newTable;
};

export default {
    name: "v-table",
    props: ["tableOptions", "callback", "update"],
    created() {
        //数据合并
        this.tableOptions = this.setOptions(this.tableOptions, defaluts);
        if (this.tableOptions.originData) {
            return;
        }
        let _this = this;
        this.tableOptions.columns.forEach(function(item) {
            if (typeof item.format == "function") {
                _this.formatOpt[item.field] = item.format;
            }
        });
        if(!Array.isArray(this.tableOptions.searchItem)) {
            this.tableOptions.searchItem = this.tableOptions.searchItem.split(",");
        }
        //未定义时 先初始化originData
        this.$set(this.tableOptions, "originData", []);
    },

    mounted() {
        this.tabaleCallback = this.callback || function() {};
        this.getTableData();
    },

    data() {
        return {
            tableScroll: false,
            pageData: [], //当前页数据
            tableData: [], //当前表格数据 过滤后
            originData: [], //转换后的原始数据，format后的数据
            formatOpt: {},
            footer: [], //
            updateTimer: null, //定时器
            sortKey: null, // 排序元素
            sortType: "",
            searchValue: "", //搜索文字
            bodyHeight: ""
        };
    },

    methods: {
        //自定义事件
        customCompFunc(params) {
            //触发父组件的自定义事件
            this.$emit("on-custom-comp", params);
        },

        goSearch() {
            if (this.searchValue == "") {
                this.tableData = this.originData;
            } else {
                this.tableData = filterTable(this.originData, this.searchValue, this.tableOptions.searchItem);
            }

            this.sortType = "";

            this.updateTable();
        },

        updateTable() {
            //更新总页数
            if (this.tableOptions.showPage) {
                this.tableOptions.totalPage = Math.ceil(
                    this.tableData.length / this.tableOptions.pagePer
                );
                this.tableOptions.totalPage <= 1
                    ? (this.tableOptions.totalPage = 1)
                    : "";

                //更新当前页
                if (this.tableOptions.totalPage - 1 < this.tableOptions.page) {
                    this.tableOptions.page = this.tableOptions.totalPage - 1;
                }
                this.updateFooter();
            }
            this.updateScroll();
            //当前页显示的数据
            this.pageData = this.getPageData();
            //this.tableOptions.pageData = this.pageData;

            this.$nextTick(function() {
                this.tabaleCallback(); //执行表格更新的回调
            });
        },

        //更新表格的滚动条
        updateScroll() {
            //计算滚动条显示
            this.$nextTick(function() {
                if(this.$refs["table-body-tr"].length === 0) {
                    return;
                }
                let trHeight = this.$refs["table-body-tr"][0].offsetHeight;
                if (this.tableOptions.maxTableRow < this.pageData.length) {
                    this.bodyHeight = trHeight * this.tableOptions.maxTableRow;
                    this.tableScroll = true;
                } else {
                    this.tableScroll = false;
                }
            });
        },

        /**
         * 更新表格的页数，处理省略的页数
         *
         */
        updateFooter() {
            //更新表格的页操作
            this.footer = [];
            let footerArr = [];
            this.updateScroll();
            //不需要处理页数时
            if (this.tableOptions.totalPage < MAX_PAGE_SHOW) {
                for (let i = 0; i < this.tableOptions.totalPage; i++) {
                    this.footer.push({
                        text: i + 1,
                        value: i
                    });
                }
                return;
            }

            //获取当前页的前后2页
            for (let i = 0; i < this.tableOptions.totalPage; i++) {
                if (Math.abs(this.tableOptions.page - i) <= PAGE_PREV_NUM) {
                    footerArr.push({
                        text: i + 1,
                        value: i
                    });
                }
            }

            //当页数不满5页时，表明已有一方到首尾
            if (footerArr.length < PAGE_PREV_NUM * 2 + 1) {
                //当第1项是第一页
                if (footerArr[0].value === 0) {
                    //向后扩展
                    while (footerArr.length < PAGE_PREV_NUM * 2 + 1) {
                        footerArr.push({
                            text: footerArr[footerArr.length - 1].text + 1,
                            value: footerArr[footerArr.length - 1].value + 1
                        });
                    }
                } else if (
                    footerArr[footerArr.length - 1].value ===
                    this.tableOptions.totalPage - 1
                ) {
                    //向前扩展
                    while (footerArr.length < PAGE_PREV_NUM * 2 + 1) {
                        footerArr.unshift({
                            text: footerArr[0].text - 1,
                            value: footerArr[0].value - 1
                        });
                    }
                }
            }

            //如果页数小于3，则前面页数不能出现...，需要自动补全
            if (footerArr[0].value < 3) {
                while (footerArr[0].value != 0) {
                    footerArr.unshift({
                        text: footerArr[0].text - 1,
                        value: footerArr[0].value - 1
                    });
                }
            } else {
                //页数以1开头
                footerArr.unshift({
                    text: "...",
                    value: -1
                });
                footerArr.unshift({
                    text: 1,
                    value: 0
                });
            }

            //如果是后3页，自动补全 不能出现...
            if (
                this.tableOptions.totalPage -
                    1 -
                    footerArr[footerArr.length - 1].value <
                3
            ) {
                while (
                    footerArr[footerArr.length - 1].value !=
                    this.tableOptions.totalPage - 1
                ) {
                    footerArr.push({
                        text: footerArr[footerArr.length - 1].text + 1,
                        value: footerArr[footerArr.length - 1].value + 1
                    });
                }
            } else {
                //页数以最后页结束
                footerArr.push({
                    text: "...",
                    value: -1
                });
                footerArr.push({
                    text: this.tableOptions.totalPage,
                    value: this.tableOptions.totalPage - 1
                });
            }
            this.footer = footerArr;
        },

        //当前个数
        getCustonIndex(index) {
            return this.tableOptions.page * this.tableOptions.pagePer + index;
        },

        //跳转到下一页
        gotoPage(nextPage) {
            //切换页
            if (nextPage == "prev") {
                nextPage = this.tableOptions.page - 1;
            } else if (nextPage == "next") {
                nextPage = this.tableOptions.page + 1;
            }

            //当下一页超出范围 或者下一页 == 当前页时
            if (
                nextPage < 0 ||
                nextPage > this.tableOptions.totalPage - 1 ||
                nextPage == this.tableOptions.page
            ) {
                return;
            }
            //当前页
            this.tableOptions.page = nextPage;
            //当前页数据
            this.pageData = this.getPageData();
            this.updateFooter();
        },
        //获取当前页的数据
        getPageData() {
            //是否分页
            if (this.tableOptions.showPage) {
                return this.tableData.slice(
                    this.tableOptions.page * this.tableOptions.pagePer,
                    (this.tableOptions.page + 1) * this.tableOptions.pagePer
                );
            }
            return this.tableData;
        },
        reload() {
            this.getTableData();
        },

        /**
         * @description:  获取表格数据
         * @param {type} 
         * @return: 
         */
        getTableData() {
            let _this = this;
            if (_this.tableOptions.requestUrl) {
                //请求数据
                this.sortKey = _this.tableOptions.sortOrder;
                this.$getData(_this.tableOptions.requestUrl, function(res) {
                    //数据修改后  执行监听回调
                    _this.tableOptions.originData = _this.sortData(
                        res.list,
                        _this.tableOptions.sortOpt
                    );
                });
            }
        },
        //排序，以field字段排序
        sortTable(fieldOptions, field) {
            let _this = this;
            if (!fieldOptions.sort) {
                return;
            }
            //排序元素
            this.sortKey = field;

            //排序方式
            this.sortType = this.sortType == "asc" ? "desc" : "asc";

            //按照某列数据排序
            _this.tableData = _this.sortData(_this.tableData, {
                [_this.sortKey]: _this.sortType
            });
            this.updateTable();
        },

        /**
         * 排序数据
         */
        sortData(data, sortConfig) {
            let _this = this;
            data = data || [];
            return _this.sortKey
                ? data.sort(function(a, b) {
                      return sortByKey(a, b, _this.sortKey, sortConfig);
                  })
                : data;
        },

        findOriginData(value) {
            //根据key值（key必须是唯一标识） 获取原始数据
            return this.tableOptions.originData.find(
                item => item[this.tableOptions.key] == value
            );
        },

        findIndex(value) {
            //根据key值（key必须是唯一标识） 获取原始数据
            return this.tableOptions.originData.findIndex(
                item => item[this.tableOptions.key] == value
            );
        },

        /**
         * 表格数据自定义转换
         */
        formatTable() {
            //复制表格数据
            let tableArr = copyData(this.tableOptions.originData),
                len = tableArr.length,
                newTableArr = [],
                _this = this;

            for (let i = 0; i < len; i++) {
                for (let prop in _this.formatOpt) {
                    if (typeof _this.formatOpt[prop] == "function") {
                        tableArr[i][prop] = _this.formatOpt[prop](
                            tableArr[i][prop],
                            tableArr[i]
                        );
                    }
                }

                newTableArr.push(tableArr[i]);
            }
            //转换后的原始数据
            this.originData = newTableArr;
        }
    },
    watch: {
        "tableOptions.originData": {
            handler(newData, oldData) {
                let _this = this;

                //解决初次定义执行表格更新问题
                if (typeof oldData === "undefined") {
                    return;
                }
                this.formatTable();
    
                this.tableData = copyData(this.originData);

                this.updateTable();
            }
        },
        update: {
            handler(updateTime) {
                clearInterval(this.updateTimer);
                let _this = this;
                if (updateTime) {
                    this.updateTimer = setInterval(function() {
                        _this.reload();
                    }, updateTime);
                }
            },
            //立即执行
            immediate: true
        }
    },
    destroyed() {
        clearInterval(this.updateTimer);
        this.updateTimer = null;
    }
};
</script>

<style lang="scss">
.table-search {
    position: relative;
    float: right;
    //width: 200px;
    margin-bottom: 15px;
    .form-search-input {
        width: 150px;
        padding-right: 44px;
        border-radius: 6px;
    }
    .icon-search {
        position: absolute;
        right: 0;
        top: 0;
        background: $main-active-color;
        line-height: $form-line-height - 2px;
        height: $form-line-height;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        color: #fff;
        width: 40px;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
    }
}
.table-body {
    overflow-y: auto;
}
.table-group {
    width: 90%;
    margin: 15px auto;
}
.table {
    border-collapse: separate;
    border-spacing: 0;
    text-align: center;
    &.table-fixed {
        table-layout: fixed;
    }
    .pointer {
        cursor: pointer;
    }
    tr {
        line-height: $form-line-height + 2px;
        td {
            padding: 2px 4px;
        }
    }
    th,
    td {
        border-bottom: 1px solid #d7d7d7;
    }
    .th-sort {
        font-size: 16px;

        display: inline-block;
        vertical-align: middle;
    }
    width: 100%;
    max-width: 100%;
    .fixed {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
    }
    .table-no-data {
        text-align: center;
        width: 100%;
    }
}
.table-footer {
    margin-top: 15px;
    line-height: 30px;
    .footer-tips {
        display: inline-block;
        width: 39%;
        text-align: left;
    }
    .footer-page {
        display: inline-block;
        width: 60%;
        text-align: right;
        .table-btn {
            cursor: pointer;
            border-radius: 4px;
            padding: 4px 8px;
            &:hover,
            &.active {
                background: #f2f2f2;
                color: $main-active-color;
            }
            &.disabled {
                background: #ddd;
                cursor: not-allowed;
            }
        }
    }
}
</style>