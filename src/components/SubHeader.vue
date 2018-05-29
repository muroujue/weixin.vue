<template>
  <div class="header clearfix">
    <span class="back" @click="back"><i class="iconfont">&#xe614;</i></span>
    <h2>{{headerName}}</h2>
    <p class="righticon">
      <span class="member" v-if="subType=='singleChat'" @click="getMemberDetail"><i class="iconfont">&#xe715;</i></span>
      <span class="member" v-if="subType=='multiChat'"><i class="iconfont">&#xe6ff;</i></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props:{
    headerName:'',
    subType:''
  },
  data () {
    return {
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    getMemberDetail(){

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
  color:#fff;
  z-index:10;
  .back{
    float:left;
    width:1.33rem;
    text-align: center;
    padding-top: 0.35rem;
    height:1.33rem;
    box-sizing: border-box;
    position: relative;
    i{
      font-size:0.55rem;
    }
    &:after{
      position: absolute;
      content:'';
      width:1px;
      height:.68rem;
      background: #2a2d34;
      right:0;
      top:50%;
      margin-top: -.34rem;
    }
  }
  h2{
    float:left;
    font-size:0.46rem;
    padding:0.37rem 0 0 .4rem;
  }
  .righticon{
    position: absolute;
    top:0;
    right:0.5rem;
    span{
      display: block;
      &.member{
        padding-top: 0.34rem;
        height:1.33rem;
        box-sizing: border-box;
        i{
          font-size:0.65rem;
        }
      }
    }
  }
}
</style>
