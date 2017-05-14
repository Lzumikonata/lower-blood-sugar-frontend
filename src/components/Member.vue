<script>
  import { API } from '../services/api'
  import store from 'store'
  import UploadImage from './uploadImage.vue'
  import { Event } from '../services/event'
  export default {
    components: {
      'upload-image': UploadImage
    },
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
          target: '',
          avatar: '',
        },
        DEFAULT_AVATAR: 'http://static.wittsay.cc/FomxkE8fjhGKNIOMv-rFOmeRDgmA'
      }
    },
    mounted () {
      API.get('session')
        .then(res =>{
          // 未登录跳转登录页
          if (!res || !res.id) {
            swal('身份验证失败...', '请先前往登录页登录！', 'error');
            return this.$router.push({path: 'login'})
          }
          this.user = res
        })
      Event.$on('IMAGE_UPLOAD_SUCCESS', ({ url }) => {
        API.put('user', { avatar: url })
          .then(json => {
            this.user = json
          })
      })
    },
    methods: {
      goModify(path) {
        this.$router.push({ path: path })
      },
      logout() {
        API.delete('session')
          .then(res => {
          })
        store.clearAll()
        this.$router.push({ path: 'register' })
      },
    },
  }
</script>

<template>
  <div class="content">
    <p>要记得及时更新自己资料,方便医生查看喔~</p>
    <div class="user-message">
      <div class="user-header">
        <img :src="user.avatar ? user.avatar : DEFAULT_AVATAR"
             alt="">
        <div class="user-upload">
          <upload-image></upload-image>
        </div>
      </div>
      <ul class="user-list">
        <li><span class="left">姓名： {{user.username}}</span> <span class="right">性别:  {{user.gender === 'man' ? '男' : '女'}}</span>
        </li>
        <li><span class="left">目标摄入：{{user.target}}</span> <span class="right">体重： {{user.weight + ' kg'}}</span></li>
        <li><span class="left">年龄： {{user.age }}</span> <span class="right">血糖： {{user.bloodSugar + ' mmlo/L'}}</span>
        </li>
        <li><span class="left">身高： {{user.height + ' cm'}}</span> <span class="right">血压： {{user.bloodPressure + ' mmHg'}}</span>
        </li>
      </ul>
      <button class="user-change" @click="goModify('modify')">修改详细资料</button>
    </div>
    <div class="logout" @click="logout">
      <span>注销登录</span>
    </div>
  </div>
</template>

<style scoped>
  .content {
    background: url('../assets/timg.jpeg') no-repeat;
    background-size: cover;
  }

  .content p {
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

  .user-upload {
    font-size: 14px;
    margin: 20px auto;
    display: block;
    background: transparent;
    width: 100px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #666;
    border-radius: 4px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .user-upload:hover {
    border: 1px solid rgb(134, 204, 235);
    color: rgb(134, 204, 235);
  }

  .user-message {
    width: 450px;
    margin: 50px auto;
    padding-top: 80px;
    padding-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.3);
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

  .user-change {
    display: block;
    padding: 12px 15px;
    line-height: 12px;
    background-color: rgb(134, 204, 235);
    border: 1px solid rgb(134, 204, 235);
    border-radius: 4px;
    margin: 30px auto;
    font-size: 14px;
    color: #fff;
    transition: all .3s;
  }

  .user-change:hover {
    color: rgb(134, 204, 235);
    background-color: rgba(255, 255, 255, .65);
    border: 1px solid rgb(134, 204, 235);
  }

  .logout {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: #adadad;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: all .3s ease-in-out;
    font-weight: 300;
  }

  .logout:hover {
    color: #333;
  }
</style>
