<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
var Child = {
  template: '<h1>子组件1 {{child}}</h1>',
  data: function() {
      return {
          child: "child 1"
      }
  }
};
export default {
    name: "App",
    components: {
        
        'v-child': Child
    }
};
</script>