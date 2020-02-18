<template>
  <div id="comp2">
    Comp2:
    <input v-model="state.msg" />
  </div>
</template>
<script>
import state from "../../state.js";
export default {
  name: "comp2",
  data() {
    return {
      state
    };
  }
};
</script>