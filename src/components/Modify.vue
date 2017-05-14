<script>
  export default {
    components: {},
    data: () => ({
      sex: true,
    }),
    methods: {
      toggleSex (bool) {
        this.sex = bool
      },
    },
  }
</script>
<template>
  <div class="channge-container">
    <span class="channge-title">修改资料</span>
    <ul class="user-form">
      <li><label>用户名</label><input type="text"></li>
      <li>
        <label>性别</label>
        <div class="sex-container-btn">
          <span @click="toggleSex(true)" :class="{active: sex}">男</span>
          <span @click="toggleSex(false)" :class="{active: !sex}">女</span>
        </div>
      </li>
      <li><label>体重</label><input type="text"> kg</li>
      <li><label>生日</label><input type="month" name="user-date"></li>
      <li><label>血糖</label><input type="text"/> mmol/L</li>
      <li><label>血压</label><input type="text"/> mmHg</li>
      <li><label>运动量</label><select name="sportdegree">
      <option value="light">1~2.5kg</option>
      <option value="moderate">2.6~5kg</option>
      <option value="severe">5kg以上</option>
    </select></li>
    </ul>
    <button class="finish">保存资料</button>
  </div>
</template>
<style scoped>
  .channge-container {
    width:650px;
    margin:50px auto;
    border:1px solid white;
    border-radius: 4px;
    position: relative;
    background: rgba(225, 225, 225, .55);
    padding-bottom: 30px;
  }
  .channge-title {
    position: absolute;
    top: -30px;
    left: 10px;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    color: #666;
    font-weight: lighter;
  }
  .user-form{
    overflow: hidden;
    padding-bottom: 30px;
  }
  .user-form li{
    overflow: hidden;
    margin-top: 20px;
    line-height: 30px;
    padding-left: 30px;
    color: #7d7d7d;
  }
  .user-form label{
    width:80px;
    float: left;
    margin-right: 14px;
    text-align: right;
    line-height: 30px;
    height: 30px;
    color: #333;
    font-weight: lighter;
  }
  .user-form label:after {
    content: ' :';
  }
  .user-form select{
    width:150px;
    font-size: 15px;
  }
  .user-form input {
    border-radius: 4px;
    padding-left: 6px;
    border: 1px solid #d8d8d8;
    height: 30px;
    line-height: 30px;
    min-width: 200px;
    font-size: 16px;
    font-weight: lighter;
    color: #7d7d7d;
  }
  .user-form input:focus {
    outline: none;
  }
  .finish{
    display: block;
    margin: 20px auto;
    border: none;
    font-size: 15px;
    padding: 6px 12px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    font-weight: lighter;
    transition: all .25s;
  }
  .finish:hover {
    background: rgba(109, 224, 196, .8);
    color: #fff;
  }
  .finish:focus {
    outline: none;
  }
  .sex-container-btn {
    width: auto;
    height: 30px;
    border-radius: 4px;
    background: rgba(225, 225, 225, .1);
    overflow: hidden;
    border: 1px solid #f1f1f1;
    width: 140px;
    position: relative;
  }
  .sex-container-btn:after {
  width: 1px;
  height: 100%;
  position: absolute;
  background: #f1f1f1;
  top: 0;
  left: 50%;
  bottom: 0;
  z-index: 10;
  content: '';
  }
  .sex-container-btn span {
    line-height: 30px;
    float: left;
    width: 50%;
    text-align: center;
    background: rgba(225, 225, 225, .2);
    transition: all .25s;
    color: #666;
    font-weight: lighter;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }
  .sex-container-btn span:hover {
    background: rgba(109, 224, 196, .8);
    color: #fff;
  }
  .sex-container-btn span.active {
    background: rgba(109, 224, 196, .8);
    color: #fff;
  }


</style>
