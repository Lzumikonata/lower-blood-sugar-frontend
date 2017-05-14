<script>
  import { API } from '../services/api'
  import swal from 'sweetalert'
  export default {
    components: {},
    data: () => ({
      diets: [],
      total: 0,
    }),
    mounted() {
      API.get('session')
        .then(res => {
          // 未登录跳转登录页
          if (!res || !res.id) {
            swal('身份验证失败...', '请先前往登录页登录！', 'error');
            return this.$router.push({ path: 'login' })
          }
          if (res.userType !== "admin") {
            return swal('权限出错...', '您不是管理员，无法对此页面进行修改！', 'error');
          }
          this.user = Object.assign({}, this.user, res)
        })
      API.getNative('diets')
        .then(res => {
          this.total = res.headers.get('total')
          return res.json()
        })
        .then(json => {
          if (json && json.length) {
            this.diets = json.map(v => {
              let energy = 0
              if (v && v.foods) {
                v.foods.forEach(f => {
                  energy += f.energy * f.num
                })
              }
              v.energy = energy
              return v
            })
          }
        })
    },
    methods: {
      addMessage(id) {
        swal({
            title: '给用户的饮食建议',
            text: '',
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: '您的建议对用户具有指导作用!'
          },
          inputValue => {
            if (inputValue === false) return;
            if (inputValue === "") return swal.showInputError('填写建议才可以提交!');
            API.put(`diets/${id}`, {
              suggest: inputValue
            }).then(json => {
              swal('提交成功', '您的建议已被发送至用户！', "success")
            })
          })
      }
    },
    filters: {
      formatTime(str) {
        return str.split('T')[0] + ' / ' + str.split('T')[1].substr(0, 8)
      },
    },
  }

</script>

<template>
  <div>
    <div class="list-content">
      <span class="food-add">饮食管理</span>
      <div class="search-food">
        <input type="text">
        <button>搜索</button>
      </div>
      <table class="foodlist">
        <thead>
        <th>用户</th>
        <th>联系方式</th>
        <th>时间</th>
        <th>今日摄入热量</th>
        <th>详细</th>
        <th class="suggestion">饮食建议</th>
        </thead>
        <tr v-for="d in diets">
          <td>{{d.member.username}}</td>
          <td>{{d.member.phone ? d.member.phone : d.member.email}}</td>
          <td>{{d.createdAt | formatTime}}</td>
          <td>{{d.energy}}</td>
          <td>
            <ul v-if="d.foods && d.foods.length">
              <li v-for="f in d.foods">{{f.name}} - {{f.energy}}</li>
            </ul>
          </td>
          <td>
            <button class="deletebtn" @click="addMessage(d.id)">添加建议</button>
          </td>
        </tr>
      </table>
      <div class="turn-page-two">
        <button>上一页</button>
        <span>第 1 页</span>
        <button>下一页</button>
        <span>(共{{~~(total / 14) + 1}}页)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .list-content {
    border: 1px solid #ddd;
    min-width: 850px;
    max-height: 1250px;
    width: 85%;
    margin: 40px auto;
  }

  .food-add {
    padding: 8px 15px;
    border-radius: 4px;
    border: 1px solid white;
    color: white;
    background-color: #27ae60;
    font-size: 18px;
    font-weight: lighter;
    line-height: 18px;
    margin-left: 50px;
    margin-top: 20px;
  }

  .search-food {
    float: right;
    margin-top: 18px;
    margin-right: 60px;
  }

  .search-food input {
    font-size: 18px;
    line-height: 18px;
    width: 275px;
    padding: 7px;
    border-radius: 4px;
    border: 1px solid darkgrey;
  }

  .search-food button {
    font-size: 18px;
    line-height: 18px;
    padding: 8px;
    border-radius: 4px;
    background-color: transparent;
    border: 1px solid darkgrey;
    color: darkgrey;

  }

  .foodlist {
    border-collapse: collapse;
    margin: 60px auto;
  }

  .foodlist th, .foodlist td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 10px 20px 9px 20px;
  }

  .foodlist th {
    background-color: #ddd;
  }

  .suggestion {
    width: 150px;
  }

  .deletebtn {
    width: 80px;
    height: 45px;
    background-color: #27ae60;
    border: 1px solid white;
    color: white;
    border-radius: 4px;
    font-weight: lighter;
  }

  .turn-page-two {
    text-align: center;
  }

  .turn-page-two button {
    border-radius: 4px;
    padding: 3px 5px;
    border: 1px solid darkgrey;
    background-color: transparent;
    font-size: 15px;

  }

  .upload-pic img {
    display: block;
    border: 1px solid #ddd;
    width: 100px;
    height: 100px;
    float: left;
    margin-top: 40px;
    margin-left: 20px;
  }

  .upload-pic input {
    margin-top: 118px;
    margin-left: 20px;
  }

  .food-add-list li label {
    display: block;
    float: left;
    margin-top: 39px;
    margin-left: 20px;
  }

  .food-add-list li input {
    margin-top: 30px;
    margin-left: 16px;
    width: 225px;
    line-height: 15px;
    font-size: 15px;
    padding: 7px 2px;
  }

  .food-add-list li textarea {
    margin-top: 30px;
    margin-left: 16px;
    width: 260px;
    height: 125px;
  }


</style>
