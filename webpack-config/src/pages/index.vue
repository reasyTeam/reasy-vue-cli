<template>
  <div class="main-page">
    <head-bar></head-bar>
    <div class="main-content clear-fix">
      <div class="mian-nav float-l">
        <navigator></navigator>
      </div>
      <div class="mian-bg-bar"></div>
      <div class="main-content-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import headBar from "@/pages/components/header";
import navigator from "@/pages/navigator";

export default {
  data() {
    return {};
  },
  components: {
    headBar,
    navigator
  }
};
</script>

<style lang="scss">
.main-content {
  overflow: hidden;
  background-color: #fff;
  position: relative;
}
.mian-nav {
  width: 200px;
  padding: 4px 0 0;
}
.mian-bg-bar {
  background-color: $main-bg-color;
  position: absolute;
  left: 200px;
  width: 10px;
  top: 0;
  bottom: 0;
}
.main-content-box {
  margin-left: 210px;
  padding: 0 30px;
}
</style>


