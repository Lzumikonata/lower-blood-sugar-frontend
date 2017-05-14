<script>
  import { API } from '../services/api'
  import store from 'store'
  import swal from 'sweetalert'

  export default {
    data: () => ({
      username: '',
      email: '',
      password: '',
      phone: '',
    }),
    methods: {
      gologin(path) {
        this.$router.push({ path: path })
      },
      register() {
        if (!this.username || !this.email || !this.password || !this.phone) {
          return swal('无法提交', '请完善注册信息！', 'error')
        }
        API.post('user', {
          email: this.email,
          username: this.username,
          password: this.password,
          phone: this.phone,
        })
          .then(json => {
            if (json && json.status) {
              return swal('注册成功', '您已注册成功，请等待管理员的审核！', 'success')
            }
            swal('出现了一些问题', json.message, 'error')
          })
      },
    },
  }
</script>
<template>
  <div class="register-container">
    <div class="register-title">
      <p>注册你的账号</p>
      <span class="toLogin">我已有账号，现在去<a @click="gologin('login')">  登录</a></span>
    </div>
    <ul class="message-input">
      <li><label>用户名</label><input type="text" placeholder="请输入用户名" v-model="username"></li>
      <li><label>邮箱</label><input type="text" placeholder="请输入邮箱" v-model="email"></li>
      <li><label>密码</label><input type="text" placeholder="请设置密码" v-model="password"></li>
      <li><label>电话</label><input type="text" placeholder="请输入电话" v-model="phone"></li>
    </ul>
    <button class="register-button" @click="register">注册</button>
  </div>
</template>
<style scoped>
  .register-title {
    overflow: hidden;
    border-bottom: 1px solid lightgray;
    padding: 0 35px;
  }

  .register-title p {
    float: left;
    font-size: 25px;
    line-height: 10px;
  }

  .toLogin {
    margin-top: 20px;
    display: block;
    float: right;
    color: #666;
  }

  .toLogin a {
    color: #8CD4F5;
  }

  .toLogin button {
    display: block;
    float: right;
    margin-left: 10px;
    font-size: 15px;
    padding: 3px 8px;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid white;
    margin-top: -5px;
  }

  .toLogin button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
  }

  .message-input {
    width: 65%;
    min-width: 500px;
    max-width: 900px;
    margin: 50px auto;
    overflow: hidden;
  }

  .message-input input {
    width: 328px;
    height: 40px;
    margin-top: 30px;
    margin-left: 15px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding-left: 7px;
  }

  .message-input label {
    display: block;
    float: left;
    width: 65px;
    height: 40px;
    text-align: right;
    font-size: 16px;
    line-height: 38px;
    color: #666;
    margin-top: 30px;
    margin-left: 33px;

  }

  .register-button {
    display: block;
    margin-top: 30px;
    padding: 7px 150px;
    margin: 0 auto;
    font-size: 17px;
    color: darkgrey;
    background: transparent;
    border: 1px solid darkgrey;
    cursor: pointer;
    border-radius: 4px;
  }

  .register-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    border: white;
  }

</style>
