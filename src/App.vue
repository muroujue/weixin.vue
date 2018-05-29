<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import './assets/css/main.css'
import vHeader from './components/Header'
import vFooter from './components/Footer'

export default {
  name: 'App',
  components:{
    vHeader,
    vFooter
  },
  mounted() {
    // 设置rem单位比例
    document.addEventListener('DOMContentLoaded', function () {
      var deviceWidth = document.documentElement.clientWidth
      document.documentElement.style.fontSize = deviceWidth / 10 + 'px'
    }, false)
    window.onresize = function () {
      var deviceWidth = document.documentElement.clientWidth
      document.documentElement.style.fontSize = deviceWidth / 10 + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  .appCont{
    // padding:1.33rem 0 1.6rem;
  }
}
</style>
