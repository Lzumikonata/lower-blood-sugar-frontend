<template>
  <div id="app">
    <header class="home-header">
      <a class="header-title">糖尿病饮食管理</a>
      <ul class="header-nav">
        <li class="nav-item">
          吃了什么
        </li>
        <li class="nav-item">
          折线图
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

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      goNext: function (path) {
        this.$router.push({path: path})
      },
    },

  }
</script>

<style scoped>
  #app {
    height: 100%;
    width: 100%;
    display: block;
    background-size: cover;
    background: url("./assets/timg.jpeg") repeat;
    padding-top: 50px;
  }



  /*标题和导航*/
  .home-header {
    position: fixed;
    height: 50px;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    padding: 0 40px;
    border-bottom: 1px solid #eee;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
  }

  .header-title {
    font-size: 18px;
    display: block;
    float: left;
    color: #333;
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
    background: transparent;
    font-size: 14px;
    color: #ccc;
    margin-left: 12px;
    font-weight: 300;
    border: 1px solid #eee;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .header-nav li :hover {
    border-color: #333;
  }
  .content {
    width: 100%;
    height: 100%;
  }
</style>
