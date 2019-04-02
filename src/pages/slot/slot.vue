<template>
    <div>
        <tpl-slot>
            <template v-slot:footer>
                this is footer
            </template>
            <template v-slot:main>
                this is main
            </template>
            <template v-slot:header>
                this is header
            </template>
            <div>
                Other content
            </div>
        </tpl-slot>
        <v-child></v-child>
        <v-child2></v-child2>
        <component is="v-child2" text="child 3"></component>
        
    </div>
</template>
<script>

import Vue from 'vue';

var Child = {
  template: '<h1>子组件1 {{child}}</h1>',
  data: function() {
      return {
          child: "child 1"
      }
  }
};

Vue.component('v-child2', {
    template:`<div>
        <h1>子组件2 {{child}} {{text}}</h1>
    </div>`,
    props: ["text"],
    data: function() {
      return {
          child: "child 2"
      }
  }
});

export default {
    components: {
        
        'v-child': Child
    }
}
</script>

