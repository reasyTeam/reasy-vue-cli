<template>
	<transition name="fade">
	    <v-elem class="dialog" v-if="dialog.show">
	    	<div class="overlay" @click="dialog.show = false;"></div>
	    	<div class="dialog-container" :class="dialog.css">
	    		<div class="dialog-content">
	    			<div class="dialog-title">
	    				<span>{{dialog.title}}</span>
						<span class="dialog-close" @click="handlerCancel()">&times;</span>
	    			</div>
					<div class="content">
						<slot></slot>
					</div>
					<div class="btn-group">
						<v-button :callback="handlerOK" css="btn-primary" :title="dialog.okText"></v-button>
						<v-button v-if="dialog.hasCancel !== false" :callback="handlerCancel" :title="dialog.cancelText"></v-button>
					</div>
				</div>
			</div>
	    </v-elem>
    </transition>
</template>

<script>
	let defaluts = {
	    required: false,
	    css: "", //样式
	    title: "",
	    hasCancel: true,
	    okText: "确定",
	    cancelText: "取消",
	    show: true, //是否显示
	    ignore: true, //是否忽略
	    okCallBack: function() {},
        cancelCallBack: function() {}
	};

	export default {
		name: "v-dialog",
		props:["dialog"],
    	data(){
            return{

            };
        },
        created() {
        	let _this = this;

        	//TODO: 数据转换
    		this.dialog = this.setOptions(this.dialog, defaluts);

        },
        mounted(){

        },
        methods: {
        	handlerCancel() {
        		this.dialog.show = false;
        	},
        	handlerOK() {
        		if(this.dialog.okCallBack() === false) {
        			return;
        		}
        		this.handlerCancel();
        	}
        }
    };
</script>

<style lang="scss">


</style>