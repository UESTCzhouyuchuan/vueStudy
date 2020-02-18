<template>
  <div id="vuex2">
    <h1>{{count}}</h1>
    <el-button @click="commit('increase')">increase</el-button>
    <el-button @click="commit('decrease')">decrease</el-button>
  </div>
</template>
<script>
export default {
  name: "vuex2",
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    commit(value) {
      this.$store.commit(value, 1);
    }
  }
};
</script>