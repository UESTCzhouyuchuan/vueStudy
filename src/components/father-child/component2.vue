<template>
  <div id="comp2">
    comp2:
    <input :value="value" @input="changeMsg" />
  </div>
</template>
<script>
export default {
  name: "component2",
  props: ["value"],
  data() {
    return {};
  },
  methods: {
    changeMsg($event) {
      this.$emit("input", $event.target.value);
    }
  }
};
</script>