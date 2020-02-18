<template>
  <div id="eventBus-comp1">
    Comp1:
    <input :value="msg" @input="changeMsg" />
  </div>
</template>
<script>
export default {
  name: "eventBus-comp1",
  data() {
    return {
      msg: this.$bus.msg
    };
  },
  created() {
    this.$bus.$on("changeMsg", val => {
      console.log("in Comp1");
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