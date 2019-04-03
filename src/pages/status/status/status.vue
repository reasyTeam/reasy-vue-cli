<template>
	<div>
		<v-elem>

			<v-table ref="table"
				:tableOptions="tableData"
				:callback="updateCallBack"
				@on-custom-comp="customCompFunc1"
				:update="updateTimer">
			</v-table>

			<v-elem class="xxx" v-if="has">Rebooting...</v-elem>
			<button class="btn btn-primary" @click="has=!has">点击</button>

			<v-alert :alert="alert">
				<div>This is a alert!</div>
				<div>Login XXX</div>
			</v-alert>
			<div>
				<button class="btn btn-primary" @click="showConfirm()">提示</button>
			</div>
			<!-- <div>
				<button class="btn btn-primary" @click="confirm.show=true">提示确认</button>
			</div> -->


		</v-elem>
	</div>
</template>

<script>

	import Vue from 'vue';
	import { escapeText } from '@/libs/utils';
	export default {
	    mounted() {
	    	let _this = this;

	    	/*setTimeout(function() {
	    		_this.updateTimer = 0;
	    	},5000);*/
	    	/*http.get("goform/table", function(res) {
                _this.tableData.originData = res.list;

            });*/

/*	        this.updateTimer = setInterval(function() {

	        }, 1000)*/
	        this.$post("/port", {"list":[{"ssid":"lG$TlOL3VB0!N3OMq%Bry@CnTW@94uh4","name":"B((B1","num":-5094732,"success":false},{"ssid":"xSRg4]ViwVtSFrgHaO#i#)k$rwdpFtv@","name":"Zgt%%","num":-95822497,"success":true},{"ssid":"Wc2w!^d!exGq!Je@SYYntY@6U^&gYYgS","name":"bffvg","num":31737960,"success":true}]}, function(res) {

			});
			
			this.$getData("goform/table", function(res) {
				_this.tableData.originData = res.list;
			});
	    },
	    data() {
	    	return {
	    		has: false,
	    		updateTimer: 0,
	    		tableData: {
	    			key: "ssid",
	    			css: "table-group",
	    			showPage: true,
	    			pagePer: 10,
					sortOrder: ["ssid", "num"],
					
	    			sortOpt: {
	    				"ssid": "asc",
	    				"num": "desc"
	    			},
	    			columns: [{
		    			title: "无线名称",
		    			field: "ssid",
		    			width: "200px",
		    			sort: true
		    		},{
		    			title: "客户端数量",
		    			field: "num",
		    			sort: true,
		    			format: function(data) {
		    				return  data + "---------312";
		    			}
		    		},{
		    			title: "无线密码",
		    			field: "name",
		    			parseHtml: true,
		    			width: "150px",
		    			format: function(data) {
		    				return `<input type="text" class="text" value="${escapeText(data)}">`;
		    			}
		    		},{
		    			title: "操作",
		    			field: "action",
		    			width: "150px",
		    			parseHtml: false,
		    			componentName: "table-operation",
		    			format: function(data, rowsData) {
		    				return "data";
		    			}
		    		}],
					search: true,
					//searchItem: ["name"]
	    		},
	    		alert: {
					show: false,
					css: "",
					callback: () => {
						
					}

				},
				confirm: {
					show: false,
					callback: () => {
						
					},
					cancelBack:() => {
						
					}

				},
	    	};
	    },
	    methods: {
	    	updateCallBack() {
	    		
	    	},
	    	changeName() {
	    		alert(this.value);
	    	},
	    	customCompFunc1(options) {
	            if(options.type == "delete") {
	                this.tableData.originData.splice(options.index, 1);
	            }
			},
			showConfirm() {
				/* this.$confirm({
					content: this.$refs.table.$el,
					parseHtml: false,
					title: "123"
				}).then((val)=>{
					console.log("################## ", val);
				}).catch(()=> {}); */
				this.$message("xxxx");
			}
	    },
	    destroyed() {
	    	clearInterval(this.updateTimer);
	    }
	};

	// 自定义列组件
    Vue.component('table-operation', {
        template:`<div>
        	<a href="" @click.stop.prevent="update(rowData,field)" v-html="rowData[field]">编辑</a>&nbsp;
        	<a href="" @click.stop.prevent="deleteRow(rowData,field)">删除</a>
        </div>`,
        props:["rowData", "field", "index", "tableData", "originData"],
        methods:{
            update(rowData, field){

            },

            deleteRow(){

                // 参数根据业务场景随意构造
                let params = {type:'delete',index: this.index};
                this.$emit('on-custom-comp',params);

            }
        }
    });
</script>