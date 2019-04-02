<template>
    <div class="form-group" :class="css" v-show="show!==false">
        <label class="form-title" v-if="title">{{title}}</label>
        <div class="form-content">
	        <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "v-group",
    props: ["css", "show", "title"],
    data() {
    	return  {}
    }
}
</script>
