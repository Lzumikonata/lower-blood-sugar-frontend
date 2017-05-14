<script>
  export default {
    components: {},
    data: () => ({})
  }

</script>

<template>
  <div>
    <div class="list-content">
      <button class="food-add" @click="showAddFood">添加食物</button>
      <div class="search-food">
        <input type="text">
        <button>搜索</button>
      </div>
    <table class="foodlist">
      <thead>
      <th>预览图片</th>
      <th>食物名称</th>
      <th>热量</th>
      <th>tips</th>
      <th>删除食物</th>
      <th>修改</th>
      </thead>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
      <td><button>1</button></td>
      <td>xihongshi</td>
      <td>23333</td>
      <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
      <td><button>1</button></td>
      <td>xihongshi</td>
      <td>23333</td>
      <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
      <td><button>1</button></td>
      <td>xihongshi</td>
      <td>23333</td>
      <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
      <td><button>1</button></td>
      <td>xihongshi</td>
      <td>23333</td>
      <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
      <td><button>1</button></td>
      <td>xihongshi</td>
      <td>23333</td>
      <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>
      <tr>
        <td><button>1</button></td>
        <td>xihongshi</td>
        <td>23333</td>
        <td>chihaode</td>
        <td><button>1</button></td>
        <td><button>1</button></td>
      </tr>

    </table>
      <div class="turn-page-two">
      <button>上一页</button>
        <span>第 1 页</span>
      <button>下一页</button>
        <p>总页数（20）</p>
      </div>
    </div>
    <div class="food-add-page">
      <ul class="food-add-list">
        <li><label>食物名称</label><input type="text"></li>
        <li><label>食物热量</label><input type="text"></li>
        <li><label>食物描述</label><textarea></textarea></li>
      </ul>
      <div class="upload-pic">
        <img src="../assets/logo.png">
        <input type="file">
      </div>
      <button>保存</button>
    </div>
  </div>
</template>

<style scoped>
  .list-content{
    border:1px solid #ddd;
    width: 780px;
    height:825px;
    margin:40px auto;
  }
  .food-add {
    padding:8px 15px;
    border-radius: 4px;
    border:1px solid darkgrey;
    color: darkgrey;
    background-color: white;
    font-size: 18px;
    font-weight: lighter;
    line-height: 18px;
    margin-left:50px ;
    margin-top: 20px;
  }
  .search-food{
    float:right;
    margin-top: 18px;
    margin-right: 60px;
  }
  .search-food input{
    font-size: 18px;
    line-height: 18px;
    width:275px;
    padding: 7px;
    border-radius: 4px;
    border:1px solid darkgrey;
  }
  .search-food button{
    font-size: 18px;
    line-height:18px;
    padding:8px;
    border-radius: 4px;
    background-color: transparent;
    border: 1px solid darkgrey;
    color: darkgrey;

  }
  .foodlist{
    border-collapse: collapse;
    margin: 60px auto;
  }
  .foodlist th, .foodlist td{
    border:1px solid #ddd;
    text-align: center;
    padding:10px 20px 9px 20px;
  }
  .foodlist th{
    background-color: #ddd;
  }
  .turn-page-two{
    text-align: center;
  }
  .turn-page-two button{
    border-radius: 4px;
    padding:3px 5px;
    border:1px solid darkgrey;
    background-color: transparent;
    font-size: 15px;

  }
  .upload-pic img{
    display: block;
    border:1px solid #ddd;
    width: 100px;
    height:100px;
    float:left;
    margin-top: 40px;
    margin-left: 20px;
  }
  .upload-pic input{
    margin-top: 118px;
    margin-left: 20px;
  }

  .food-add-page{
    width: 100%;
    border:1px solid #ddd;
    overflow: hidden;
    padding-bottom: 20px;
    z-index: 99;
    display: none;
  }
  .food-add-list li label{
    display: block;
    float: left;
    margin-top: 39px;
    margin-left: 20px;
    
  }
  .food-add-list li input{
    margin-top:30px;
    margin-left: 16px;
    width:225px;
    line-height: 15px;
    font-size: 15px;
    padding: 7px 2px;
  }
  .food-add-list li textarea{
    margin-top: 30px;
    margin-left: 16px;
    width:260px;
    height: 125px;
  }





</style>
