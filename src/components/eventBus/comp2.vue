<template>
  <div id="eventBus-comp2">
    Comp2:
    <input :value="msg" @input="changeMsg" />
  </div>
</template>
<script>
export default {
  name: "eventBus-comp2",
  data() {
    return {
      msg: this.$bus.msg
    };
  },
  created() {
    this.$bus.$on("changeMsg", val => {
      console.log("in Comp2");
      this.msg = val;
    });
  },
  methods: {
    changeMsg($event) {
      const value = $event.target.value;
      this.$bus.$emit("changeMsg", value);
    }
  }
};
</script>