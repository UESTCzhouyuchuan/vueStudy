<template>
  <div id="comp1">
    component1:
    <input v-model="msg" key="comp1" />
    <component2 v-model="msg"></component2>
  </div>
</template>
<script>
import component2 from "./component2";
export default {
  name: "component1",
  data() {
    return {
      msg: 123
    };
  },
  components: { component2 },
  methods: {
    changeMsg($event) {
      this.msg = $event;
    }
  }
};
</script>