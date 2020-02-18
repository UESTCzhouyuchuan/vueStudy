<!-- @format -->

<template>
	<div id="main" v-wechat-title="$route.meta.title">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "app",
	};
</script>

<style>
	#main {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
