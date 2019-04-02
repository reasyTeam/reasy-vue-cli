<template>
	<router-link :to="{ params: { userId: 'quickset' }}">User</router-link>
</template>
<script type="text/javascript">
	export default {
		beforeCreate() {
			this.$router.push('/user/quickset');
		},
	}
</script>