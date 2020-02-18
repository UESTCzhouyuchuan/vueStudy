<template>
  <div id="globalData">
    index:
    <input v-model="$bus.msg" />
    <comp1></comp1>
    <comp2></comp2>
    <a href="./home">12313</a>
  </div>
</template>
<script>
import comp1 from "./comp1";
import comp2 from "./comp2";
export default {
  name: "globalData",
  components: { comp1, comp2 },
  data() {
    return {};
  }
};
</script>