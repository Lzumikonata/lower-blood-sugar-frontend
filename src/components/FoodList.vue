<script>
  import { API } from '../services/api'
  import swal from 'sweetalert'
  export default {
    components: {},
    data: () => ({
      addFoodView: false,
      food: {
        name: '',
        energy: '',
        describe: '',
        preview: '',
      },
      serverFoods: []
    }),
    mounted() {
      API.get('session')
        .then(res =>{
          // 未登录跳转登录页
          if (!res || !res.id) {
            swal('身份验证失败...', '请先前往登录页登录！', 'error');
            return this.$router.push({path: 'login'})
          }
          if (res.userType !== "admin") {
            return swal('权限出错...', '您不是管理员，无法对此页面进行修改！', 'error');
          }
          this.user = Object.assign({}, this.user, res)
        })
      API.get('foods')
        .then(json => {
          if (json && json.length) {
            this.serverFoods = json
          }
        })
    },
    methods: {
      showAddFood(bool) {
        this.addFoodView = bool
      },
      save() {
        if (!this.food.name|| !this.food.energy) {
          return swal('至少需要填写食物名称与热量')
        }
        API.post('food', this.food)
          .then(json => {
            // 添加成功
            if (json && json.id) {
              // 清空待添加食物
              this.food = {
                name: '',
                energy: '',
                describe: '',
                preview: '',
              }
              // 将刚刚添加的食物加入表格中
              this.serverFoods.push(json)
              swal('添加成功', '至少需要填写食物名称与热量', 'success')
              // 关闭添加食物的弹窗
              return this.addFoodView = false
            }
            console.log(json);
          })
      },
      deleteFood(id) {
        swal({
            title: '确定删除食物？',
            text: '删除食物后无法恢复，也可能对已添加此食物的用户造成影响！',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "我再想想",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          isConfirm => {
            if (isConfirm) {
              return API.delete(`foods/${id}`)
                .then(json => {
                  const index = this.serverFoods.find(v => v.id === id)
                  this.serverFoods.splice(index, 1)
                  swal('删除成功!', '食物已删除', 'success');
                })
            }
            swal('已取消', '', 'error')
          })
      }
    },
  }

</script>

<template>
  <div>
    <div class="list-content">
      <button class="food-add" @click="showAddFood(true)">添加食物</button>
      <div class="search-food">
        <input type="text">
        <button>搜索</button>
      </div>
      <table class="foodlist">
        <thead>
        <th>预览图片</th>
        <th>食物名称</th>
        <th>热量 /100g</th>
        <th class="suggestion">tips</th>
        <th>删除食物</th>
        <th>修改</th>
        </thead>
        <tr v-for="f in serverFoods">
          <td>
            <button v-if="f.preview">预览图片</button>
            <span v-else>暂无预览</span>
          </td>
          <td>{{ f.name }}</td>
          <td>{{ f.energy }}</td>
          <td>{{ f.describe ? f.describe : '暂无建议' }}</td>
          <td>
            <button class="deletebtn" @click="deleteFood(f.id)">{{ '删除' + f.name }}</button>
          </td>
          <td>
            <button class="modifybtn">修改</button>
          </td>
        </tr>
      </table>
      <div class="turn-page-two">
        <button>上一页</button>
        <span>第 1 页</span>
        <button>下一页</button>
        <p>总页数（20）</p>
      </div>
    </div>
    <div :class="['food-add-page', {'food-add-page-active': addFoodView}]">
      <button class="close" @click="showAddFood(false)">关闭</button>
      <ul class="food-add-list">
        <li><label>食物名称</label><input type="text" v-model="food.name"></li>
        <li><label>食物热量</label><input type="text" v-model="food.energy"></li>
        <li><label>食物描述</label><textarea v-model="food.describe"></textarea></li>
      </ul>
      <div class="upload-pic">
        <img src="../assets/logo.png">
        <input type="file">
      </div>
      <button class="save" @click="save">保存</button>
    </div>
  </div>
</template>

<style scoped>
  .list-content {
    border: 1px solid #ddd;
    width: 780px;
    height: 825px;
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
  .suggestion{
    width: 150px;
  }
  .deletebtn{
    width: 80px;
    height: 45px;
    background-color: #27ae60;
    border:1px solid white;
    color: white;
    border-radius: 4px;
    font-weight: lighter;
  }
  .modifybtn{
    width: 80px;
    height: 45px;
    background-color: red;
    border:1px solid white;
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

  .food-add-page {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 780px;
    border: 1px solid #ddd;
    overflow: hidden;
    padding-bottom: 20px;
    z-index: 99;
    background: #fff;
    display: none;
  }
  .food-add-page-active {
    display: block;
  }
  .close {
    font-size: 15px;
    padding: 5px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    float: right;
    background-color: transparent;
  }
  .food-add-list {
    width: 400px;
    margin: 0 auto;
    overflow: hidden;
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
  .save {
    font-size: 15px;
    padding: 5px 60px;
    border-radius: 4px;
    float: right;
    border: 1px solid #666;
    margin-right:325px;
    background-color: transparent;
  }
  .save:hover{
    background-color: #eee;
  }



</style>
