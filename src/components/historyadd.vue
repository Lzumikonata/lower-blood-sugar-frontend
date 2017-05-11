<script>
  import {API} from '../services/api.js'
  import swal from 'sweetalert'

  export default {
    components: {},
    data () {
      return {
        diets: [],
        total: 0,
     }
    },
    mounted() {
      API.getNative('diet')
        .then(res => {
          this.total = res.headers.get('total')
          return res.json()
        })
        .then(json => {
        if (json && json.length) {
            return this.diets = json.map(v => {
              let energy = 0
              if (v.foods && v.foods.length) {
                v.foods.forEach(f => {
                  energy += f.energy * f.num
                })
              }
              v.energy = energy
              return v
            })
          }
          swal('暂无信息', '没有查询到与您有关的饮食信息！', 'error')
        })
    },
    filters: {
      formatTime(str) {
        return str.split('T')[0] + ' / ' + str.split('T')[1].substr(0, 8)
      },
    },
  }
</script>

<template>
  <div class="page1">
    <p>查看近期摄入热量</p>
    <table class="food-form">
      <thead>
      <tr>
        <th>时间</th>
        <th>今日摄入热量</th>
        <th>tips</th>
        <th>了解详细</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="d in diets">
        <td>{{d.createdAt | formatTime}}</td>
        <td>{{d.energy}}</td>
        <td>{{d.inquiry ? d.inquiry : '暂无建议'}}</td>
        <td><button>详情</button></td>
      </tr>
      </tbody>
    </table>
    <div class="turn-next">
      <span>上一页</span>
      <span>第 1 页</span>
      <span>下一页</span>
      <span>(共{{~~(total / 14) + 1}}页)</span>
    </div>
    <div class="details"></div>
  </div>
</template>

<style scoped>
  .page1{
    width:700px;
    border:1px solid #ddd;
    min-height:700px;
    margin:40px auto 70px auto;
  }
  .page1 p{
    margin-left: 70px;
  }

  .food-form{
    width: 80%;
    border-collapse: collapse;
    margin: 30px auto;
  }
  .food-form th,.food-form td{
    border:1px solid #ddd;
    font-size: 1em;
    padding:5px 7px 4px 7px;
    text-align: center;
  }
  .food-form th{
    font-size: 1.1em;
    text-align: center;
    padding-top: 5px ;
    padding-bottom: 4px;
    background-color: rgba(0,0,0,0.1);
  }
  .turn-next {
    text-align: center;
  }



</style>
