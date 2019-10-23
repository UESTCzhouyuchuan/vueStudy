<template>
  <div id="3-1">
    <input v-model="password"/>
    <button type="submit" @click="check">提交</button>
    <div>你的输入是{{password}}</div>
    <div v-if="tip" style="color:red">提示：{{tip}}</div>
  </div>
</template>

<script>
  export default {
    name: '3-1',
    data () {
      return {
        password: '',
        tip: ''
      }
    },
    methods: {
      check () {
        this.tip = 'test'
      }
    },
    watch: {
      // eslint-disable-next-line vue/no-dupe-keys
      password: function () {
        // eslint-disable-next-line max-len
        if (/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/.test(this.password)) {
          this.tip = '口令符合格式'
        } else {
          this.tip = '口令不符合格式，数字大小写字母特殊字符四者之三，8到30位'
        }
      }
    }
  }
</script>

<style scoped>

</style>
