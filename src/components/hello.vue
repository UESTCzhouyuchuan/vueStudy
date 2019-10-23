<template>
  <div id="hello">
    <div class="notice">
      <div style="text-align: right"
           :style="{transform: 'translate('+ mov_left +'%' +')'}" v-text="notice">
      </div>
    </div>
    <!--通知-->
    <div v-bind:class="{show:show_modal}" class="modal bottom-modal">
      <div class="modal-box" @click="hideModal()">
        特大喜讯,点我消失
      </div>
    </div>
    <div>
      <button @click="add()">点我</button>
      <p>{{count}}</p>
      <p>{{mov_left}}</p>
      <p>{{show_modal}}</p>
    </div>
  </div>
</template>
<style>
  #hello {
    width: 50px;
    height: 50px;
    margin: auto;
  }

  .notice {
    background-color: #fefcec;
    cursor: pointer;
    position: fixed;
    top: 0;
    transform: translate(-50%, 0);
    height: 36px;
    line-height: 36px;
    width: 50%;
    overflow: hidden;
    border: 1px solid white;
  }

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    margin: auto;
    text-align: center;
    backface-visibility: hidden;
    background: rgba(0, 0, 0, 0.6);
    transition: all 0.3s ease-in-out 0s;
    pointer-events: none;
  }

  .modal.modal-bottom::before {
    vertical-align: bottom;
  }

  .bottom-modal {
    margin-bottom: -1000px;
  }

  .bottom-modal.show {
    margin-bottom: 0;
  }

  .show {
    opacity: 1;
    pointer-events: auto;
  }

  .modal::before {
    display: inline-block;
    height: 100%;
  }

  .modal .modal-box {
    cursor: pointer;
    line-height: 200px;
    position: relative;
    display: inline-block;
    vertical-align: bottom;
    top: 50%;
    transform: translate(0, -50%);
    height: 200px;
    width: 200px;
    max-width: 100%;
    background-color: #f8f8f8;
    border-radius: 10px;
  }
</style>
<script>
  export default {
    name: 'hello',
    data: function () {
      return {
        count: 0,
        show_modal: false,
        notice: '这是通知这是一条长消息，这是一条长消息，这是一条长消息',
        mov_left: '',
        noticeBarTimer: ''
      }
    },
    mounted: function () {
      this.mov_left = this.notice.length * 1.8
      // console.log(this.mov_left)
    },
    methods: {
      move: function () {
        this.mov_left -= 0.1
        if (this.mov_left <= -100) {
          this.mov_left = this.notice.length * 1.8
        }
        // console.log(this.mov_left)
      },
      add: function () {
        // 访问组件的值需要加this
        this.show_modal = true
        this.count++
      },
      // 控制toast的显示，然后开始滚动noticeBar
      hideModal: function () {
        this.show_modal = false
      }
    },
    beforeDestroy () {
      clearInterval(this.noticeBarTimer)
    }
  }
</script>
