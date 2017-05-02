<template>
  <div id="home-header">
    <div id="header-container">
      <div id="header-brand">
        <a class="header-title">糖尿病饮食管理</a>
      </div>
      <nav id="header-nav">
        <ul>
          <li class="nav-item">
            <a class="nav-link" href="/">吃了什么</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">折线图</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">个人中心</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'my app',
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home-header{
    position: fixed;
  }

</style>
