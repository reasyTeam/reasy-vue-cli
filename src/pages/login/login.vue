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
export default {};
</script>