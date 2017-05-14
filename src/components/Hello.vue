<template>
  <div>
    <SlideMenu :foods="foods"></SlideMenu>
    <div class="search-container">
      <input type="text" class="search-box" placeholder="搜索食物">
      <button>搜索</button>
      <a class="history">查看历史纪录</a>
    </div>
    <fieldset class="food-title">添加今日饮食</fieldset>
      <ul class="food-list">
        <li v-for="(food, index) in foods">
          <img src="../assets/peach.jpg"/>
          <div class="food-message">
            <p class="food-name">{{food.name}}</p>
            <p class="food-hot">{{index}}</p>
            <div class="food-num"><a @click="count(false, index)">-</a><span> {{food.num}} </span><a @click="count(true, index)">+</a></div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
  import SlideMenu from './SlideMenu.vue'
  export default {
    name: 'hello',
    components: {
      SlideMenu,
    },
    data () {
      return {
        msg: 'my app',
        foods: [{
          name: '西红柿炒鸡蛋',
        }, {
          name: '回锅肉',
        }],
      }
    },
    mounted () {
      this.foods = this.foods.map(v => {
        v.num = 0
        return v
      })
    },
    methods: {
      count (isAdd, index) {
        this.foods = this.foods.map((v, i) => {
          if (i === index) {
            isAdd ? v.num ++ : (v.num <= 0 ? v.num = 0 : v.num --)
          }
          return v
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-container{
    overflow: hidden;
    width:500px;
    margin:10px auto;
  }
  .search-box{
    width:325px;
    font-size: 15px;
    padding-left:6px;
    line-height: 35px;
    margin-top: 30px;
    font-weight: lighter;
    color: #333;

  }
  .search-container button{
    display: block;
    float:right;
    font-size: 15px;
    line-height: 35px;
    padding:2px 13px;
    font-weight: lighter;
    margin-right: 105px;
    margin-top: 30px;
    background: white;
    border:1px solid #e5e5e5;
  }
  .food-list{
    width:900px;
    margin:60px auto;
    overflow: hidden;
  }
  .food-list li{
    width:210px;
    overflow: hidden;
    border:1px solid white;
    float: left;
    margin:8px 4px;
  }
  .food-message {
    padding-left: 8px;
  }
  .food-name{
    line-height: 40px;
    font-size: 18px;
    font-weight: lighter;
    margin: 0;
  }
  .food-hot {
    line-height: 14px;
    font-size: 14px;
    font-weight: lighter;
    margin: 0;
  }
  .food-num{
    margin-left:50%;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 20px;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .food-num a {
    padding: 0 7px;
    line-height: 20px;
  }
  .food-num a:first-child {
    border-right: 1px solid black;
  }
  .food-num a:last-child {
    border-left: 1px solid black;
  }
  .food-num span {
    padding: 0 5px;
    line-height: 20px;
  }
  .food-title{
    margin-top: 20px;
    text-align: center;
    border: 1px solid #e5e5e5;
  }
  .history{
    float: right;
    color: lightgrey;
    font-weight: lighter;
    font-size: small;
    margin-top: -16px;
  }
  .history:hover{
    color: black;
  }


</style>
