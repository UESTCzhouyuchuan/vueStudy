<template>
  <div id="unicode_transcode">
    <h2>unicode双向转码工具</h2>
    <div style="text-align: left;">
      <h4>使用说明</h4>
      <p>
        <br />
        <strong>unicode编码转字符：</strong>输入unicode码，例如\u1f499\u1f498,其转码结果💙💘会自动显示。注意，中间不能有空格，必须是合法的unicode码。
        <br />
        <strong>字符转编码：</strong>在下方的输入框中输入符号，如💙💘会在上方的输入框中显示其转码结果。
        <br />
      </p>
    </div>
    <el-form label-position="left">
      <el-form-item label="unicode码">
        <el-input
          :value="unicode_value"
          clearable
          @input="event_input_unicode($event)"
          placeholder="请输入unicode码"
          id="id_copy_unicode_value"
        >
          <template slot="prepend">0x</template>
          <el-button
            slot="append"
            icon="el-icon-document-copy"
            @click="copyToClipBoarder('id_copy_unicode_value')"
            id="copy_icon"
          >复制</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="转码后结果">
        <Copy v-bind:content="unicode_content" @change_unicode="event_change_unicode_content"></Copy>
      </el-form-item>
      <el-radio-group v-model="hasSpace" size="small">
        <el-radio-button :label="true">字符之间有空格</el-radio-button>
        <el-radio-button :label="false">字符之间无空格</el-radio-button>
      </el-radio-group>
    </el-form>
  </div>
</template>
<script>
import Copy from "./Copy.vue";
export default {
  name: "unicode",
  data() {
    return {
      unicode_value: "",
      unicode_content: "",
      hasSpace: false
    };
  },
  components: {
    Copy
  },
  methods: {
    event_change_unicode_content($event) {
      // console.log("获得Copy传递的unicode", $event);
      let str = $event;
      // console.log(this.hasSpace);
      if (this.hasSpace) {
        str = str.split(/\s/);
      } else {
        str = [...str];
      }
      console.log(str);
      let unicode = str
        .map(v => (v == "" ? "" : "\\u" + v.codePointAt(0).toString(16)))
        .join("");
      // console.log(unicode);
      this.unicode_value = unicode;
    },
    event_input_unicode(newValue) {
      this.unicode_value = newValue;
      if (newValue) {
        // console.log(newValue);
        if (newValue.endsWith("\\") || newValue.endsWith("\\u")) return;
        let arr = newValue.split("\\u");
        if (arr[0] == "\\" || arr.length == 1) {
          return;
        }
        arr.shift();
        // console.log("arr", arr);
        let unicode = arr.map(v => {
          if (v == "") return "";
          let number = Number("0x" + v);
          if (isNaN(number)) return "";
          else return String.fromCodePoint("0x" + v);
        });
        // console.log("unicode", unicode);
        this.unicode_content = unicode.join("");
      }
    },
    copyToClipBoarder(id) {
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
  },
  watch: {}
};
</script>
<style scoped>
#unicode_transcode {
  width: 50%;
  box-sizing: border-box;
  margin: auto;
}
@media screen and (max-width: 500px) {
  #unicode_transcode {
    width: 100%;
  }
}
#copy_icon:hover {
  color: #54a0ff;
}
</style>
