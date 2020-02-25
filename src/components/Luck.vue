<template>
  <div>
    <div class="box">
      <div class="circle">
        <a href="#">{{current_number}}</a>
      </div>
      <div class="name">{{classNumber[current_number]}}</div>
    </div>
    <el-row>
      <el-button type="success" @click="run">{{run_flag?"停止":"开始"}}</el-button>
    </el-row>
    <p>核心算法：this.current_number = Math.floor(Math.random() * 28 + 1);</p>
  </div>
</template>
<script>
export default {
  name: "Luck",
  data() {
    return {
      current_number: 1,
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
      ],
      classNumber_len: 28,
      run_flag: false,
      timer: null
    };
  },
  methods: {
    run() {
      if (this.run_flag) {
        setTimeout(() => clearInterval(this.timer), 300);
        this.run_flag = false;
      } else {
        this.run_flag = true;
        this.timer = setInterval(this.random, 100);
      }
    },
    random() {
      this.current_number = Math.floor(Math.random() * 28 + 1);
    }
  }
};
</script>
<style scoped>
.box {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box .circle {
  box-sizing: border-box;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  height: 60px;
  width: 60px;
  padding: 6px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(0deg, #ddd, #fff);
  transition: 0.5s;
  cursor: pointer;
}
.circle:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.box .circle a {
  text-decoration: none;
  color: #2e86de;
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  line-height: 42px;
  font-size: 1.5rem;
  background: linear-gradient(180deg, #ddd, #fff);
}
.name {
  margin: 20px auto 0;
  background: #1dd1a1;
  border: none;
  outline: none;
  color: #fff;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 8px;
}
p {
  display: block;
  margin-top: 20px;
  font-family: "Courier New", Courier, monospace;
}
</style>