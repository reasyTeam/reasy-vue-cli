### Table表格

支持属性 tableOptions 表格数据配置

callback 表格更新回调

update 表格更新时间

	html

	<v-table
		:tableOptions="tableData"
		:callback="updateCallBack"
		@on-custom-comp="customCompFunc1"
		:update="updateTimer">
	</v-table>

	js

	tableData： {
		requestUrl： //表格请求数据
		originData： //表格数据 当requestUrl未设置时 表格数据为 originData
		show: 是否显示
		key: //每行tr关键字
		css: 表格自定义样式
		maxTableRow： number //每页显示多少行，超过行则出现滚动条
		showPage: true/false //是否支持分页
		pagePer： number //每页多少条
		sortOrder: ["string"] //表头支持排序的列
		sortOpt: Object  key为表头排序的关键字 value为asc/desc
		search: true/false 是否支持搜索
		columns: [{
			title: "无线名称",
            field: "ssid",
            width: "40%",
            sort: true/false, //是否支持排序
            format:function() {return str},
            parseHtml: true/false, // 是否是html
            componentName: string //自定义组件
		}
		...
		]

	}


	自定义表格列
	例：

	colums: [{
		componentName: "table-operation"
	}]

	// 自定义列组件
    Vue.component('table-operation', {
        template:`<div>
        	<a href="" @click.stop.prevent="update(rowData,field)">编辑</a>&nbsp;
        	<a href="" @click.stop.prevent="deleteRow(rowData,field)">删除</a>
        </div>`,
        props:["rowData", "field", "index", "tableData"],
        methods:{
            update(rowData, field){

              console.log("xxxx");
            },

            deleteRow(){

                // 参数根据业务场景随意构造
                let params = {type:'delete',index: this.index};
                this.$emit('on-custom-comp',params); //必须 触发表格的自定义事件

            }
        }
    });

callback 表格更新后的回调

update 表格更新时间  数值为ms


### 下拉框

支持下拉框自定义和手动输入

dataKey参数

	required: true, //是否必须
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    hasManual: false, //是否支持自定义
    manualText: "自定义",
    val: "", //组件值
    sortArray: [ //元素为对象属性
		{
			value: "", //值
			title: ""  //下拉框显示
		}
	],
	options: { //sortArray 和 options只能二选一，同时存在时优先sortArray
		/*value: title*/  value为下拉框value  title为下拉框显示文本
	}
    description: "", //描述
    changeCallBack: function() {} //回调函数，选择下拉列表后的执行函数


示例

	<v-group title="">
		<v-select :dataKey="select"></v-select>
	</v-group>


	select: {
		val: "",
		hasManual: false,
		manualText: "手动设置",
		sortArray:[{
			title: "optionxxxxxxxxxxxxxxxxxxxxxx 1",
			value:  "1"
		},{
			title: "optionxxxxxxxxxxxxxxxxxx 2",
			value:  "2"
		},{
			title: "option 3",
			value:  "3"
		}],
		valid: {
			type: "ascii"
		},
		changeCallBack: this.selectCallBack
	}

### 复选框

支持单个复选框和多个复选框

配置如下（默认值）

	required: true,
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    val: "", //组件值
    values: [true, false], //选中和不选中 默认用options的数据
	options: {}, //options 和sortArray
    sortArray: [/*{
        title: "",
        value: "",
        disabled: ""
    }*/],
    title: "", //
    changeCallBack: function() {}
	

当sortArray长度为0时，则为单个复选框 此时title 生效 值为 values的元素

当sortArray长度不为0时，则为多个复选框，返回值key为数组



示例
	<v-group title="复选框">
		<v-checkbox :dataKey="checkbox"></v-checkbox>
	</v-group>

	checkbox: {
		title: _("Login"),
		sortArray: [{
			value: "2",
			title: "label 2"
		},{
			value: "0",
			title: "label 0"
		},{
			value: "1",
			title: "label 1"
		}],
		key: ["2"],
		changeCallBack(value) {
			console.log("radio value ",value);
		}
	}


### 单选按钮

	required: true,
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    val: "", //组件值
    options: {},
	sortArray: [/*{
        title: "",
        value: "",
        disabled: ""
    }*/],
    description: "", //描述
    changeCallBack: function() {}


示例
	<v-group title="复选框">
		<v-radio :dataKey="radio"></v-radio>
	</v-group>

	radio: {
		title: _("Login"),
		sortArray: [{
			value: "2",
			title: "label 2"
		},{
			value: "0",
			title: "label 0"
		},{
			value: "1",
			title: "label 1"
		}], 
		//or
		options: {
			"1": "label 1",
			"2": "label 2",
			"0": "label 0"

		},
		key: "2",
		changeCallBack(value) {
			console.log("radio value ",value);
		}
	}

### 输入框

配置

	required: false, //是否必须输入
    css: "", //样式
    show: true, //是否显示
    ignore: false, //是否忽略
    disabled: false, //是否禁用
    maxlength: "", //最大长度
    type: "text", //类型
    placeholder: "",
    hasEye: "", //是否有小眼睛
    key: "", //组件id
    error: "",   //错误标志
    valid:[
        /*{
            type: "ssid",
            args: [1, 2]
        }*/
    ]


示例
	
	<v-input :dataKey="login"></v-input>

	login: {
		css: "input-small",
		title: _("Login"),
		placeholder: "Login Password",
		key: "",
		type: "password",
		valid: {
			type: "ascii"
		}
	},


### 开关

	css: "", //样式
    show: true, //是否显示
    ignore: true, //是否忽略
    disabled: false, //是否禁用
    val: "", //组件id
    values: [true, false],
    title: "", //描述
    changeCallBack: function() {}


示例
	
	<v-switch :dataKey="formData.switch" ></v-switch>

	switch: {
		val: false,
		changeCallBack(value) {
			console.log("开关 value ",value);
		}
	}

### 按钮

	开放接口：

	callback: 点击后执行事件 
	title： 按钮文字
	css： 按钮样式
	show： 是否显示，默认显示

	<v-button title="确定" :callback="showDialog" css="btn-primary" show="true"></v-button>

### 组

	属性：

	title: 左边文字
	css: 样式

	<v-group title="复选框" class="xxxx">
		xxxxx
	</v-group>

### 弹出层

	
	<div>
		<v-dialog :dialog="dialog">
			<div>Login XXX1</div>
		</v-dialog>
	</div>

	配置

	required: false,
    css: "", //样式
    title: "",
    hasCancel: true, //是否有取消按钮
    okText: "确定",
    cancelText: "取消",
    show: true, //是否显示
    ignore: true, //是否忽略
    okCallBack: function() {},
    cancelCallBack: function() {}


### 消息提示

	1、确认框
	this.$confirm(msg).then(function() {
		//点击确定动作	
		}).catch(function() {
		//点击取消动作
		});
	2、警告框
	
	this.$confirm(msg).then(function() {
		//点击确定动作	
		})；
	
	msg: string or object

	object {
		css: "", //样式
	    title: "",
	    hasCancel: true, //是否有取消按钮
	    okText: "确定",
	    cancelText: "取消",
	    show: true, //是否显示
	    ignore: true, //是否忽略
	    okCallBack: function() {},
	    cancelCallBack: function() {}
	} 

	3、提示框

	this.$message(msg, time);

	msg: string or dom节点
	time: 显示时间

	 
