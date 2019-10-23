import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/hello'
import HelloWorld from '@/components/HelloWorld'
import chooseCountry from '@/components/chooseCountry'
import test from '@/views/test/test'
import homework from '@/views/homework/3-1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: hello,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/study/:view',
      name: 'study',
      component: () => import('@/views/study/index'),
      meta: {title: 'study'}
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {title: '测试'}
    },
    {
      path: '/countryArea',
      name: 'countryArea',
      component: () => import('@/views/chooseArea/index'),
      meta: {title: '选择城镇'}
    },
    {
      path: '/test',
      name: 'testRouter',
      component: HelloWorld,
      meta: {title: '欢迎页'}
    },
    {
      path: '/choose',
      name: 'choose',
      component: chooseCountry,
      meta: {title: '输入国家名提示'}
    },
    {
      path: '/homework',
      name: 'homework',
      component: homework,
      meta: {title: 'homework'}
    }
  ]
})
