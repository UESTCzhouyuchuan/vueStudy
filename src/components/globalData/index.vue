<template>
  <div id="globalData">
    index:
    <input v-model="state.msg" />
    <comp1></comp1>
    <comp2></comp2>
  </div>
</template>
<script>
import state from "../../state";
import comp1 from "./comp1";
import comp2 from "./comp2";
export default {
  name: "globalData",
  components: { comp1, comp2 },
  data() {
    return { state };
  }
};
</script>