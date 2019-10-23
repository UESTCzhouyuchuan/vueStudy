<template>
  <div :class="[hasSwap?'swapAfter':'swapBefore']" id="swapBox">
    <!-- eslint-disable -->
    <div class="left">左边</div>
    <svg t="1571822435313" class="middle" :class="{'icon-animation':clickSwap}" @click="handIconClick"
         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1254" width="200" height="200">
      <path
        d="M543.706667 251.562667a32 32 0 0 1 32.522666-55.114667l325.312 192C929.6 405.002667 917.856 448 885.28 448H138.666667a32 32 0 0 1 0-64h629.44l-224.4-132.442667z m-63.413334 520.88a32 32 0 0 1-32.522666 55.114666l-325.312-192C94.4 619.002667 106.144 576 138.72 576H885.333333a32 32 0 0 1 0 64H255.893333l224.4 132.442667z"
        fill="#001417" fill-opacity=".7" p-id="1255"></path>
    </svg>
    <div class="right">右边</div>
  </div>
</template>

<script>
  export default {
    name: 'swapTwoSide',
    data: function () {
      return {
        hasSwap: false,
        clickSwap: false,
        swapBoxWidth: null
      }
    },
    mounted: function () {
      console.log('mounted')
      let e = document.getElementById('swapBox')
      this.swapBoxWidth = e.offsetWidth
      // 获得宽度存入css变量中
      document.body.style.setProperty('--swapBoxWidth', this.swapBoxWidth)
      console.log(e.offsetWidth)
    },
    methods: {
      handIconClick () {
        this.clickSwap = !this.clickSwap
        this.hasSwap = !this.hasSwap
        console.log('click')
      }
    }
  }
</script>
<style scoped>
  .swapBefore, .swapAfter {
    margin: auto;
    min-height: 200px;
    border: 1px solid #111111;
    width: 50vw;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    transition: transform 0.5s;
  }

  .left, .right {
    -webkit-transition: transform 0.5s;
    -moz-transition: transform 0.5s;
    -ms-transition: transform 0.5s;
    -o-transition: transform 0.5s;
    transition: transform 0.5s;
    margin: 0;
    width: 50px;
    height: 50px;
  }

  .swapAfter .left {
    transform: translateX(calc(var(--swapBoxWidth) * 1px - 100%));
  }

  .swapAfter .right {
    transform: translateX(calc(var(--swapBoxWidth) * -1px + 100%));
  }

  .swapBefore .left {
    transform: translateX(0);
  }

  .swapBefore .right {
    transform: translateX(0);
  }

  .middle {
    height: 50px;
    width: 50px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #aaaaaa;
    box-shadow: 2px 2px 0 #ffffff;
    -webkit-transition: transform 0.5s;
    -moz-transition: transform 0.5s;
    -ms-transition: transform 0.5s;
    -o-transition: transform 0.5s;
    transition: transform 0.5s;
  }

  .icon-animation {
    transform: rotate(180deg);
  }
</style>
