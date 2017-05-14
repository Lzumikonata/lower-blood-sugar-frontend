<script>
  import SlideMenu from './SlideMenu.vue'
  import {API} from '../services/api.js'
  import swal from 'sweetalert'
  export default {
    components: {
      SlideMenu,
    },
    data: () => ({
      myData: [],
      serverFoods: [],
      keyword: '',
      DEFAULT_PREVIEW: 'http://static.wittsay.cc/FomxkE8fjhGKNIOMv-rFOmeRDgmA',
      total: 0,
      page: 1,
    }),
    mounted () {
      API.get('session')
        .then(res =>{
          // 未登录跳转登录页
          if (!res || !res.id) {
            swal('身份验证失败...', '请先前往登录页登录！', 'error');
            return this.$router.push({path: 'login'})
          }
          this.getFood()
        })
    },
    methods: {
      count(isAdd, index) {
        this.serverFoods = this.serverFoods.map((v, i) => {
          if (i === index){
            isAdd? v.num++: (v.num <= 0? v.num = 0: v.num--)
          }
          return v
        })
      },
      goNext(path) {
        this.$router.push({path: path})
      },
      getFood() {
        API.getNative(`foods?page=${this.page}&pre_page=16`)
          .then(res => {
            this.total = res.headers.get('total')
            return res.json()
          })
          .then(json => {
            if (json && json.length) {
              this.serverFoods = json.map(v => {
                v.num = 0
                return v
              })
            }
          })
      },
      nextPage(num) {
        const page = ~~(this.total / 14) + 1
        if (this.page + num > 0 && this.page + num <= page) {
          this.page = this.page + num
          this.getFood()
        }
      },
      search() {
        this.page = 1
        if (!this.keyword) {
          return this.getFood()
        }
        API.getNative(`foods/${this.keyword}/search?page=${this.page}&pre_page=16`)
          .then(res => {
            this.total = res.headers.get('total')
            return res.json()
          })
          .then(json => {
            if (json && json.length) {
              this.serverFoods = json
            }
          })
      },
    },
  }
</script>

<template>
  <div>
    <SlideMenu :foods="serverFoods"></SlideMenu>
    <div class="search-container">
      <input type="text" class="search-box" v-model="keyword" @keydown="search" placeholder="输入关键字搜索食物" />
      <a class="history" @click="goNext('historyadd')">查看历史纪录</a>
    </div>
    <fieldset class="food-title">添加今日饮食</fieldset>
    <ul class="food-list">
      <li v-for="(food, index) in serverFoods">
        <img :src="food.preview ? food.preview : DEFAULT_PREVIEW" draggable="false"/>
        <div class="food-message">
          <p class="food-name">{{food.name}}</p>
          <p class="food-hot">热量：{{food.energy}} cal</p>
          <div class="food-num"><a @click="count(false, index)">-</a><span> {{food.num}} </span>
            <a @click="count(true, index)">+</a></div>
        </div>
      </li>
    </ul>
    <div class="turn-next">
      <button @click="nextPage(-1)">上一页</button>
      <span>第 {{page}} 页</span>
      <button @click="nextPage(1)">下一页</button>
      <p>(共{{~~(total / 14) + 1}}页)</p>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-container {
    overflow: hidden;
    width: 500px;
    margin: 45px auto;
  }

  .search-box {
    width: 325px;
    font-size: 15px;
    line-height: 35px;
    font-weight: lighter;
    color: #333;
    display: block;
    margin: 10px auto;
    border: none;
    background: transparent;
    border-bottom: 1px solid #eee;
    text-align: center;
    transition: all .4s;
    font-weight: 300;
  }
  .search-box:focus {
    outline: none;
  }
  .search-box:hover {
    border-color: #8CD4F5;
  }

  .search-container button {
    display: block;
    float: right;
    font-size: 15px;
    line-height: 35px;
    padding: 2px 13px;
    font-weight: lighter;
    margin-right: 105px;
    margin-top: 30px;
    background: white;
    border: 1px solid #e5e5e5;
  }

  .food-list {
    min-width: 860px;
    max-width: 1050px;
    width: 85%;
    margin: 60px auto;
    overflow: hidden;
  }

  .food-list li {
    width: 25%;
    overflow: hidden;
    border: 1px solid #f0f0f0;
    float: left;
    margin: 8px auto;
  }
  .food-list li img {
    width: 210px;
    height: 140px;
  }

  .food-message {
    padding-left: 8px;
  }

  .food-name {
    line-height: 40px;
    font-size: 15px;
    margin: 0;
  }

  .food-hot {
    line-height: 14px;
    font-size: 14px;
    font-weight: lighter;
    margin: 0;
  }

  .food-num {
    margin-left: 50%;
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

  .food-title {
    margin-top: 20px;
    text-align: center;
    border: 1px solid #e5e5e5;
  }

  .history {
    color: lightgrey;
    font-weight: lighter;
    font-size: small;
    display: block;
    margin: 0 auto;
    text-align: center;
  }

  .history:hover {
    color: black;
  }
  .turn-next {
    text-align: center;
    margin: 0 auto;
  }
  .turn-next button {
    border-radius: 4px;
    padding: 3px 5px;
    border: 1px solid darkgrey;
    background-color: transparent;
    font-size: 15px;
  }


</style>
