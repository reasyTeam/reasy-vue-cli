<template>
  <transition name="slide-up" mode="out-in">
    <v-elem>
      <div>Login XXX</div>
      <v-input :dataKey="login"></v-input>
      <div>{{login.key}}</div>

      <div>
        <v-radio :dataKey="radio"></v-radio>
      </div>
      <div>{{radio.key}}</div>

      <div>
        <v-select :dataKey="select"></v-select>
      </div>
      <div>
        <v-checkbox :dataKey="formData.checkbox"></v-checkbox>
      </div>
      <div>
        <v-checkbox :dataKey="formData.box"></v-checkbox>
      </div>
      <div>
        <v-buttons :dataKey="formData.button"></v-buttons>
      </div>
      <div>
        <v-dialog :dialog="dialog">
          <div>Login XXX</div>
        </v-dialog>
      </div>
      <div>
        <v-alert :alert="alert">
          <div>This is a alert!</div>
          <div>Login XXX</div>
        </v-alert>
      </div>
      <v-elem :show="xxxx">
        <div>Login XXX</div>
        <v-elem v-if="test">Login XXX</v-elem>
      </v-elem>
      <v-switch :dataKey="formData.switch"></v-switch>
      <v-progress
        :percent="percent"
        text-align="right"
        interval-time="2000"
        :handler-callback="progressBack"
      ></v-progress>
      <div @click="add()">xxx</div>
      <div>{{count}}</div>
    </v-elem>
  </transition>
</template>
<script>
export default {};
// import { mapState, mapActions } from 'vuex';
// export default {
// 	//inject:["translate"],
// 	name: "Login",

// 	computed: mapState({
// 	    count: state => state.count
// 	}),
// 	mounted() {

// 		//this.translate();
// 		let _this = this;
// 		setTimeout(function() {
// 			//_this.formData.checkbox.key = ["1", "2"];
// 		}, 3000);
// 	},
// 	data() {
// 		return {

// 			xxxx: true,
// 			test: false,
// 			percent: 96,
// 			login: {
// 				css: "x123",
// 				title: _("Login"),
// 				placeholder: "asdasda",
// 				key: "123",
// 				//disabled: true,
// 				valid: {
// 					type: "ascii"
// 				}
// 			},
// 			radio: {
// 				title: _("Login"),
// 				options: {
// 					"1": "label 1",
// 					"2": "label 2",
// 					"0": "label 0"

// 				},
// 				sortArray: ["2", "1", "0"],
// 				key: "0",
// 				changeCallBack(value) {

// 				}
// 			},
// 			select: {
// 				title: "select ",
// 				key: "",
// 				options:[{
// 					label: "option 1",
// 					value:  "1"
// 				},{
// 					label: "option 2",
// 					value:  "2"
// 				},{
// 					label: "option 3",
// 					value:  "3"
// 				}],
// 				changeCallBack: this.selectCallBack
// 			},
// 			dialog: {
// 				title: "Title",
// 				show: false,
// 				buttons:[{
// 					text: "确123定",
// 					css: "btn-primary",
// 					callback: function() {

// 					}
// 				},{
// 					text: "取1消2",

// 				}]
// 			},
// 			alert: {
// 				title: "Title",
// 				show: false,
// 				css: "",
// 				callback: () => {

// 				},

// 			},
// 			confirm: {
// 				show: false,
// 				callback: (clickOk) => { //
// 					c
// 				}
// 			},
// 			formData: {
// 				checkbox: {
// 					title: _("Login"),
// 					options: {
// 						"1": "label 1",
// 						"2": "label 2",
// 						"0": "label 0"
// 					},

// 					sortArray: ["2", "0", "1"],
// 					key: ["2"],
// 					changeCallBack(value) {

// 					}
// 				},
// 				switch: {
// 					title: _("开关"),
// 					key: false,
// 					changeCallBack(value) {

// 					}
// 				},
// 				box: {
// 					title: _("xxxxxx"),
// 					values: ["1", "0"],
// 					key: "1",
// 					label: "开启",
// 					changeCallBack(value) {

// 					}
// 					//key: true,
// 				},
// 				button: {
// 					buttons:[{
// 						text: "确定",
// 						css: "btn-primary",
// 						clickCallBack: this.showDialog
// 					},{
// 						text: "取消",
// 						clickCallBack() {

// 						}
// 					}]
// 				}
// 			}
// 		};
// 	},
// 	methods: {
// 		add() {
// 			this.$store.dispatch('increment');
// 		},
// 		selectCallBack(value) {

// 		},
// 		showDialog() {
// 			//this.test = true;
// 			//this.alert.show = true;
// 			//this.confirm.show = true;
// 			//this.$message("xxxxx");
// 			//this.$confirm("xxxx");
// 			this.$alert({
// 				content: "<div>xxxxx</div>",
// 				parseHtml: true,
// 				title: "123"
// 			}).then((val)=>{

// 			}).catch(()=> {})
// 		},
// 		progressBack() {

// 		}
// 	}
// };
</script>