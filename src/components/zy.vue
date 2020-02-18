<template>
  <div id="zy">
    <el-input placeholder="请输入内容" v-model="zhongYao" clearable></el-input>
    <el-input class="el-input" :rows="3" placeholder="请输入内容" v-model="output" id="copyInput">
      <i
        slot="suffix"
        class="el-input__icon el-icon-document-copy copy"
        @click="copyToClipBoarder(output)"
      ></i>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "zy",
  data() {
    return {
      zhongYao: "",
      output: ""
    };
  },
  methods: {
    copyToClipBoarder() {
      let input = document.getElementById("copyInput");
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
  },
  watch: {
    zhongYao: function(newVal) {
      this.output = newVal
        .split(/\s/)
        .filter(val => val)
        .join(" ");
    }
  }
};
</script>
<style>
#zy {
  width: 30%;
  margin: 10vh auto;
}
.el-input {
  margin-top: 20px;
}
.copy:hover {
  color: green;
}
</style>