<template>
  <div class="select-wrap">
    <el-form :model="data" ref="data" label-position="left" label-width="0px" class="select-box">
      <el-form-item prop="rooms">
        <i class="el-icon-school" style="font-size: 1.2rem"></i>
        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        <span class="demonstration">选择楼栋房间：</span>
        <el-cascader
          style="width:50%"
          placeholder="可搜索"
          v-model="data.rooms"
          size="medium"
          clearable
          :change="change()"
          :show-all-levels="false"
          :options="options"
          :props="{ multiple: true,emitPath: true,leaf: 'value'}"
          filterable
          :getCheckedNodes="true"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-popover placement="bottom" width="160" v-model="visible">
          <p>{{msg}}确定提交吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visible = false || submit()">确定</el-button>
          </div>
          <el-button slot="reference" type="primary">立即创建</el-button>
        </el-popover>&nbsp;&nbsp;
        <el-popover placement="top-start" title="提示" width="200" trigger="hover" content="输入框内将被清空">
          <el-button @click="resetForm('data')" slot="reference">重置</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
    <el-button size="small" type="primary" @click="down()">点击下载</el-button>
    <div slot="tip" class="el-upload__tip" style="color:orange;">当前可下载：{{fileName}}</div>
  </div>
</template>

<script>
export default {
  name: "ljb",
  beforeCreate() {
    let pageHeight = window.innerHeight;
    let pageWidth = window.innerWidth;
    if (typeof pageWidth !== "number") {
      if (document.compatMode == "CSS1Compat") {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
      } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
      }
    }
    const docStyle = document.documentElement.style;
    docStyle.setProperty("--width", pageWidth);
    docStyle.setProperty("--height", pageHeight);
  },
  methods: {
    change() {},
    download() {
      if (!(this.id > 0)) {
        this.$message({
          message: "当前无可用下载",
          type: "warning"
        });
        console.log("no-download");
      } else {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        console.log("download");
        let url = "http://49.233.169.5:3000/xlsx/" + this.id;
        this.axios({
          url: url,
          method: "post",
          responseType: "blob"
        })
          .then(res => {
            const content = res.data;
            const blob = new Blob([content]);
            const fileName = this.fileName;
            if ("download" in document.createElement("a")) {
              // 支持a标签download的浏览器
              const link = document.createElement("a"); // 创建a标签
              link.download = fileName; // a标签添加属性
              link.style.display = "none";
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click(); // 执行下载
              URL.revokeObjectURL(link.href); // 释放url
              document.body.removeChild(link); // 释放标签
            } else {
              // 其他浏览器
              navigator.msSaveBlob(blob, fileName);
            }
            loading.close();
            this.$notify({
              title: "成功",
              message: "成功下载",
              type: "success"
            });
          })
          .catch(err => {
            console.log(err);
            loading.close();
            this.$notify({
              message: "下载失败",
              type: "error"
            });
          });
      }
    },
    throttle(cb, deny) {
      let lastTimer = 0;
      return function(...args) {
        if (new Date() - lastTimer > deny) {
          lastTimer = new Date();
          cb(args);
        }
      };
    },
    submitForm() {
      const loading = this.$loading({
        lock: true,
        text: "正在提交loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log(this.data);
      let obj = {
        XY02: [],
        XY03: [],
        XY04: [],
        XY05: [],
        XY06: [],
        XN12: [],
        XN14: [],
        XN16: []
      };
      for (let i of this.data.rooms) {
        obj[i[0]].push(i[2]);
      }
      for (let i in obj) {
        obj[i].sort();
      }
      console.log(obj);
      this.axios
        .post("http://49.233.169.5:3000/ljb", obj)
        .then(res => {
          console.log(res);
          let data = JSON.parse(res.data);
          console.log(data);
          if (data.error !== undefined) {
            this.$message({
              message: data.error,
              type: "error"
            });
            loading.close();
            return;
          }
          let stdout = data.stdout;
          stdout = stdout.split("#");
          console.log(stdout);
          let currentWeek = stdout[0].split(":")[1];
          console.log(currentWeek);
          this.$cookies.set("currentWeek", currentWeek, -1);
          this.id = currentWeek;
          loading.close();
          this.$notify({
            message: "提交成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
          loading.close();
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    msg() {
      return this.data.rooms.length ? "滴滴，" : "未选择房间，";
    },
    fileName() {
      return this.id > 0
        ? "2019-2020-1学期沙河校区第" + this.id + "周门口垃圾总表.xlsx"
        : "无文件可下载";
    }
  },
  data() {
    return {
      id: this.$cookies.get("currentWeek"),
      visible: false,
      data: {
        rooms: []
      },
      submit: this.throttle(this.submitForm, 4000),
      down: this.throttle(this.download, 4000),
      options: [
        {
          value: "XY02",
          label: "2栋",
          multiple: false,
          children: new Array(6).fill(0).map((v, i1) => ({
            value: i1 + 1,
            label: i1 + 1 + "层",
            multiple: true,
            children: new Array(43).fill(0).map((v, i2) => ({
              value: parseInt("" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)),
              label: "" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)
            }))
          }))
        },
        {
          value: "XY05",
          label: "5栋",
          multiple: false,
          children: new Array(6).fill(0).map((v, i1) => ({
            value: i1 + 2,
            label: i1 + 2 + "层",
            multiple: true,
            children: new Array(43).fill(0).map((v, i2) => ({
              value: parseInt("" + (i1 + 2) + (i2 < 9 ? 0 : "") + (i2 + 1)),
              label: "" + (i1 + 2) + (i2 < 9 ? 0 : "") + (i2 + 1)
            }))
          }))
        },
        {
          value: "XY06",
          label: "6栋",
          multiple: false,
          children: new Array(7).fill(0).map((v, i1) => ({
            value: i1 + 1,
            label: i1 + 1 + "层",
            multiple: true,
            children: new Array(43).fill(0).map((v, i2) => ({
              value: parseInt("" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)),
              label: "" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)
            }))
          }))
        },
        {
          value: "XN12",
          label: "12栋",
          multiple: false,
          children: new Array(4).fill(0).map((v, i1) => ({
            value: i1 + 1,
            label: i1 + 1 + "层",
            multiple: true,
            children: new Array(30).fill(0).map((v, i2) => ({
              value: parseInt("" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)),
              label: "" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)
            }))
          }))
        },
        {
          value: "XN14",
          label: "14栋",
          multiple: false,
          children: new Array(6).fill(0).map((v, i1) => ({
            value: i1 + 1,
            label: i1 + 1 + "层",
            multiple: true,
            children: new Array(18).fill(0).map((v, i2) => ({
              value: parseInt("" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)),
              label: "" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)
            }))
          }))
        },
        {
          value: "XN16",
          label: "16栋",
          multiple: false,
          children: new Array(6).fill(0).map((v, i1) => ({
            value: i1 + 1,
            label: i1 + 1 + "层",
            multiple: true,
            children: new Array(18).fill(0).map((v, i2) => ({
              value: parseInt("" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)),
              label: "" + (i1 + 1) + (i2 < 9 ? 0 : "") + (i2 + 1)
            }))
          }))
        }
      ]
    };
  }
};
</script>
<style>
.select-wrap {
  height: 100vh;
  width: 100vw;
  background: url("https://yulovexin.xyz/images/tmp/sgh.jpg");
  background-size: 100% 100%;
  float: left;
}
.select-box {
  margin-top: 100px;
}
</style>
