<template>
  <ul class="navigator">
    <li v-for="item in navConfig" :key="item.item">
      <template v-if="item.children.length > 1">
        <a>{{item.title}}</a>
        <ul>
          <li v-for="child in item.children" :key="child.item">
            <router-link :to="child.path">{{child.title}}</router-link>
          </li>
        </ul>
      </template>
      <router-link v-else :to="item.children[0].path">{{item.children[0].title}}</router-link>
    </li>
  </ul>
</template>
<script>
import navConfig from "@/router/config";

export default {
  data() {
    return {
      navConfig: JSON.parse(JSON.stringify(navConfig))
    };
  }
};
</script>
