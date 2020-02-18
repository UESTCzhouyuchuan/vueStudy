<template>
  <div id="vuex1">
    <h1>{{count}}</h1>
    <el-button @click="commit('increase')">increase</el-button>
    <el-button @click="commit('decrease')">decrease</el-button>
    <vuex2></vuex2>
    <a href="/vuex2">vuex2</a>
  </div>
</template>
<script>
import vuex2 from "./vuex2";
export default {
  name: "vuex1",
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  components: { vuex2 },
  methods: {
    commit(value) {
      this.$store.commit(value, 1);
    }
  }
};
</script>