<template>
	<transition name="slide-up" mode="out-in">
		<div class="main-container">
			<v-header>
				<div class="header"></div>
			</v-header>
			<div class="menu-group">
        		<div class="table-cell menu-navigater">
			    	<div class="first" v-for="firstMenu in menuOptions">
						<router-link
							v-if="firstMenu.path"
							@click.native="changeMenu(firstMenu.pathUrl)" class="first-menu" tag="li"
							:to="firstMenu.pathUrl"
							:target="firstMenu.completeUrl">
							<a>{{firstMenu.title}}</a>
						</router-link>
						<div class="second">
							<template v-if="firstMenu.children.length > 0" v-for="secondMenu in firstMenu.children">
								<router-link
									v-if="secondMenu.path"
									@click.native="changeMenu(secondMenu.pathUrl)" class="second-menu" tag="li"
									:to="secondMenu.pathUrl"
									:target="secondMenu.completeUrl">
									<a>{{secondMenu.title}}</a>
								</router-link>
							</template>
						</div>
					</div>
				</div>
				<div class="table-cell w-20"></div>
				<div class="table-cell main-content" id="subMenu">
					<div class="third">
						<template v-if="thirdMenuArr.length > 0" v-for="thirdMenu in thirdMenuArr">
							<router-link v-if="thirdMenu.path"
								:to="thirdMenu.path" class="third-menu" tag="span"
								v-on:click.native="changeMenu(thirdMenu.pathUrl, true)">
								<a>{{thirdMenu.title}}</a>
							</router-link>
						</template>
					</div>
					<router-view v-if="isRouterAlive"></router-view>
				</div>
			</div>
			<v-header>
				end
			</v-header>
			<div id="noticeWrap" class="message-container"></div>
		</div>
	</transition>
</template>
<style lang="scss">
	body {
		background: #dddddd;
	}
	.header {
		width: 100%;
		height: 45px;
		background: $main-active-color;
	}

	.main-container {
		width: 90%;
		min-width: 1000px;
		margin: 0 auto;
		position: relative;
	}
	.first {
		border-bottom: 1px solid #666;
		.second {
			margin-left: 0px;
			background: #ccc;
			.second-menu {
				height: 30px;
				line-height: 30px;
				padding-left: 30px;
				& + .second-menu {
					border-top: 1px solid #999;
				}
			}
			display: none;
			//animation: slideOutUp .5s;
		}
		.first-menu {
			height: 30px;
			line-height: 30px;
			padding-left: 20px;
			&.router-link-active {
				border-bottom: 1px solid #666;
			}
		}

	}

	.menu-group {
        display: table;
        width: 100%;
        margin-top: 20px;
        min-height: 500px;
        .table-cell {
        	display: table-cell;
        	word-break: break-word;
        }
        .menu-navigater {
            width: 200px;
			background: #fff;
			border-radius: $menu-border-radius;
            a:active, a:hover {
                color: $main-active-color;
            }
        }
        .main-content {
            background: #fff;
            border-radius: $menu-border-radius;
			padding: 0 20px;
			.third {
	        	margin-bottom: 20px;
	        	border-bottom: 2px solid #ccc;
	        }
            .third-menu {
            	display: inline-block;
        	    line-height: 30px;
        	    height: 30px;
			    margin-right: 4px;
			    a {
			    	color: #333;
			    }
			    &.router-link-active {
			    	border-bottom: 2px solid $main-active-color;
			    	a {
				    	color: $main-active-color;
				    }
			    }
            }
        }
        .w-20 {
        	width: 20px;
        }

    }
    .router-link-active{
        a{
            color: $main-active-color;
        }

		& + .second {
			display: block;
			animation: slideInUp .5s;
		}

    }

</style>
<script>
	import router from '@/router';
	export default {

		beforeCreate() {
			//index的路径下刷新默认进入/index
			this.$router.push('/index/status/system/wireless');
		},
		created() {

			let mainMenu,
				_this = this;
			router.options.routes.forEach(function(item) {
				if(item.path == _this.baseUrl) {
					mainMenu = item;
				}
			});
			let thirdObj = {};

			//一级菜单
			mainMenu.children.forEach(function(firstItem) {
				firstItem.completeUrl = _this.translateMenu(_this.baseUrl, firstItem);
				let firstUrl = _this.baseUrl + "/" + firstItem.path;
				firstItem.pathUrl = firstUrl;
				if(firstItem.children) { //有2级菜单
					if (firstItem.children[0].children) { //有三级菜单
						thirdObj[firstUrl] = firstItem.children[0].children;
					} else { //只有2级菜单
						thirdObj[firstUrl] = [firstItem.children[0]];
					}
				} else { //只有一级菜单
					thirdObj[firstUrl] = [firstItem];
				}

				//存在二级菜单
				firstItem.children && firstItem.children.forEach(function(secondItem, index) {
					secondItem.completeUrl = _this.translateMenu(firstUrl, secondItem);
					let secondUrl = _this.baseUrl + "/" + firstItem.path + "/" + secondItem.path;
					//跳转路径
					secondItem.pathUrl = secondUrl;
					//存在三级菜单
					if(secondItem.children && secondItem.children.length > 0) {
						thirdObj[secondUrl] = secondItem.children;
						thirdObj[secondUrl].forEach(function(thirdItem) {
							thirdItem.path = secondUrl + "/" + thirdItem.path;
							thirdItem.pathUrl = thirdItem.path;
							thirdObj[thirdItem.pathUrl] = secondItem.children;
						});
					} else {
						thirdObj[secondUrl] = [secondItem];
					}
				});
			});

			this.menuThird = thirdObj; //3级菜单的配置

			this.thirdMenuArr = this.menuThird["/index/status"];

			this.menuOptions = mainMenu.children;
		},

		mounted() {
			document.title = _("Extender");
		},
		data() {
			return {
				baseUrl: "/index",
				isRouterAlive: true,
				currentUrl: "",
				menuOptions:[],
				thirdMenuArr: []
			};
		},
		methods: {
			reload (url) {
			    this.isRouterAlive = false;
			    this.$nextTick(() => (this.isRouterAlive = true));
			    if(url) {
			    	this.$router.push(url);
			    }
			},

			translateMenu(url, routerPath) { //返回全路径
				let newUrl = url + "/" + routerPath.path;
				if((routerPath.children||[]).length > 0) {
					newUrl = this.translateMenu(newUrl, routerPath.children[0]);
				}

				return newUrl;
			},
			changeMenu(url, thirdClick) {
				//处理点击相同路由无反应的问题
				//调用父组件的reload

				let redirectUrl = event.target.getAttribute("target") || event.target.parentElement.getAttribute("target");

				//三级菜单时   url为跳转地址
				if(thirdClick) {
					redirectUrl = url;
				}
				//如果跳转地址为当前路径，则刷新当前页
				if(redirectUrl === this.currentUrl) {
					this.reload(redirectUrl);
				} else {
					//更新路径
					this.$router.push(redirectUrl);
				}
				this.currentUrl = redirectUrl;
			}
		},
		beforeRouteUpdate(to, from, next){
			if(this.menuThird) {
				this.thirdMenuArr = this.menuThird[to.fullPath] || this.thirdMenuArr;
			}

			console.log("update router");
	        next();
	    }
	};
</script>