<template>
  <div class="chat">
    <ul>
      <li class="clearfix" v-for="(item,index) in chatlist" :key="index">
        <router-link :to="'/chat/singleChat/'+item.wxID">
          <img :src="item.headUrl" alt="">
          <dl>
            <dt>{{item.petName}}</dt>
            <dd>{{item.lastMessage}}</dd>
          </dl>
          <span class="time">{{item.lastTime}}</span>
        </router-link>
      </li>
    </ul>
    <transition name="router-show">
		    <router-view></router-view>
		</transition>
  </div>
</template>

<script>
import CHAT_LIST from '../../setting/chatlist'
export default {
  name: 'Chat',
  data () {
    return {
      chatlist:CHAT_LIST
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chat{
  height:100vh;
  padding:1.33rem 0 1.6rem;
  box-sizing: border-box;
  overflow-y: auto;
  ul{
    li{
      position: relative;
      border-bottom:.01rem solid #efefef;
      a{
        display: block;
        padding:.2rem 0 .2rem .35rem;
        height:1.33rem;
        a:focus{
          background: #999;
        }
        img{
          float: left;
          width:1.33rem;
          height:1.33rem;
          vertical-align: top;
          margin-right: .35rem;
        }
        dl{
          float: left;
          padding:0.11rem 0 0;
          width:6.5rem;
          dt{
            color:#000;
            font-size:0.42rem;
            margin-bottom: 0.05rem;
          }
          dd{
            color:#999;
            font-size:0.34rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        span.time{
          position: absolute;
          right:0.32rem;
          color:#ccc;
          font-size:0.32rem;
        }
      }
    }
  }
}
</style>
