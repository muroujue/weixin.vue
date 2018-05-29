<template>
  <div class="header">
    <h1>微信</h1>
    <span class="search"><i class="iconfont">&#xe627;</i></span>
    <span class="add"><i class="iconfont">&#xe727;</i></span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
  position: fixed;
  width:100%;
  height:1.33rem;
  top:0;
  left:0;
  background: #373a40;
  z-index:10;
  color:#fff;
  h1{
    font-size:0.46rem;
    padding:0.37rem 0 0 0.27rem;
  }
  span{
    position: absolute;
    top:0;
    &.search{
      right:2rem;
      padding-top:0.37rem;
      i{
        font-size:0.56rem;
      }
    }
    &.add{
      right:0.5rem;
      padding-top:0.35rem;
      i{
        font-size:0.58rem;
      }
    }
  }
}
</style>
