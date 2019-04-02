<template>
	<transition name="fade">
	    <div ref="tooltip" v-if="parseHtml" v-html="content" class="el-tooltip" v-show="show && content" :style="{'left': left + 'px', 'top': top + 'px'}">
	    	
	    </div>

		<div ref="tooltip" v-else class="el-tooltip" v-show="show && content" :style="{'left': left + 'px', 'top': top + 'px'}">
	    	{{content}}
	    </div>
    </transition>
</template>
<script>

	export default {
		data() {
			return {
				parseHtml: false,
				content: "",
				left: 0,
				top: 0,
				show: false,
				relativeWidth: 0,
				relativeHeight: 0
			};
		},
		updated() {
			let clientRect = this.$refs.tooltip.getBoundingClientRect(),
				bodyWidth = document.body.clientWidth,
				bodyHeight = document.body.clientHeight;

			//当右边超出屏幕宽度时
			if(clientRect.right > bodyWidth) {
				this.left = this.left - this.$refs.tooltip.offsetWidth;
			}
			
			//当下方超出屏幕高度时
			if(clientRect.bottom > bodyHeight) {
				this.top = this.top - this.$refs.tooltip.offsetHeight;
			}
			
		},
        
		destroyed() {

		}
    };
</script>
<style lang="scss">
	.el-tooltip {
		position: absolute;
		background: #000;
		padding: 6px 10px;
		color: #fff;
		z-index: 9999;
		border-radius: 6px;
	}

</style>