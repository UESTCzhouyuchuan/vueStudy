<template>
  <div id="transition">
    <div class="container">
      我是container
    </div>
  </div>
</template>

<script>
  export default {
    name: 'transition'
  }
</script>

<style scoped>
  #transition {
    height: 300px;
    width: 300px;
    background-color: #888888;
    margin: 0 auto;
    padding: 1px;
    /*overflow: hidden;*/
    /*border: 1px solid transparent;*/
    position: relative;
  }

  .container {
    height: 100px;
    width: 100px;
    margin: auto;
    text-align: center;
    background-color: green;
    position: relative;
  }

  #transition:hover .container {
    /*transition: float 1s ease-in-out;*/
    /* ease-out减速，ease-in加速,ease-in-out先加速后减速*/
    /*margin-top: 100px;*/
    /*margin-left: 100px;*/
    /*会斜线到达目的地*/
    -webkit-animation: circle3 2s linear infinite alternate running;
    -o-animation: circle3 2s linear infinite alternate running;
    animation: circle3 4s linear infinite alternate running;
  }

  /*矩形，利用相对距离，需要设置relative*/
  @keyframes circle1 {
    0% {
      left: 0;
      top: 0;
    }
    25% {
      left: 100px;
      top: 0;
    }
    50% {
      left: 100px;
      top: 100px;
    }
    75% {
      top: 100px;
      left: 0;
    }
    100% {
      left: 0;
      top: 0;
    }
  }

  /* 矩形 利用translate*/
  @keyframes circle2 {
    0% {
      transform: translate(0px);
    }
    25% {
      transform: translate(100px, 0);
    }
    50% {
      transform: translate(100px, 100px);
    }
    75% {
      transform: translate(0, 100px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  /*利用translate菱形*/
  @keyframes circle3 {
    0% {
      transform: translate(0px);
    }
    25% {
      transform: translate(100px, 100px);
    }
    50% {
      transform: translate(0, 200px);
    }
    75% {
      transform: translate(-100px, 100px);
    }
    100% {
      transform: translate(0);
    }
  }
</style>
