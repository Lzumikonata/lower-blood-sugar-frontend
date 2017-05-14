<script>
  import { API } from './services/api'
  import swal from 'sweetalert'
  import { Event } from './services/event'

  export default {
    data: () => ({
      isAdmin: false
    }),
    mounted() {
      Event.$on('USER_LOGIN', ({ isAdmin }) => {
        this.isAdmin = isAdmin
      })
    },
    methods: {
      goNext: function (path) {
        this.$router.push({ path: path })
      },
    },

  }
</script>

<template>
  <div id="app">
    <header class="home-header">
      <a class="header-title" @click="goNext('')">糖尿病饮食管理</a>
      <ul class="header-nav">
        <li class="nav-item" @click="goNext('/dietlist')" v-if="isAdmin">
          添加建议
        </li>
        <li class="nav-item" @click="goNext('/foodlist')" v-if="isAdmin">
          食物管理
        </li>
        <li class="nav-item" @click="goNext('/')">
          食物查询
        </li>
        <li class="nav-item" @click="goNext('historyadd')">
          饮食纪录
        </li>
        <li class="nav-item" @click="goNext('member')">
          个人中心
        </li>
      </ul>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
  #app {
    min-height: 100%;
    width: 100%;
    display: block;
    background-size: cover;
  }

  /*标题和导航*/
  .home-header {
    position: fixed;
    height: 65px;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0 40px;
    border-bottom: 1px solid #eee;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    background: url("./assets/titlebac.jpg") center;
  }

  .header-title {
    font-size: 20px;
    display: block;
    float: left;
    color: #27ae60;
    line-height: 50px;

  }

  .header-nav {
    width: auto;
    float: right;
    overflow: hidden;
    text-decoration: none;
    margin-top: 7px;
  }

  .header-nav li {
    float: left;
    height: 34px;
    line-height: 34px;
    padding: 0 15px;
    border-radius: 4px;
    font-size: 14px;
    color: #27ae60;
    margin-left: 12px;
    font-weight: 300;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: all .25s;
  }

  .header-nav li:hover {
    color: rgb(134, 204, 235);
    border: 1px solid rgb(134, 204, 235);
  }

  .nav-item:hover {
    border-color: white;
    background-color: rgba(0,0,0,0.2) ;
  }

  .content {
    width: 100%;
    min-height: 100%;
    padding-top: 50px;
    height: 100vh;
  }
</style>
