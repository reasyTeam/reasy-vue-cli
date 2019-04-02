<template>
	<transition name="slide-up" mode="out-in">
		<div class="main-container">
			<v-header>
				<div class="header"></div>
			</v-header>
			<div class="menu-group">
        		<div class="table-cell menu-navigater">
			    	<div class="first" v-for="firstMenu in menuOptions" :key="firstMenu.path">
						<router-link
							v-if="firstMenu.path"
							@click.native="changeMenu(firstMenu.pathUrl)" class="first-menu" tag="div"
							:to="firstMenu.pathUrl">
							<a>{{firstMenu.title}}</a>
						</router-link>
						<div class="second" v-if="firstMenu.children.length > 0">
							<template  v-for="secondMenu in firstMenu.children">
								<router-link
									v-if="secondMenu.path"
									@click.native="changeMenu(secondMenu.pathUrl)" class="second-menu" tag="div"
									:to="secondMenu.pathUrl" :key="secondMenu.path">
									<a>{{secondMenu.title}}</a>
								</router-link>
							</template>
						</div>
					</div>
				</div>
				<div class="table-cell w-20"></div>
				<div class="table-cell main-content" id="subMenu">
					<div class="third" v-if="thirdMenuArr.length > 0">
						<template v-for="thirdMenu in thirdMenuArr">
							<router-link v-if="thirdMenu.path"
								:to="thirdMenu.path" class="third-menu" tag="span"
								v-on:click.native="changeMenu(thirdMenu.pathUrl, true)" :key="thirdMenu.path">
								<a>{{thirdMenu.title}}</a>
							</router-link>
						</template>
					</div>
					<router-view v-if="isRouterAlive"></router-view>
				</div>
			</div>
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
        margin: 20px 0;
        min-height: 500px;
        .table-cell {
        	display: table-cell;
        	word-break: break-word;
        }
        .menu-navigater {
            width: 200px;
			background: #fff;
			border-radius: $menu-border-radius;
			a {
				color: $info-color;
				font-weight: 700;
					&:active, &:hover {
                		color: $main-active-color;
            		}
			}
			.router-link-active{
	        a{

	        	font-size: $font-size-meduim;
	            color: $main-active-color;
	        }

			& + .second {
				display: block;
				animation: slideInUp .5s;
			}

	    }

        }
        .main-content {
            background: #fff;
            border-radius: $menu-border-radius;
			padding: 10px 20px;
			.third {
	        	margin-bottom: 20px;
	        	border-bottom: 1px solid #ccc;
	        }
            .third-menu {
            	display: inline-block;
        	    line-height: 30px;
        	    height: 30px;
			    & + .third-menu {
					margin-left: 8px;
				}
			    a {
			    	color: #333;
			    	font-weight: 700;
			    	font-size: $font-size-meduim;
			    }
			    &:hover {
			    	border-bottom: 3px solid $light-color;
			    	a {
				    	color: $main-active-color;
				    }
			    }
			    &.router-link-active {
			    	border-bottom: 3px solid $main-active-color;
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

</style>
<script>
	import router from '@/router';
	let firstMenuPath = "/status/system/wireless";
	export default {

		beforeCreate() {
			//index的路径下刷新默认进入首页
			this.$router.push(firstMenuPath);
		},
		created() {

			let mainMenu,
				_this = this;
			//排除根路由 /
			mainMenu = router.options.routes[0].children;

			let menuTree = {};
			mainMenu.forEach(function(firstItem) {
				_this.hasChild(_this.baseUrl, firstItem, 0, menuTree);
			});
			
			this.menuThird = menuTree; //3级菜单的配置
			this.thirdMenuArr = this.menuThird[firstMenuPath];

			this.menuOptions = mainMenu;


		},

		provide() {
			return {
				reload: this.reload
			}
		},

		mounted() {
			document.title = _("Extender");
		},
		data() {
			return {
				baseUrl: "",
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

			hasChild(url, menuObj, index, menuTree) {
				let nexUrl = "",
					_this = this;
				if(menuObj.path.indexOf("/") === 0) {
					nexUrl = menuObj.path;
				} else {
					nexUrl = url +  "/" + menuObj.path;
				}
				menuObj.pathUrl = nexUrl;
				if((menuObj.children||[]).length === 0) {
					menuObj.completeUrl = nexUrl;
					menuTree[nexUrl] = [menuObj];
					return;
				}

				if(index >= 1) {
					menuTree[url] = menuObj.children; //一级菜单
					menuObj.children.forEach(function(item) {
						item.pathUrl = menuObj.pathUrl + "/" + item.path;
						menuTree[item.pathUrl] = menuObj.children; //三级菜单
					});
					menuTree[nexUrl] = menuObj.children; //二级菜单
				} else {
					menuTree[nexUrl] = menuObj.children; //一级菜单
					menuObj.children.forEach(function(item) {
						_this.hasChild(nexUrl, item, index+1, menuTree);
					});
				}

			},

			changeMenu(url, thirdClick) {
				//处理点击相同路由无反应的问题
				//调用父组件的reload
				let redirectUrl;

				//三级菜单时   url为跳转地址
				if(thirdClick) {
					redirectUrl = url;
				} else {
					redirectUrl = this.menuThird[url][0].pathUrl;
				}
				//如果跳转地址为当前路径，则刷新当前页
				if(redirectUrl === this.currentUrl) {
					this.reload(redirectUrl);
				} else {
					//更新路径
					this.$router.replace(redirectUrl);
				}
				this.currentUrl = redirectUrl;
			}
		},
		beforeRouteUpdate(to, from, next){
			if(this.menuThird) {
				this.thirdMenuArr = this.menuThird[to.fullPath] || this.thirdMenuArr;
			}
	        next();
		}
	};
</script>