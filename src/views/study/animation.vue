<template>
  <div id="list-complete-demo" class="demo">
    <button v-on:click="shuffle">Shuffle</button>
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list-complete" tag="p">
    <span
      v-for="item in items"
      v-bind:key="item"
      class="list-complete-item"
    >
      {{ item }}
    </span>
    </transition-group>
    <button id="submit" class="grebtn">
      提交订单中<span class="ani_dot">...</span></button>
    <br>
    <br>
    <br>
    <a class="btn-progress grebtn">进度条</a>
  </div>
</template>
<style>
  .grebtn {
    border: 1px solid transparent;
    border-radius: 2px;
    background-color: green;
    color: white;
    height: 30px;
    padding: 5px 10px;
  }

  .btn-progress {
    position: relative;
  }

  .btn-progress::before, .btn-progress::after {
    content: '';
    height: 8px;
    position: absolute;
    left: 0;
    right: 0;
    top: -15px;
  }

  .btn-progress::before {
    background-color: #ddd;
  }

  .btn-progress::after {
    padding-right: 0;
    background-color: #34538b;
    background-clip: content-box;
    box-sizing: border-box;
    animation: progress 5s infinite;
  }

  @keyframes progress {
    0% {
      padding-right: 100%;
    }
    1% {
      padding-right: 50%;
    }
    3% {
      padding-right: 30%;
    }
    10% {
      padding-right: 20%;
    }
    20% {
      padding-right: 8%;
    }
    30% {
      padding-right: 5%;
    }
    40% {
      padding-right: 4%;
    }
    60% {
      padding-right: 2%;
    }
    80% {
      padding-right: 1%;
    }
  }

  @-webkit-keyframes progress {
    0% {
      padding-right: 100%;
    }
    1% {
      padding-right: 50%;
    }
    3% {
      padding-right: 30%;
    }
    10% {
      padding-right: 20%;
    }
    20% {
      padding-right: 8%;
    }
    30% {
      padding-right: 5%;
    }
    40% {
      padding-right: 4%;
    }
    60% {
      padding-right: 2%;
    }
    80% {
      padding-right: 1%;
    }
  }
</style>
<script>
  export default {
    name: 'animation',
    data () {
      return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10
      }
    },
    methods: {
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
      shuffle: function () {
        this.items = _.shuffle(this.items)
      }
    }
  }
</script>

<style scoped>
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-complete-leave-active {
    position: absolute;
  }

  .ani_dot {
    font-family: simsun;
  }

  :root .ani_dot {
    display: inline-block;
    width: 1.5em;
    vertical-align: bottom;
    overflow: hidden;
  }

  @-webkit-keyframes dot {
    0% {
      width: 0;
      margin-right: 1.5em;
    }
    33% {
      width: .5em;
      margin-right: 1em;
    }
    66% {
      width: 1em;
      margin-right: .5em;
    }
    100% {
      width: 1.5em;
      margin-right: 0;
    }
  }

  @keyframes dot {
    0% {
      width: 0;
      margin-right: 1.5em;
    }
    33% {
      width: .5em;
      margin-right: 1em;
    }
    66% {
      width: 1em;
      margin-right: .5em;
    }
    100% {
      width: 1.5em;
      margin-right: 0;
    }
  }

  .ani_dot {
    -webkit-animation: dot 3s infinite step-start;
    animation: dot 3s infinite step-start;
  }
</style>
