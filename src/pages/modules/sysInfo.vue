<template>
  <div>
    <h2>System Status!!! !!!</h2>

    <v-group title="下拉框">
      <v-select :dataKey="select"></v-select>
    </v-group>
    <v-group title="复选框">
      <v-checkbox :dataKey="checkbox"></v-checkbox>
    </v-group>
    <v-group title="单选框">
      <v-radio :dataKey="radio"></v-radio>
    </v-group>
    <v-group title="文本框">
      <v-input :dataKey="input"></v-input>
    </v-group>
    <v-group title="滑块">
      <v-slider min="1" max="23" v-model="slider"></v-slider>
    </v-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: {
        val: "",
        hasManual: true,
        manualText: "手动设置",
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
        }
      },
      checkbox: {
        title: _("Login"),
        sortArray: [
          {
            value: "2",
            title: "label 2"
          },
          {
            value: "0",
            title: "label 0"
          },
          {
            value: "1",
            title: "label 1"
          }
        ],
        key: ["2"],
        changeCallBack(value) {
          console.log("radio value ", value);
        }
      },
      radio: {
        title: _("Login"),
        sortArray: [
          {
            value: "2",
            title: "label 2"
          },
          {
            value: "0",
            title: "label 0"
          },
          {
            value: "1",
            title: "label 1"
          }
        ],
        //or
        options: {
          "1": "label 1",
          "2": "label 2",
          "0": "label 0"
        },
        val: "2",
        changeCallBack(value) {
          console.log("radio value ", value);
        }
      },
      input: {
        css: "input-small",
        title: _("Login"),
        placeholder: "Login Password",
        key: "",
        type: "password",
        valid: {
          type: "ascii"
        }
      },
      slider: 3
    };
  },
  methods: {
    setData(data) {
      this.select.val = data.select;
      this.checkbox.val = data.radio;
      this.radio.val = data.radio;
      this.input.val = data.input;
      this.slider = data.slider;
    },
    fetchData() {
      this.$http.getData("", "/goform/getSysInfo").then(data => {
        this.setData(data);
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>