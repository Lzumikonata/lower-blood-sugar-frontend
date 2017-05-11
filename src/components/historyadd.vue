<script>
  export default {
    components: {},
    data () {
      return {
        turn: {
        },
     }
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
      <tr>
        <td>1</td>
        <td>100</td>
        <td>hao</td>
        <td><a>详情</a></td>
      </tr>
      <tr>
        <td>2</td>
        <td>2000</td>
        <td>hao</td>
        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>1000</td>
        <td>hao</td>
        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>1000</td>
        <td>hao</td>
        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>1000</td>
        <td>hao</td>
        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>1000</td>
        <td>hao</td>
        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>1000</td>
        <td>hao</td>
        <td></td>
      </tr>
      </tbody>
    </table>
    <div class="turn-next">
      <span>上一页</span>
      <span>第 1 页</span>
      <span>下一页</span>
      <span>(共33页)</span>
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
