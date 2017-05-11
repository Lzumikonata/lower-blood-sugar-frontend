<template>
  <div class="content">
    <p>要记得及时更新自己资料,方便医生查看喔~</p>
  <div class="user-message">
    <div class="user-header">
      <img src="https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/a833e6b2a1e69c89e889b2e5bda9e79a84e68891e5928c793e" alt="">
      <button>修改头像</button>
    </div>
    <ul class="user-list">
      <li><span class="left">姓名： {{user.username}}</span> <span class="right">性别:  {{user.gender === 'man' ? '男' : '女'}}</span></li>
      <li><span class="left">目标摄入：{{user.target}}</span> <span class="right">体重： {{user.weight + ' kg'}}</span></li>
      <li><span class="left">年龄： {{user.age }}</span> <span class="right">血糖： {{user.bloodSugar + ' mmlo/L'}}</span></li>
      <li><span class="left">身高： {{user.height + ' cm'}}</span> <span class="right">血压： {{user.bloodPressure + ' mmHg'}}</span></li>
    </ul>
    <button class="user-change" @click="goModify('modify')">修改资料</button>
  </div>
  </div>
</template>
<script>
  import {API} from '../services/api'
  import store from 'store'

  export default {
    data () {
      return {
        user: {
          username: '',
          gender: 'man',
          weight: '',
          height: '',
          age: '',
          bloodSugar: '',
          bloodPressure: '',
          target: ''
        },
      }
    },
    mounted () {
      API.get('session')
        .then(user => {
          if (user && user.id) {
            this.user = user
          }
        })
//      const user = store.get('user')
//      if (!user) {
//        return alert('您未登录，请前往登录！')
//      }
//      this.user = user
    },
    methods: {
      goModify: function (path) {
        this.$router.push({path: path})
      },
    },
  }
</script>

<style scoped>
  .content {
    background: url('../assets/timg.jpeg') no-repeat;
  }
  .content p{
    text-align: center;
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
    border: 1px solid white;
    margin: 20px auto;
    display: block;
    background: transparent;
  }
  .user-header button:focus {
    outline: none;
  }

  .user-message {
    width: 450px;
    margin: 50px auto;
    padding-top: 80px;
    background-color: rgba(255,255,255,0.3);
  }


  .user-list {
    width: 100%;
    margin: 50px auto;
  }
  .user-list li {
    width: 100%;
    height: auto;
    text-align: center;
    line-height: 20px;
    overflow: hidden;
    margin-top: 18px;
    padding: 2px 20px;
    text-align: center;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .user-list li span {
    display: block;
    font-size: 20px;
    width: 50%;
    text-align: left;
  }
  .user-change{
    display: block;
    padding:13px 20px;
    line-height: 12px;
    background-color: transparent;
    border:1px solid transparent;
    border-radius:4px ;
    margin:50px auto;
  }
</style>
