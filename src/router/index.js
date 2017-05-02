import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Login from '../components/Login'
import Member from '../components/Member'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
    },
    {
      path: '/member',
      name: '会员中心',
      component: Member,
    },
  ],
})
