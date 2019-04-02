<template>
	<section>
		<header-top>上网状态</header-top>
		<div class="header-status flex">
			<div class="status-logo">
			</div>
			<div class="status-menu">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
		<div class="wifi-box">
	        <div class="wifi-signal">
	          <div class="wifi-circle first"></div>
	          <div class="wifi-circle second"></div>
	          <div class="wifi-circle third"></div>
	          <div class="wifi-circle fourth"></div>
	        </div>
	    </div>

	    <div class="status-content flex">
	    	<div class="text-normal">
	    		<div class="">扩展状态</div>
	    		<div class="icon-warning"></div>
	    	</div>
	    	<div class="">
	    		<div class="">信号强度</div>
	    		<div class="icon-warning"></div>
	    	</div>
	    </div>
	</section>
</template>
<style lang="scss">
	.header-status {
		margin: 10px 10px 30px;
		justify-content: space-between;
	}
	.status-logo {
		display: inline-block;
		background-image: url(../assets/img/logo.png);
		background-size: 100% 100%;
		width: 64px;
		height: 15px;
	}
	.status-menu {
		float: right;
	}
	.status-menu div{
		width: 26px;
		height: 2px;
		background: #000;
		margin-top: 6px;
	}
	.wifi-box {
        width: 60px;
        height: 60px;
        position: relative;
        margin: 10px auto;
    }
    .wifi-signal {
        width: 100%;
        height: 100%;
        overflow: hidden;
        transform: rotate(45deg);

    }
    .wifi-circle {
        border: .4rem solid #58bf14;
        border-radius: 50%;
        position: absolute;
    }
    .wifi-circle.first {
        width: 200%;
        height: 200%;
        top: 0;
        left: 0;

    }

    .wifi-circle.second {
        width: 150%;
        height: 150%;
        top: 30%;
        left: 30%;
    }
    .wifi-circle.third {
        width: 85%;
        height: 85%;
        top: 60%;
        left: 60%;
    }
    .wifi-circle.fourth {
        width: 10%;
        height: 10%;
        background: #58bf14;
        top: 90%;
        left: 90%;
        border: none;

    }

    .status-content {
    	margin-top: 50px;
    	justify-content: space-around;
    }
</style>
<script>
	export default {
		data() {
			return {}
		}
	}
</script>