<template>
  <div>
    <component :is="view"></component>
  </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        view: ''
      }
    },
    components: {
      'flex': () => import('./flex.vue'),
      'transform': () => import('./transform.vue'),
      'transition': () => import('./transition.vue'),
      'animation': () => import('./animation.vue'),
      'swapTwoSide': () => import('./swapTwoSide.vue')
    },
    mounted () {
      this.view = this.$route.params.view
    }
  }
</script>

<style scoped>

</style>
