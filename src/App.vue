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
        <li class="nav-item">
          个人中心
        </li>
      </ul>
    </header>

    <div class="user-message">
      <div class="user-header">
        <img src="https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/a833e6b2a1e69c89e889b2e5bda9e79a84e68891e5928c793e" alt="">
        <button>修改头像</button>
      </div>
      <ul class="user-list">
        <li><p>姓名： {{name}}</p></li>
        <li><p>性别： {{name}}</p></li>
        <li><p>年龄： {{name}}</p></li>
        <li><p>体重： {{name}}</p></li>
        <li><p>身高： {{name}}</p></li>
        <li><p>血糖： {{name}}</p></li>
      </ul>
    </div>

  </div>


</template>

<script>
  export default {
    data () {
      return {
        name: '李振东',
        sex: '',
      }
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
  /*用户信息*/
  .user-message {

  }
  .user-header img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto;
  }
  .user-header button {
    border-radius: 4px;
    font-size: 14px;
    padding: 0 12px;
    line-height: 20px;
    border: 1px solid #eee;
    margin: 20px auto;
    display: block;
    background: transparent;
  }
  .user-header button:focus {
    outline: none;
  }

  .user-message {
    width: 350px;
    margin: 50px auto;
    padding-top: 100px;
  }


  .user-list {
    width: 250px;
    margin: 20px auto;
  }
  .user-list li {
    width: 100%;
    height: auto;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
  }
</style>
