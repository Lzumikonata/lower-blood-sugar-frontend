import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Login from '../components/Login'
import Member from '../components/Member'
import Register from '../components/Register.vue'
import Modify from '../components/Modify'
import historyAdd from '../components/historyadd.vue'
import FoodList from '../components/FoodList.vue'
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
    {
      path: '/register',
      name: 'zhuce',
      component: Register,
    },
    {
      path: '/modify',
      name: 'xiugai',
      component: Modify,
    },
    {
      path: '/historyadd',
      name: 'everadd',
      component: historyAdd,
    },
    {
      path: '/foodlist',
      name: 'foodlist',
      component: FoodList,
    },
  ],
})
