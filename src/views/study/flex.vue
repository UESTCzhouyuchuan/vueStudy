<template>
  <div id="flex" :style="{justifyContent: justifyContents[cur]}">
    <div v-for="color in colors" v-bind:key="color"
         class="flex-item"
         :style="{backgroundColor: color}">{{color}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flex',
    data: function () {
      return {
        colors: ['red', 'green', 'blue', 'orange'],
        justifyContents: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
        cur: 0,
        timer: 0
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this.cur = (this.cur + 1) % this.justifyContents.length
      }, 2000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  #flex {
    display: flex;
    height: 200px;
    width: 1080px;
    margin: auto;
    background-color: #EBEFF1;
    align-items: center;
    justify-content: center;
    -webkit-transition: justifyContent 1s ease-in-out 0s;
    -moz-transition: justifyContent 1s ease-in-out 0s;
    -ms-transition: justifyContent 1s ease-in-out 0s;
    -o-transition: justifyContent 1s ease-in-out 0s;
    transition: justifyContent 1s ease-in-out 0s;
  }

  .flex-item {
    height: 100px;
    width: 100px;
    text-align: center;
    line-height: 100px;
    border-radius: 2px;
  }
</style>
