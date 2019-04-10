<template>
  <div id="header" class="header">
    <img src="@/assets/img/logo.png" class="head-logo" alt="tenda">
    <div class="header-drop">
      <a href="/goform/logout">{{_('Logout')}}</a>
      <!-- 语言切换 -->
    </div>
  </div>
</template>

<style lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 14px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  border-bottom: 1px solid $main-active-color;
}

.head-logo {
  height: 30px;
  vertical-align: middle;
}

.header-drop {
  position: absolute;
  top: 0;
  height: 60px;
  right: 14px;
}
</style>


