<template>
  <div id="Home">
    <el-image :src="logoURL"></el-image>
    <div class="grid">
      <router-link :to="{ name: 'ljb'}">/宿管会垃圾表</router-link>
      <router-link :to="{ name: 'myClass'}">/我的大二班</router-link>
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
  grid-template-columns: repeat(2, 150px);
  grid-template-rows: auto;
  grid-gap: 20px;
  place-items: center center;
  place-content: center center;
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
