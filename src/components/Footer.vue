<template>
  <div class="footer">
    <ul>
      <li><router-link to="/chat"><i class="iconfont">&#xe610;</i>微信</router-link></li>
      <li><router-link to="/address"><i class="iconfont">&#xe6c2;</i>通讯录</router-link></li>
      <li><router-link to="/discover"><i class="iconfont">&#xe603;</i>发现</router-link></li>
      <li><router-link to="/user"><i class="iconfont">&#xe636;</i>我</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer{
  position: fixed;
  width:100%;
  height:1.6rem;
  bottom:0;
  left:0;
  border-top: 1px solid #e1e1e1;
  background: #fff;
  z-index:10;
  ul{
    display: flex;
    text-align: center;
    color:#888;
    li{
      flex:1;
      font-size:.32rem;
      box-sizing: border-box;
      height:1.6rem;
      padding-top: 0.2rem;
      a{
        color:#888;
        &.router-link-active{
          color:#48c11e
        }
        i{
          display: block;
          font-size:0.6rem;
        }
      }
    }
  }
}
</style>
