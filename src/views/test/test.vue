<template>
  <swiper v-bind:trans_images="imgs"></swiper>
</template>

<script>
  import swiper from '@/components/swiper'

  export default {
    name: 'test',
    components: {
      swiper
    },
    data () {
      return {
        imgs: ['https://img.mukewang.com/5d1c5aec00011c1016000540.jpg',
          'https://img.mukewang.com/5d142e8e0001c5fe16000540.jpg',
          'https://img.mukewang.com/5b3c2d6e0001241b09360316.jpg',
          'https://img.mukewang.com/5d1e0a1800013ca916000540.jpg',
          'https://img.mukewang.com/5cf4fe810001263e16000540.jpg',
          'https://img.mukewang.com/5cbd968e0001086318720632.jpg',
          'https://yulovexin.xyz/images/laravel/many_lovely.jpg',
          'https://yulovexin.xyz/images/laravel/sleep_girl.jpg']
      }
    }
  }
</script>

<style scoped>

</style>
