<style>
  .swiper-container {
    position: relative;
    cursor: pointer;
    width: 936px;
    height: 316px;
    margin: auto;
    overflow: hidden;
    padding: 0;
    z-index: 1;
  }

  .swiper-wrap {
    transform: translate3d(0, 0, 0);
    position: relative;
    height: 100%;
    display: -webkit-flex;
    display: flex;
    flex-flow: row nowrap;
    -webkit-transition-property: transform, -webkit-transform;
    -moz-transition-property: transform, -webkit-transform;
    -ms-transition-property: transform, -webkit-transform;
    -o-transition-property: transform, -webkit-transform;
    transition-property: transform, -webkit-transform;
    box-sizing: content-box;
  }
</style>
<template>
  <div id="swiper">
    <div class="swiper-container">
      <transition-group name="swiper" tag="div" class="swiper-wrap"
                        @mouseenter="mouse_enter_swiper()"
                        @mouseleave="mouse_leave_swiper()">
        <img v-for="(img) in trans_images" v-bind:key="img"
             :src="img" alt="图片"
             class="swiper-image"/>
      </transition-group>
      <div class="dots">
          <span v-for="i in trans_images.length" :key="i"
                @click="changeCur(i-1)" class="dot"
                :class="{'dot-active': i-1 === current_img }"></span>
      </div>
      <a class="iconAll toLeft-icon" @click="toLeft()">
      </a>
      <a class="iconAll toRight-icon" @click="toRight()"></a>
    </div>
    <div class="swiper-container"
         @mouseenter="mouse_enter_swiper()"
         @mouseleave="mouse_leave_swiper()">
      <transition-group name="swiper" tag="div" class="swiper-wrap"
                        :style="{'transition-duration': dur + 'ms', transform: 'translate(' +
                         - (current_img*width - dragLen) + 'px)'}">
        <div v-for="(img) in trans_images" v-bind:key="img"
             :style="{'background-image': 'url(' + img + ')'}"
             style="background-size: cover;"
             class="swiper-image"
             @mouseleave="leave()"
             @mousedown="mouseDown()"
             @mousemove="mouseMove()"
             @mouseup="mouseUp()">
        </div>
      </transition-group>
      <div class="dots">
          <span v-for="i in trans_images.length" :key="i"
                @click="changeCur(i-1)" class="dot"
                :class="{'dot-active': i-1 === current_img }"></span>
      </div>
      <a class="iconAll toLeft-icon" @click="toLeft()">
      </a>
      <a class="iconAll toRight-icon" @click="toRight()"></a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'swiper',
    props: {
      'trans_images': Array
    },
    data () {
      return {
        images: this.trans_images,
        height: 316,
        width: 936,
        img_len: 0,
        dur: 0,
        current_img: 0,
        drag_down: false,
        dragLen: 0,
        swiperTimer: 0,
        down_x: null,
        down_y: null,
        cur_x: null,
        cur_y: null
      }
    },
    methods: {
      mouseDown () {
        this.down_x = event.screenX
        this.down_y = event.screenY
        this.drag_down = true
        this.dur = 0
      },
      mouseMove () {
        // console.log(event.screenX, event.clientX, event.offsetX, event.layerX, event.x)
        // console.log(event.screenY, event.clientY, event.offsetY, event.layerY, event.y)
        // console.log('--------------')
        this.cur_x = event.screenX
        this.cur_y = event.screenY
        if (this.drag_down) {
          this.dragMove()
        }
      },
      mouseUp () {
        this.drag_down = false
        this.dragEnd()
      },
      leave () {
        console.log()
        if (this.drag_down) {
          this.mouseUp()
        }
      },
      dragMove () {
        this.dragLen = this.cur_x - this.down_x
      },
      dragEnd () {
        if (this.dragLen > this.width / 2) {
          this.toLeft()
        } else if (this.dragLen < -this.width / 2) {
          this.toRight()
        } else {
          this.dur = 300
        }
        this.dragLen = 0
      },
      changeCur (index) {
        this.dur = 1000
        this.current_img = index
      },
      toRight () {
        this.dur = 300
        this.current_img = (this.current_img + 1) % this.img_len
      },
      toLeft () {
        this.dur = 300
        if (this.current_img === 0) {
          this.current_img = this.img_len - 1
        } else {
          this.current_img -= 1
        }
        // console.log(this.show_img)
      },
      mouse_enter_swiper () {
        clearInterval(this.swiperTimer)
      },
      mouse_leave_swiper () {
        // 新的定时器创建前最好先清除一下
        clearInterval(this.swiperTimer)
        this.autoPlay()
      },
      autoPlay () {
        this.swiperTimer = setInterval(() => {
          this.toRight()
        }, 5000)
      }
    },
    // 挂载完成后
    mounted () {
      this.current_img = 0
      this.img_len = this.images.length
      this.autoPlay()
      // console.log(this.show_img)
    },
    beforeDestroy () {
      clearInterval(this.swiperTimer)
    }
  }
</script>

<style>
  .swiper-image {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border: 0;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }

  .dots {
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
    padding-right: 24px;
    line-height: 12px;
    text-align: right;
    word-spacing: -0.5em;
  }

  .dots span.dot {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-left: 8px;
    background-color: rgb(50, 50, 25);
    border: 1px solid rgba(0, 0, 0, 0.6);
    transition: transform .2s;
    cursor: pointer;
  }

  .dots span.dot-active {
    background-color: pink;
    border: 1px solid rgba(250, 150, 150);
  }

  .iconAll {
    position: absolute;
    margin-top: -30px;
    top: 50%;
    width: 36px;
    height: 60px;
    line-height: 60px;
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .swiper-container:hover .iconAll {
    background-color: black;
    opacity: 0.2;
  }

  .swiper-container .iconAll:hover {
    background-color: black;
    opacity: 0.6;
  }

  .toLeft-icon {
    -webkit-border-radius: 0 4px 4px 0;
    -moz-border-radius: 0 4px 4px 0;
    border-radius: 0 4px 4px 0;
    left: 0;
    background-image: url(
    "https://yulovexin.xyz/images/laravel/icon-left1.png");
  }

  .toRight-icon {
    -webkit-border-radius: 4px 0 0 4px;
    -moz-border-radius: 4px 0 0 4px;
    border-radius: 4px 0 0 4px;
    right: 0;
    background-image: url(
    "https://yulovexin.xyz/images/laravel/icon-right1.png");
  }
</style>
