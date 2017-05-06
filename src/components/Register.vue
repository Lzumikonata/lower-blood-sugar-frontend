<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      gologin: function (path) {
        this.$router.push({path: path})
      },
    },
  }
</script>
<template>
  <div class="register-container">
    <div class="register-title">
    <p>注册你的账号</p>
    <span class="to-Login">我已有账号，现在去<button @click="gologin('login')">登录</button></span>
    </div>
    <ul class="message-input">
      <li><label>用户名</label><input type="text" placeholder="请输入用户名"></li>
      <li><label>密码</label><input type="text" placeholder="请设置密码"></li>
      <li><label>邮箱</label><input type="text" placeholder="请输入邮箱"></li>
    </ul>
    <button class="register-button">注册</button>
  </div>
</template>
<style scoped>
  .register-title{
    overflow: hidden;
    border-bottom: 1px solid lightgray;
  }
  .register-title p{
    float: left;
    font-size: 25px ;
    line-height: 10px;

  }
  .to-Login{
    margin-top: 20px;
    display: block;
    float:right;
    margin-right:40px;

  }
  .to-Login button{
    display:block;
    float: right;
    margin-left: 10px;
    font-size: 15px;
    padding:3px 8px;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    border:1px solid white;
    margin-top: -5px;
  }
  .to-Login button:hover{
    background-color: rgba(0,0,0,0.1);
  }
  .message-input{
    margin-top: 100px;
    display: block;
  }
  .message-input input{
    width:328px;
    height:32px;
    margin-top:18px;
    margin-left:15px;
    font-size: 14px;
  }
  .message-input label{
    display: block;
    float:left;
    width:65px;
    height:32px;
    text-align: right;
    line-height: 32px;
    margin-top: 24px;
    margin-left: 28px;
    color:#666
  }
  .register-button{
    display:block;
    margin-top:24px;
    padding:7px 150px;
    margin-left: 107px;
    font-size: 17px;
    color: white;
    background: transparent;
    border:1px solid white;
    cursor: pointer;
  }
  .register-button:hover{
    background-color: rgba(0,0,0,0.1);
  }

</style>
