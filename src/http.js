import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
// axios.defaults.baseURL = 'http://49.233.169.5:3000/';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.use(vueAxios, axios);