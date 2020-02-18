<template>
  <div id="comp1">
    Comp1:
    <input v-model="state.msg" />
  </div>
</template>
<script>
import state from "../../state.js";
export default {
  name: "comp1",
  data() {
    return {
      state
    };
  }
};
</script>