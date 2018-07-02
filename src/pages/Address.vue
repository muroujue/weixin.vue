<template>
  <div class="address">
    <ul class="manage">
      <li>
        <span><i class="iconfont">&#xe6e1;</i></span>新的朋友
      </li>
      <li>
        <span><i class="iconfont">&#xe6ff;</i></span>群聊
      </li>
      <li>
        <span><i class="iconfont">&#xe74b;</i></span>标签
      </li>
      <li>
        <span><i class="iconfont">&#xe67b;</i></span>公众号
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Address',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.address{
  padding:1.33rem 0 1.6rem;
  font-size: 0.42rem;
  .manage{
    background: #fff;
    padding:0 .35rem;
    li{
      padding:.2rem 0;
      height:1.07rem;
      border-bottom:.01rem solid #efefef;
      span{
        display: inline-block;
        width:1.07rem;
        height:1.07rem;
        text-align: center;
        margin-right: .35rem;
        box-sizing: border-box;
        padding-top: 0.1rem;
        vertical-align: middle;
        i{
          color:#fff;
          font-size:0.85rem;
        }
      }
      &:last-child{
        border-bottom: none;
      }
      &:nth-child(1){
        span{
          background: #fa9e3a;
        }
      }
      &:nth-child(2){
        span{
          background: #46bf1c;
        }
      }
      &:nth-child(3){
        span{
          background: #2582d7;
        }
      }
      &:nth-child(4){
        span{
          background: #7b42d0;
        }
      }
    }
  }
}
</style>
