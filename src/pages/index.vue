<template>
  <div class="main-page">
    <div class="navigator">
      <navigator></navigator>
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import navigator from "@/pages/navigator";

export default {
  data() {
    return {};
  },
  components: { navigator }
};
</script>

