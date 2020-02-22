<template>
  <div id="myClass">
    <h2>报平安小插件</h2>
    <p>
      使用说明：
      <br />
      <strong>第一步：</strong>先输入你在大二班的编号，比如6，会自动识别你是周玉川。你上一次输入的编号会作为cookie记录下来。
      <br />
      <strong>第二步：</strong>然后粘贴你copy的上一位报平安的文字。
      <br />
      <strong>第三步：</strong>点击按钮copy文字，插件会自动把你的编号以及名字放到文字中。
      <br />
      <strong>第四步：</strong>发到班群中。
      <br />
    </p>
    <div class="wrap">
      <el-alert
        title="请输入number"
        type="warning"
        center
        show-icon
        :closable="false"
        v-show="!number"
      ></el-alert>
      <el-form label-position="top" label-width="80px">
        <el-form-item label="你的编号">
          <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item label="黏贴上一位的报平安文字">
          <el-input
            class="el-input"
            placeholder="请输入上一位的报平安文字"
            v-model="input"
            type="textarea"
            :autosize="{ minRows: 2,maxRows: 4}"
          >
            <i slot="suffix" class="el-input__icon el-icon-document-copy"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="你的报平安文字">
          <el-input
            class="el-input"
            placeholder="这是你的报平安文字"
            v-model="output"
            id="copyInput"
            type="textarea"
            :autosize="{ minRows: 2,maxRows: 4}"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="copyToClipBoarder()">立即复制</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "myClass",
  data() {
    return {
      number: null,
      input: "",
      output: "",
      classNumber: [
        null,
        "胡旺洋",
        "罗嗣达",
        "朱思宇",
        "蓝浩诚",
        "苏一博",
        "周玉川",
        "陈子琦",
        "李松浩",
        "陆圣珩",
        "何睿",
        "孙玉龙",
        "宋书玮",
        "郝若帆",
        "雷靖楠",
        "赵子号",
        "孙逸翔",
        "黎蕴锋",
        "夏靖森",
        "张澜潇",
        "谯凯",
        "杨榆丰",
        "禾文波",
        "冉鸿飞",
        "张妍",
        "杨懿斐",
        "曾慧娴",
        "戴芙蓉",
        "潘衍伶"
      ]
    };
  },
  mounted() {
    this.number = this.$cookies.get("myClassNumber");
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
    input: function(value) {
      if (!this.number) {
        return;
      }
      // console.log(value);
      let values = value.split("\n").reduce((total, value) => {
        let t = value.split(".");
        total[+t[0]] = t[1];
        return total;
      }, new Array(30));
      let res = Array.from(values);
      res[this.number] = this.classNumber[this.number] + " 无异常";
      this.output = res.reduce((total, value, index) => {
        if (!value) return total;
        total += index + "." + value + "\n";
        return total;
      }, "");
      // console.log(this.output);
      this.$cookies.set("myClassNumber", this.number);
    },
    number: function(value) {
      this.output = value + "." + this.classNumber[this.number] + " 无异常";
    }
  }
};
</script>
<style scoped>
#myClass {
  background: #eee;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
#myClass p {
  padding: 20px;
  text-align: left;
}
.wrap {
  width: 40%;
}
@media screen and (max-width: 500px) {
  .wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>