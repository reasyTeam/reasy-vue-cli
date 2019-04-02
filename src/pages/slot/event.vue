<template>
    <div>
        <v-group title="xxxx">
            <v-input @custom-event="customEvent" :data-key="input"></v-input>
            <span class="code" parse-html="true" v-tooltip="input.code">code</span>
        </v-group>
        <div>
            {{input.val | upperCase}}
        </div>
        
        <div>
            <v-button :callback="changeRouter" title="重定向" ></v-button>
            <v-button :callback="refresh" title="刷新" ></v-button>
        </div>
        <pre class="code">
            &lt;v-button @callback="changeRouter" title="重定向"&gt;&lt;/v-button&gt;
        </pre>
        <div>
            <button class="btn btn-primary" @click="alert">警告</button>
            
        </div>
        <pre class="code">
            &lt;button class="btn btn-primary" @click="alert"&gt;警告&lt;/button&gt;
            </pre>
        <div>
            <button class="btn btn-primary" @click="confirm()">确认</button>
        </div>
    </div>
</template>

<script>
export default {
    inject: ["reload"],
    data() {
        return {
            input: {
                code: `<pre>
                &lt;v-input @custom-event="customEvent" :data-key="input"&gt;&lt;/v-input&gt;
                //js
                input: {
                    placeholder: "请输入密码",
                    val: "123",
                    type: "password",
                    hasEye: true,
                    //disabled: true,
                    valid: {
                        type: "ascii",
                        args: [1, 23]
                    }
                }</pre>`,
                placeholder: "请输入密码",
                val: "123",
                type: "password",
                hasEye: true,
                maxlength: 23,
                //disabled: true,
                valid: {
                    type: "ascii",
                    args: [1, 23]
                }
            }
        };
    },
    methods: {
        customEvent(value) {
            console.log("custom-event", value);
        },
        changeRouter() {
            this.reload("/status/system/internet");
        },
        refresh() {
            this.reload();
        },
        alert() {
            this.$alert("xxxxxxxxxxxx");
        },
        confirm() {
            this.$confirm({
                title: "确认",
                content: "RRRRRRRRRRRRRRRRRRRR"
            }).then(function() {
                console.log("OK")
            }).catch(function() {
                console.log("cancel")
            });
        },
        mouseEnter() {
            console.log("mouse enter");
        },
        mouseLeave() {
            console.log("mouse leave");
        }
    }

}
</script>
<style>
.code {
    background: #eee;
    display: inline-block;
    padding: 4px;
    border: 1px solid #ccc;
    margin: 15px 0;
}
</style>


