<template>
  <el-input
    clearable
    placeholder="请输入内容"
    :value="content_value"
    @input="event_input"
    id="id_copy_content_value"
  >
    <el-button
      slot="append"
      icon="el-icon-document-copy"
      @click="event_copyToClipBoarder('id_copy_content_value')"
      id="id_copy_click_icon"
    >复制</el-button>
  </el-input>
</template>
<script>
export default {
  name: "copy",
  props: ["content"],
  data() {
    return {
      content_value: ""
    };
  },
  watch: {
    content(newValue) {
      this.content_value = newValue;
    }
  },
  methods: {
    event_input($event) {
      this.content_value = $event;
      this.$emit("change_unicode", $event);
    },
    event_copyToClipBoarder(id) {
      let input = document.getElementById(id);
      input.select();
      let ret = document.execCommand("copy");
      if (ret) {
        this.$message({
          message: "成功复制",
          type: "success"
        });
      } else {
        this.$message({
          message: "复制失败",
          type: "error"
        });
      }
      window.getSelection().removeAllRanges();
    }
  }
};
</script>
<style scoped>
#copy {
  padding: 0;
  margin: 0;
}
#id_copy_click_icon:hover {
  color: #54a0ff;
}
</style>
