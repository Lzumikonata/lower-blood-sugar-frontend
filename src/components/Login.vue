
<template>
  <div id="LoginPage">
    <div class="PagePic">
      <a href="http://www.hbuas.edu.cn/"><img src="../assets/hwlogo.jpg"/></a>
      <p>{{msg}}</p>
    </div>
    <div id="LoginContainer">
      <div class="LoginWord">
        <p>登录你的账号</p>
      </div>
      <input id="UserName" type="text" placeholder="请输入用户名" v-model="username"><br>
      <input id="PassWord" type="password" placeholder="请输入密码" v-model="password"><br>
      <div id="login-tools">
        <a class="loginbtn" @click="login">登录</a>
        <a class="registerpage" @click="goRegister('register')">注册</a>
      </div>
    </div>
  </div>
</template>
<script>
  import { API } from '../services/api'
  import store from 'store'
  import swal from 'sweetalert'
  import { Event } from '../services/event'

  export default {
    name: 'PagePic',
    data () {
      return {
        msg: '湖北文理学院',
        username: '',
        password: '',
        phone: '',
      }
    },
    methods: {
      login: function () {
        if (!this.username) {
          return alert('用户名不能为空')
        }
        if (!this.password) {
          return alert('密码不能为空')
        }

        API.post('session', {
          email: this.username,
          password: this.password,
        })
          .then(json => {
            if (json && json.user) {
              store.set('user', json.user)
              Event.$emit('USER_LOGIN', { isAdmin: json.user && json.user.userType === 'admin' })

              return this.$router.push({
                path: 'member',
                params: {
                  username: this.username,
                },
              })
            }
            swal('登录失败', json.message, 'error')
          })
      },
      goRegister: function (path) {
        this.$router.push({ path: path })
      },
    },
  }
</script>


<style scoped>
  .PagePic p {
    text-align: center;
    font-weight: lighter;
    font-size: 60px;
  }
  .PagePic img {
    display: block;
    border-radius: 50%;
    margin: 20px auto;
  }
  #LoginContainer {
    text-align: center;
    width: 450px;
    margin: 50px auto;
    border: 1px solid white;
    background-color: rgba(255,255,255,0.3);
    background: url("../assets/titlebac.jpg") no-repeat;
    background-size: cover;
  }
  .LoginWord {
    padding-top: 30px;
    font-family: "San Francisco";
    font-size: 150%;
    color: darkgray;
  }

  input {
    margin-bottom: 15px;
    width: 200px;
    height: 30px;
    border-radius: 15px;
    padding-left: 15px;
    border: 1px solid darkgrey;
    transition: all .25s;
    font-size: 15px;
    line-height: 30px;
  }

  input:focus, input:active {
    outline: none;
    border-color: aqua;
    border-width: 1px;
  }

  #login-tools {
    margin-top: 10px;
    margin-bottom: 40px;
  }

  a {
    font-size: 16px;
    width: 75px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    padding: 4px 25px;
    border-radius: 3px;
  }

  .loginbtn {
    color: #fff;
    background: #67bdcd;
    margin-right: 20px;
    transition: all .25s;
    border: 1px solid #67bdcd;
  }

  .loginbtn:hover {
    color: #67bdcd;
    background-color: transparent;
    border: 1px solid #67bdcd;
  }

  .registerpage {
    color: darkgray;
    background: #fff;
    border: darkgray;
    transition: all .25s;
  }

  .registerpage:hover {
    color: darkgray;
    background-color: gray;
    border: 1px solid darkgrey;
  }


</style>

