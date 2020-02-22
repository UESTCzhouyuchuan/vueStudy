<!-- @format -->

<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view></router-view>
    <div id="footer">
      <a href="https://github.com/UESTCzhouyuchuan" target="_blank">
        <ion-icon name="logo-github"></ion-icon>Github
      </a>
      <a href="https:blog.yulovexin.xyz" target="_blank">
        <ion-icon name="logo-web-component"></ion-icon>My Blog
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 2.5rem 1rem;
}
#footer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.5rem;
}
@media screen and (min-width: 600px) {
}
#footer a {
  text-decoration: none;
  font-size: 0.75rem;
  margin-right: 0.25rem;
}
</style>
