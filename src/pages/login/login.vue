<template>
    <transition name="slide-up" mode="out-in">
        <v-elem>
            <v-group title="Login" :show="login.show">
                <v-input @custom-event="customEvent" :data-key="formData.login"></v-input>
            </v-group>

            <v-group title="SSID">
                <v-input @custom-event="customEvent" :data-key="formData.ssid"></v-input>
            </v-group>

            <v-group title="xxxx">
                <v-radio :data-key="formData.radio"></v-radio>
            </v-group>
            <div>{{formData.radio.val}}</div>

            <v-group title="下拉框-自定义">
                <v-select :data-key="formData.selectManual"></v-select>
            </v-group>

            <v-group title="下拉框">
                <v-select :data-key="formData.select"></v-select>
            </v-group>
            <v-group title="复选框">
                <v-checkbox :data-key="formData.checkbox"></v-checkbox>
            </v-group>
            <v-group title="开关">
                <v-checkbox :data-key="formData.box"></v-checkbox>
            </v-group>

            <v-group>
                <v-button title="确定" :callback="submit" css="btn-primary"></v-button>
                <v-button title="取消"></v-button>
            </v-group>
            <div>
                <v-dialog :dialog="dialog">
                    <div>Login XXX1</div>
                </v-dialog>
            </div>

            <v-group>
                <v-button title="弹出层" :callback="showDialog" css="btn-primary"></v-button>
            </v-group>

			<v-group>
                <v-button title="弹出层2" :callback="showDialog2" css="btn-primary"></v-button>
            </v-group>
            <div>
                <v-alert :alert="alert">
                    <div>This is a alert!</div>
                    <div>Login XXX</div>
                </v-alert>
            </div>
            <v-elem>
                <v-slider min="1" max="23" v-model="login.sliderVal"></v-slider>
            </v-elem>
            <v-elem :show="xxxx">
                <div>Login XXX1</div>
                <v-elem v-if="test">Login XXX</v-elem>
            </v-elem>
            <div @click="getMode('123')">点击mode</div>
            {{mode}}
            <v-group title="开关">
                <v-switch :dataKey="formData.switch"></v-switch>
            </v-group>
            <v-progress
                :percent="percent"
                text-align="right"
                :interval-time="2000"
                :callback="progressBack"
            ></v-progress>
            <div @click="add()">xxx</div>
            <div>{{count}}</div>
        </v-elem>
    </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    //inject:["translate"],
    created() {
        
    },
    computed: mapState({
        count: state => state.count,
        mode: state => state.global.mode
    }),

    /*computed: {
			...mapState(["global.mode", "count"])
		},*/
    mounted() {

        //this.translate();
        let _this = this;
        setTimeout(function() {}, 3000);
    },
    data() {
        return {
            //mode: "",
            xxxx: true,
            test: false,

            percent: 96,
            login: {
                sliderVal: 1,
                required: true,
                css: "x123",

                placeholder: "asdasda",
                val: "",
                type: "password",
                hasEye: true,
                //disabled: true,
                valid: {
                    type: "num",
                    args: [1, 23]
                }
            },

            dialog: {
                title: "Title",
                show: false,
                okCallBack: function() {
                
                }
            },
            alert: {
                title: "Title",
                show: false,
                css: "",
                okCallBack: () => {
                    
                }
            },
            confirm: {
                show: false,
                callback: clickOk => {
                    
                }
            },
            formData: {
                login: {
                    required: true,
                    css: "x123",
                    placeholder: "asdasda",
                    val: "",
                    type: "password",
                    hasEye: true,
                    //disabled: true,
                    valid: {
                        type: "num",
                        args: [1, 23]
                    }
                },
                selectManual: {
                    val: "1",
                    hasManual: true,
                    maxLength: 12,
                    manualText: "手动设置",
                    sortArray: [
                        {
                            title: "optionxxxxxxxxxxxxxxxxxxxxxx 1",
                            value: "1"
                        },
                        {
                            title: "optionxxxxxxxxxxxxxxxxxx 2",
                            value: "2"
                        },
                        {
                            title: "option 3",
                            value: "3"
                        }
                    ],
                    valid: {
                        type: "ascii"
                    },
                    changeCallBack: this.selectCallBack
                },
                select: {
                    val: "",
                    sortArray: [
                        {
                            title: "option 1",
                            value: "1"
                        },
                        {
                            title: "option 2",
                            value: "2"
                        },
                        {
                            title: "option 3",
                            value: "3"
                        }
                    ],
                    valid: {
                        type: "ascii"
                    },
                    changeCallBack: this.selectCallBack
                },
                radio: {
                    title: _("Login"),
                    options: {
                        "1": "label 1",
                        "2": "label 2",
                        "0": "label 0"
                    },
                    /*sortArray: [{
						value: "2",
						title: "label 2"
					},{
						value: "1",
						title: "label 1"
					},{
						value: "0",
						title: "label 0"
					}],*/
                    val: "",
                    changeCallBack(value) {

                    }
                },
                ssid: {
                    //required: true,
                    css: "x123",
                    placeholder: "ssid",
                    val: "",
                    type: "text",
                    //disabled: true,
                    valid: {
                        type: "ssid"
                    }
                },
                checkbox: {
                    options: {
                        "2": "label 2",
                        "0": "label 0",
                        "1": "label 1"
                    },
                    /*sortArray: [{
						value: "2",
						title: "label 2"
					},{
						value: "0",
						title: "label 0"
					},{
						value: "1",
						title: "label 1"
					}],*/
                    val: "",
                    changeCallBack(value) {
                        
                    }
                },
                switch: {
                    val: false,
                    changeCallBack(value) {
                        
                    }
                },
                box: {
                    title: _("xxxxxx"),
                    values: ["1", "0"],
                    val: "1",
                    changeCallBack(value) {
                        
                    }
                }
            }
        };
    },
    methods: {
        ...mapActions(["getMode"]),
        /* getMode(msg) {
				 this.$store.commit("getMode", msg);
				 //this.$store.dispatch('getMode');
			 }, */
        customEvent(value) {
            
        },
        add() {
            this.$store.dispatch("increment");
        },
        selectCallBack(value) {},

        showDialog() {
            this.dialog.show = true;
		},
		showDialog2() {
            this.$confirm({
				content: "<div>xxxxx</div>",
				parseHtml: true,
				title: "弹出层2"
			}).then((val)=>{
				
			}).catch(()=> {});
		},
		
        submit() {
            //method 1:
            let checkSuccess = this.checkFormData(this.formData);
            if (checkSuccess) {
                
            }
            /* this.checkFormData(this.formData).then(function() {
					console.log("check ok")
				}); */

            //this.test = true;
            //this.alert.show = true;
            //this.confirm.show = true;
            //this.$message("xxxxx");
            //this.$confirm("xxxx");
            /*this.$alert({
					content: "<div>xxxxx</div>",
					parseHtml: true,
					title: "123"
				}).then((val)=>{
					console.log("################## ", val);
				}).catch(()=> {})*/
        },
        progressBack() {
           
        }
    }
};
</script>