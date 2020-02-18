import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
//axios
import './http.js'

// vue-cookies
import VueCookies from 'vue-cookies'
VueCookies.config('1h'); // 配置全局缓存有效时间
Vue.use(VueCookies)
    // vue-wechat-title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// EventBus
import bus from './eventBus';
Vue.prototype.$bus = bus;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#main')