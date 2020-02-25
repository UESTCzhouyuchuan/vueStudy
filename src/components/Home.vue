<template>
  <div id="Home">
    <el-image :src="logoURL"></el-image>
    <div class="grid">
      <router-link :to="{ name: 'ljb' }">/宿管会垃圾表</router-link>
      <router-link :to="{ name: 'myClass' }">/我的大二班</router-link>
      <router-link :to="{ name: 'unicode' }">/unicode转码</router-link>
      <router-link :to="{ name: 'luck' }">/幸运抽奖</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      logoURL: require("@/assets/logo.png")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  display: grid;
  font-size: 0.8rem;
  grid-template-columns: repeat(3, 32%);
  grid-template-rows: auto;
  grid-gap: 0.5rem;
  place-items: center center;
  place-content: center center;
}
.grid * {
  text-decoration: #2e86de;
  border: 1px solid #eee;
  padding: 0.2rem 0.4rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
