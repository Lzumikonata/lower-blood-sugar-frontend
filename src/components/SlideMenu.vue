<script>
  import {API} from '../services/api.js'
  import swal from 'sweetalert'
  export default {
    props: {
      foods: {
        type: Array,
        required: true,
      },
    },
    data: () => ({
      slideToggle: false,
      time: 'breakfast',
      inquiry: '',
    }),
    mounted () {
    },
    computed: {
      filterFoods: function() {
        return this.foods
      }
    },
    methods: {
      toggleView () {
        this.slideToggle = !this.slideToggle
      },
      count(isAdd, index) {
        const foods = this.foods.map((v, i) => {
          if (i === index){
            isAdd? v.num++: (v.num <= 0? v.num = 0: v.num--)
          }
          return v
        })
      },
      submit() {
        let newFoods = []
        this.foods.forEach(food => {
          if (food.num > 0){
            newFoods.push({
              id: food.id,
              num: food.num,
            })
          }
        })
        if (newFoods.length === 0){
          return swal('添加失败', '请至少添加一个食物！', 'error');
        }

        API.post('diet', {
          foods: newFoods,
          time: this.time,
          inquiry: this.inquiry,
        })
          .then(json => {
            if (json && json.id) {
              // 重置数据
              this.foods.forEach(food => {
                food.num = 0
              })
              swal('提交成功', '您的信息已经被记录！', 'success')
              return this.$router.push({path: 'historyadd'})
            }
          })
      },
      close() {
        this.slideToggle = false
      }

    },
  }
</script>
<template>
  <div :class="['sidebar-content', {show: slideToggle}]">
    <div :class="['bg', {showBg: slideToggle}]" @click="close"></div>
  <div class="sidebar" @click="toggleView">
    <span>今日饮食</span>
  </div>
    <div class="addfood">
      <div class="title">
        <h2>已添加的饮食：</h2>
      </div>
      <ul class="addfood-list">
        <li v-for="(food, index) in filterFoods" v-if="food.num > 0">
          <div class="addfood-list-name">
            <span>{{food.name}}</span>
            <span>{{food.energy}}</span>
          </div>
          <div class="addfood-list-count">
            <span class="add" @click="count(true, index)">+</span>
            <span class="val">{{food.num}}</span>
            <span class="minus" @click="count(false, index)">-</span>
          </div>
        </li>
      </ul>
      <div class="addfood-btn">
        <button class="submit" @click="submit">完成</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .sidebar-content {
    position: fixed;
    right: -300px;
    top: 0;
    bottom: 0;
    z-index: 200;
    height:100%;
    width:335px;
    overflow: hidden;
    transition: all .35s ease-in-out;
    background: #e6e6e6;
  }
  .show {
    right: 0;
  }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.25);
    display: none;
  }
  .showBg {
    display: block;
  }
  .sidebar {
    width:35px;
    line-height: 16px;
    height:100%;
    float: left;
    background:darkgrey;
    overflow: hidden;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #504d53;
    position: relative;
    z-index: 210;
  }
  .sidebar span {
    position: absolute;
    display: block;
    color: #ccc;
    padding:10px 5px;
    line-height: 20px;
    border: 1px solid grey;
    text-align: center;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .addfood {
    height:100%;
    width:300px;
    float: right;
    position: relative;
    z-index: 210;
  }
  .title {
    width: 100%;
    padding-left: 14px;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .title h2 {
    font-size: 16px;
    font-weight: lighter;
    color: #333;
    line-height: 50px;
    margin: 0;
  }
  .addfood-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 35px 0 20px 0;
    background: #fff;
  }
  .addfood-btn button {
    border-radius: 4px;
  }
  .addfood-btn .submit {
    display: block;
    background: #fa5858;
    color: #fff;
    font-size: 20px;
    padding: 6px 15px;
    font-weight: lighter;
    border: none;
    width: 80%;
    margin: 0 auto;
  }
  .addfood-list {
    width: 100%;
    height: auto;
    margin: 20px 0;
    padding: 12px 8px;
    background-color: #fff;
  }
  .addfood-list li {
    width: 100%;
    overflow: hidden;
  }
  .addfood-list-name {
    float: left;
    width: 64%;
    line-height: 36px;
  }
  .addfood-list-count {
    float: right;
    width: 36%;
    overflow: hidden;
    border: 1px solid #666;
    border-radius: 4px;
    margin: 3px 0;
  }
  .addfood-list-count span {
    float: left;
    text-align: center;
    line-height: 30px;
    border-right: 1px solid #666;
  }
  .addfood-list-count span:last-child {
    border: none;
  }
  .addfood-list-count .add, .addfood-list-count .minus {
    width: 36%;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .addfood-list-count .val {
    width: 28%;
  }
</style>
