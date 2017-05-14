<script>
  import { API } from '../services/api'
  import swal from 'sweetalert'
  import UploadImage from './uploadImage.vue'
  import { Event } from '../services/event'

  export default {
    components: {
      'upload-image': UploadImage,
    },
    data: () => ({
      addFoodView: false,
      updateID: null,
      page: 1,
      total: 0,
      keyword: '',
      food: {
        name: '',
        energy: '',
        describe: '',
        preview: '',
      },
      serverFoods: [],
      DEFAULT_PREVIEW: 'http://static.wittsay.cc/FomxkE8fjhGKNIOMv-rFOmeRDgmA',
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
      this.getFood()
      Event.$on('IMAGE_UPLOAD_SUCCESS', ({url}) => {
        this.food.preview = url
      })
    },
    methods: {
      showAddFood(bool) {
        if (this.updateID) {
          this.food = {
            name: '',
            energy: '',
            describe: '',
            preview: '',
          }
        }
        this.updateID = null
        this.addFoodView = bool
      },
      save() {
        if (!this.food.name|| !this.food.energy) {
          return swal('至少需要填写食物名称与热量')
        }
        const method = this.updateID ? 'put' : 'post'
        const url = this.updateID ? `foods/${this.updateID}` : 'food'
        API[method](url, this.food)
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
              if (this.updateID) {
                this.serverFoods = this.serverFoods.map(food => {
                  if (food.id === this.updateID) {
                    food = json
                  }
                  return food
                })
              } else {
                this.serverFoods.push(json)
              }

              // 关闭添加食物的弹窗并清空数据
              swal((this.updateID ? '修改成功' : '添加成功'), '食物的信息已保存！', 'success')
              this.updateID = null
              return this.addFoodView = false
            }
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
      },
      updateFood(food) {
        this.updateID = food.id
        // 清空待添加食物
        this.food = {
          name: food.name,
          energy: food.energy,
          describe: food.describe,
          preview: food.preview,
        }
        this.addFoodView = true
      },
      getFood() {
        API.getNative(`foods?page=${this.page}`)
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
        API.getNative(`foods/${this.keyword}/search?page=${this.page}`)
          .then(res => {
            this.total = res.headers.get('total')
            return res.json()
          })
          .then(json => {
            if (json && json.length) {
              this.serverFoods = json
            }
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
        <input type="text" v-model="keyword" @keydown="search" placeholder="输入食物关键字">
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
            <img class="preview" v-if="f.preview" :src="f.preview"/>
            <span v-else>暂无预览</span>
          </td>
          <td>{{ f.name }}</td>
          <td>{{ f.energy }}</td>
          <td>{{ f.describe ? f.describe : '暂无建议' }}</td>
          <td>
            <button class="deletebtn" @click="deleteFood(f.id)">{{ '删除' + f.name }}</button>
          </td>
          <td>
            <button @click="updateFood(f)">修改</button>
          </td>
        </tr>
      </table>
      <div class="turn-page-two">
        <button @click="nextPage(-1)">上一页</button>
        <span>第 {{page}} 页</span>
        <button @click="nextPage(1)">下一页</button>
        <p>(共{{~~(total / 14) + 1}}页)</p>
      </div>
    </div>
    <div :class="['food-add-page-bg', {'food-add-page-active': addFoodView}]"></div>
    <div :class="['food-add-page', {'food-add-page-active': addFoodView}]">
      <button class="close" @click="showAddFood(false)">关闭</button>
      <ul class="food-add-list">
        <li><label>食物名称</label><input type="text" v-model="food.name"></li>
        <li><label>食物热量</label><input type="text" v-model="food.energy"></li>
        <li><label>食物描述</label><textarea v-model="food.describe"></textarea></li>
        <li>
          <label>食物描述</label>
          <div class="upload-pic">
            <img :src="food.preview ? food.preview : DEFAULT_PREVIEW">
            <div class="upload-btn">
              <upload-image></upload-image>
            </div>
          </div>
        </li>
      </ul>
      <button class="save" @click="save">{{ updateID ? '保存修改' : '添加食物'}}</button>
    </div>
  </div>
</template>

<style scoped>
  .list-content {
    border: 1px solid #ddd;
    min-width: 920px;
    width: 85%;
    max-width: 1250px;
    height: auto;
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
  .preview {
    width: 150px;
    height: 110px;
    border-radius: 4px;
  }

  .foodlist th, .foodlist td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 8px 8px;
  }
  .foodlist tr:nth-child(odd) {
    background: #F5F5F5;
  }
  .foodlist tr:nth-child(even) {
    background: #FFFFFF;
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

  .upload-pic {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    position: relative;
  }
  .upload-pic img {
    width: 100%;
    height: 100%;
  }
  .upload-btn {
    position: absolute;
    width: 100%;
    height: 50%;
    line-height: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(225, 225, 225, .65);
    transition: all .3s;
    color: #333;
  }
  .upload-btn:hover {
    height: 100%;
    line-height: 80px;
  }

  .food-add-page {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    border-radius: 5px;
    border: 1px solid #ddd;
    overflow: hidden;
    padding-bottom: 20px;
    z-index: 99;
    background: #fff;
    display: none;
  }
  .food-add-page-active {
    display: block !important;
  }
  .food-add-page-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    background: rgba(0, 0, 0, 0.75);
    display: none;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 15px;
    padding: 8px 15px;
    border-radius: 4px;
    border: 1px solid transparent;
    background-color: transparent;
  }
  .food-add-list {
    width: 400px;
    margin: 0 auto;
    overflow: hidden;
  }
  .food-add-list li {
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
    padding: 7px 5px;
    border: 1px solid #666;
    border-radius: 3px;
    color: #333;
    font-weight: 300;
  }
  .food-add-list li input:focus {
    outline: none;
  }
  .food-add-list li input:hover {
    border: 1px solid #8CD4F5;
  }

  .food-add-list li textarea {
    margin-top: 30px;
    margin-left: 16px;
    width: 260px;
    height: 70px;
    padding: 5px 5px;
    font-size: 15px;
    border: 1px solid #666;
    border-radius: 3px;
    color: #333;
    font-weight: 300;
  }
  .food-add-list li textarea:focus {
    outline: none;
  }
  .food-add-list li textarea:hover {
    border: 1px solid #8CD4F5;
  }

  .save {
    font-size: 15px;
    padding: 5px 60px;
    border-radius: 4px;
    border: 1px solid #666;
    margin: 25px auto;
    display: block;
    background-color: transparent;
  }
  .save:hover{
    background-color: #333;
  }



</style>
