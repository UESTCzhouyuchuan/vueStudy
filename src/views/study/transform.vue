<template>
  <div id="transform">
    <div class="container">
      <div class="box box1"></div>
      <div class="box box2"></div>
      <div class="box box3"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'transform'
  }
</script>

<style scoped>
  #transform {
    width: 1080px;
    margin: auto;
    min-height: 200px;
    background-color: #f8f8f8;
    position: relative;
  }

  .container {
    margin: 20px 50px;
    background: pink;
    display: flex;
    justify-content: space-around;
  }

  .box {
    height: 100px;
    width: 100px;
    background: red;
    transition: all .4s linear;
  }

  .box1:hover {
    /*逆时针旋转45，同时放大二倍*/
    transform: skew(45deg, -45deg);
    /*transform: rotate(-45deg);*/
  }

  .box2:hover {
    /*顺时针旋转45，同时放大*/
    /*transform: rotate(45deg);*/
    transform: skew(-45deg, 45deg);
  }

  .box3:hover {
    animation: name .5s linear forwards;
  }

  @keyframes name {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
      -webkit-box-shadow: 2px 2px 4px 0px rgba(0.7, 0.4, 1, 0.4),
      -2px 2px 4px 0px rgba(0.7, 0.4, 1, 0.4);
      -moz-box-shadow: 2px 2px 4px 0px rgba(0.7, 0.4, 1, 0.4),
      -2px 2px 4px 0px rgba(0.7, 0.4, 1, 0.4);
      box-shadow: 2px 2px 4px 0px rgba(0.7, 0.4, 1, 0.4),
      -2px 2px 4px 0px rgba(0.7, 0.4, 1, 0.4);
    }
  }
</style>
