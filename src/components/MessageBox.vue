<template>
	<transition name="fade">
	    <v-elem ref="dialog" class="dialog" v-if="isShowMessageBox">
	    	<div class="overlay" @click="isShowMessageBox = false;"></div>
	    	<div class="dialog-container">
	    		<div class="dialog-content">
	    			<div class="dialog-title">
	    				<span>{{title}}</span>
						<span class="dialog-close" @click="isShowMessageBox = false;">&times;</span>
	    			</div>
					<div class="content">
						<div v-if="parseHtml" v-html="content"></div>
						<div v-else>{{content}}</div>
					</div>
					<div class="btn-group text-right">
						<button class="btn btn-primary" @click="confirm()">{{okText}}</button>&nbsp;&nbsp;
						<button v-show="hasCancel" class="btn" @click="cancel()">{{cancelText}}</button>
					</div>
				</div>
			</div>
	    </v-elem>
    </transition>
</template>
<script>
	export default {
		data() {
			return {
				title: "提示",
				isShowMessageBox: false,
				parseHtml: false,
				okText: "确定",
				cancelText: "取消",
				content: "",
				resolve: '',
		        reject: '',
		        hasCancel: true,
		        promise: '' // 保存promise对象
			};
		},
        methods: {
        	confirm() {
        		this.isShowMessageBox = false;
        		this.resolve(true);
        	},
        	cancel() {
        		this.isShowMessageBox = false;
        		this.reject();
        	},
        	showMsgBox() {
        		this.isShowMessageBox = true;
	          	this.promise = new Promise((resolve, reject) => {
	            	this.resolve = resolve;
	            	this.reject = reject;
	          	});
	          	// 返回promise对象
	          	return this.promise;
	        }
		},
		destroyed() {

		}
    };
</script>