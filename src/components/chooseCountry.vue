<template>
  <div id="chooseCountry" @click.self="hide_notice()">
    <div class="search-box">
      <label for="search-input"></label>
      <input id="search-input" v-model.trim="input_msg"
             @input="input_search_event()"
             @focus="input_focus_event()"/>
      <div class="search-icon-box">
        <div class="search-icon"></div>
      </div>
      <div id="search-notice-list" v-if="show_notice" @click="hide_notice">
        <div v-for="item in search_related_res" :key='item.id'>
          <div class="search-related"
               @click.stop="click_search_related(item)">
            {{item}}
          </div>
        </div>
        <div class="search-related-last"></div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
  export default {
    name: 'chooseCountry',
    // 定义数据
    data: function () {
      return {
        twoName: [], // 缩写
        threeName: [], // 三位缩写
        code: [], // 国际代码
        isoCode: [], // ISO 3166-2相应代码
        enName: [], //  英文
        cnName: [], // 汉语名字
        twName: [], // 台湾
        hkName: [], // 香港叫法
        notice: [], // 备注
        phonePrefix: [], // 电话前缀
        input_msg: '', // 当前输入
        previous_input_msg: '', // 上一次输入
        search_related_res: [], // 相关内容
        show_notice: false // 显示相关内容
      }
    },
    // 声明周期函数，在数据完成初始化后执行
    created: function () {
      // 网页url，利用方向代理解决同源策略
      let url = '/country/iso-3166-1'
      let html = '' // 网页源码
      // 提取的dom标签的正则表达式
      let tbodyReg = new RegExp('<tbody>(.*)</tbody>')
      let trReg = new RegExp('<tr>(.*?)</tr>', 'g')
      let tdReg = new RegExp('<td>(.*?)</td>', 'g')
      // 利用axios请求网页
      this.axios.get(url)
        .then(res => {
          // 获得网页data
          html = res.data
          // 先去掉网页中的空格回车等，解决换行导致正则表达式万能符号.不能表示回车的问题
          html = html.replace(/\s+/g, '')
          // 获得表格的tbody
          let tbody = html.match(tbodyReg)
          // 获得去掉两边tbody的结果
          tbody = tbody[1]
          let tr
          // 遍历每个tr即每行，采用exec逐个遍历的形式，不用match，因为match在g模式下，不会去掉两边的tr标签
          while (true) {
            // 先判断返回值，不为空时再取下标
            tr = trReg.exec(tbody)
            if (!tr) {
              break
            }
            tr = tr[1]
            // 利用match获得tr的每一列
            let tds = tr.match(tdReg)
            // 去掉数组中两边的td标签
            tds = tds.toString().replace(/<td>/g, '')
              .replace(/<\/td>/g, '').split(',')
            // console.log(tds)
            // 把结果按顺序放到各个变量中
            this.twoName.push(tds[0])
            this.threeName.push(tds[1])
            this.code.push(tds[2])
            this.isoCode.push(tds[3])
            this.enName.push(tds[4])
            this.cnName.push(tds[5])
            this.twName.push(tds[6])
            this.hkName.push(tds[7])
            this.notice.push(tds[8])
          }
        })
        // 捕捉错误
        .catch(err => {
          console.log('Error 出错了', err)
        })
    },
    methods: {
      // 点击搜索联想的词，放到input中，然后隐藏
      click_search_related: function (content) {
        // 提示词例外
        if (content !== '未搜到相关国家') {
          this.input_msg = content
          this.hide_notice()
        }
      },
      // 获得焦点时字符不为空时，显示联想词汇
      input_focus_event: function () {
        if (this.input_msg) {
          this.show_notice = true
        }
      },
      // 搜索1
      // eslint-disable-next-line
      search: function (msg) {
        let value
        this.search_related_res = []
        // 先在汉字中搜索
        for (value of this.cnName) {
          // console.log(msg + value + value.indexOf(msg))
          if (value.indexOf(msg) > -1) {
            this.search_related_res.push(value)
          }
        }
        // 若没有，在英语中搜索
        if (!this.search_related_res.length) {
          for (value of this.enName) {
            // console.log(msg + value + value.indexOf(msg))
            if (value.toLowerCase().indexOf(msg.toLowerCase()) > -1) {
              this.search_related_res.push(value)
            }
          }
        }
        if (!this.search_related_res.length) {
          for (value of this.twName) {
            // console.log(msg + value + value.indexOf(msg))
            if (value.indexOf(msg) > -1) {
              this.search_related_res.push(value)
            }
          }
        }
        if (!this.search_related_res.length) {
          for (value of this.hkName) {
            // console.log(msg + value + value.indexOf(msg))
            if (value.indexOf(msg) > -1) {
              this.search_related_res.push(value)
            }
          }
        }
        // console.log(this.search_related_res)
        if (!this.search_related_res.length) {
          this.search_related_res.push('未搜到相关国家')
        }
      },
      // 输入时触发，与上一次比较，不一样就触发搜索函数，不用change因为change只能在失去焦点后才触发
      input_search_event: function () {
        let msg = this.input_msg
        if (msg !== this.previous_input_msg) {
          this.previous_input_msg = msg
          if (msg) {
            this.search(msg)
            this.show_notice = true
          } else {
            this.hide_notice()
          }
        }
      },
      // 隐藏notice
      hide_notice () {
        this.show_notice = false
      }
    }
  }
</script>

<style scoped>
  #chooseCountry {
    padding: 0;
    margin: 0;
    position: relative;
  }

  #search-notice-list {
    width: 240px;
    display: block;
    position: absolute;
    top: 35px;
    left: 1px;
    max-height: 250px;
    overflow-y: auto;
    box-shadow: 2px 4px 8px rgba(7, 17, 27, 0.1),
    -2px 4px 8px rgba(7, 17, 27, 0.1);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  #search-notice-list .search-related {
    height: 16px;
    padding: 8px 10px;
    text-align: left;
    font-size: 12px;
  }

  #search-notice-list .search-related:hover {
    background-color: #cccccc;
  }

  #search-notice-list .search-related-last {
    height: 20px;
  }

  .search-box {
    position: relative;
    margin: auto;
    width: 240px;
  }

  #search-input {
    padding: 0 30px 0 10px;
    position: relative;
    height: 30px;
    width: 200px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    -webkit-transition: width 0.3s;
    -moz-transition: width 0.3s;
    transition: width 0.3s;
  }

  .search-icon-box {
    position: absolute;
    display: block;
    right: -2px;
    top: 0;
    height: 30px;
    width: 30px;
    cursor: pointer;
    background-color: #ffffff;
    overflow: hidden;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    border-right: 1px solid rgba(0, 0, 0, 0.4);
  }

  .search-icon {
    margin: 5px 0;
    position: relative;
    display: inline-block;
    padding: 0 5px;
    width: 20px;
    height: 20px;
    background: url(https://yulovexin.xyz/images/search.png) no-repeat center;
    -webkit-background-size: 20px 20px;
    background-size: 20px 20px;
  }

  .search-icon-box:hover .search-icon {
    left: -30px;
    border-right: 30px solid transparent;
    -webkit-filter: drop-shadow(30px 0 0px #ff48fb);
    filter: drop-shadow(30px 0 0px #ff48fb);
    /*这样使用不可以因为背景不是透明*/
    /*background-image: linear-gradient(red, red);*/
    /*background-blend-mode: lighten;*/
  }

  .search-icon-box:hover {
    background-color: green;
  }
</style>
