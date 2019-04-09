<template>
  <ul class="navigator">
    <li v-for="item in navConfig" :key="item.item">
      <template v-if="item.children.length > 1">
        <router-link
          :to="item.children[0].path"
          class="nav-title item-text"
          :class="activeGroup=== item.item ? 'active':''"
        >{{item.title}}</router-link>
        <ul v-show="activeGroup=== item.item ">
          <li v-for="child in item.children" :key="child.item">
            <router-link :to="child.path" class="inline item-text">{{child.title}}</router-link>
          </li>
        </ul>
      </template>
      <router-link v-else :to="item.children[0].path" class="item-text">{{item.children[0].title}}</router-link>
    </li>
  </ul>
</template>

<script>
import navConfig from "@/router/config";

let pathToGroup = {};
navConfig.forEach(nav => {
  if (nav.children.length > 1) {
    nav.children.forEach(child => {
      pathToGroup[child.path] = nav.item;
    });
  }
});

export default {
  data() {
    return {
      activeGroup: "",
      navConfig: JSON.parse(JSON.stringify(navConfig))
    };
  },
  methods: {
    updateItem() {
      this.activeGroup = pathToGroup[this.$route.path];
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "updateItem"
  },
  created() {
    this.updateItem();
  }
};
</script>

<style lang="scss">
.item-text {
  padding-bottom: 1px;
  font-size: 16px;
  padding-left: 40px;
  position: relative;
  display: block;
  line-height: 60px;
  height: 60px;
  white-space: nowrap;
  background-color: #fff;

  &.inline {
    padding-left: 54px;
  }
}

.router-link-active {
  background-color: $main-active-color;
  color: #fff;
}

.nav-title {
  &.active,
  &.router-link-active {
    color: $main-active-color;
    background-color: #fff;
  }
}
</style>

