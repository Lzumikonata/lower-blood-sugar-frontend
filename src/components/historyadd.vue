<script>
  import {API} from '../services/api.js'
  import swal from 'sweetalert'

  export default {
    components: {},
    data () {
      return {
        diets: [],
        total: 0,
        page: 1,
     }
    },
    mounted() {
      this.getDiets()
    },
    methods: {
      getDiets() {
        API.getNative(`diet?page=${this.page}`)
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
      nextPage(num) {
        const page = ~~(this.total / 14) + 1
        if (this.page + num > 0 && this.page + num <= page) {
          this.page = this.page + num
          this.getDiets()
        }
      },
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
    <p class="title">查看近期摄入热量</p>
    <table class="food-form">
      <thead>
      <tr>
        <th>时间</th>
        <th>摄入热量</th>
        <th>医生建议</th>
        <th>详细</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="d in diets">
        <td>{{d.createdAt | formatTime}}</td>
        <td>{{d.energy}}</td>
        <td>{{d.suggest ? d.suggest : '暂无建议'}}</td>
        <td>
          <ul v-if="d.foods && d.foods.length">
            <li v-for="f in d.foods">{{f.name}} - {{f.energy}}</li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="turn-next">
      <button @click="nextPage(-1)">上一页</button>
      <span>第 {{page}} 页</span>
      <button @click="nextPage(1)">下一页</button>
      <p>(共{{~~(total / 14) + 1}}页)</p>
    </div>
    <div class="details"></div>
  </div>
</template>

<style scoped>
  .page1{
    min-width:850px;
    width: 90%;
    max-width: 1150px;
    border:1px solid #ddd;
    min-height:700px;
    margin:40px auto 70px auto;
  }
  .title{
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
    padding:8px 7px;
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
  .turn-next button {
    border-radius: 4px;
    padding: 3px 5px;
    border: 1px solid darkgrey;
    background-color: transparent;
    font-size: 15px;
  }



</style>
