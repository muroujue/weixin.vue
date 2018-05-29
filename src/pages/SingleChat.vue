<template>
  <div class="singleChat">
    <sub-header :headerName="singleChatData.petName" subType="singleChat" @touchend="blurFocus"></sub-header>
    <div class="chatCont" @touchend="blurFocus">
      <ul>
        <li v-for="(item,index) in messageList" :key="index">
          <div v-if="item.sendObject === 0">
            <span class="time" v-if="item.sendTime"><i>{{item.sendTime}}</i></span>
            <p class="clearfix me" v-scroll>
              <img src="../../static/images/avatar/me.jpg" alt="">
              <span>{{item.sendMsg}}</span>
            </p>
          </div>
          <div v-if="item.sendObject === 1">
            <p class="clearfix friend" v-scroll>
              <img :src="singleChatData.headUrl" alt="">
            <span>{{item.sendMsg}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="chatInput clearfix">
      <span class="type" @click="switchType"><i class="iconfont">&#xe805;</i></span>
      <edit-div :isclear="clearChat" :isfocus="beFocus" v-model="chatText" @keyup.native.enter="sendMsg" @focus.native="getFocus"></edit-div>
      <span class="emoji"><i class="iconfont">&#xe61e;</i></span>
      <span class="more" v-show="!isInputed"><i class="iconfont">&#xe607;</i></span>
      <span class="button" v-show="isInputed" @mousedown="sendMsg">发送</span>
    </div>
  </div>
</template>

<script>
import SubHeader from '../components/SubHeader'
import EditDiv from '../components/EditDiv'
import CHAT_LIST from '../../setting/chatlist'
export default {
  name: 'SingleChat',
  data () {
    return {
      chatList:CHAT_LIST,
      isInputed:false,
      chatText:'',
      beFocus:true,
      messageList:[],
      lastChatTime:null
    }
  },
  computed:{
    singleChatData(){
      return this.chatList.filter(item => item.wxID == this.$route.params.wxid)[0]
    },
    clearChat(){
      return this.isInputed ? 0 : 1
    }
  },
  components:{
    SubHeader,
    EditDiv
  },
  mounted(){
  },
  methods:{
    sendMsg(){
      let myMsg = {
        "sendObject":0,
        "sendMsg":this.chatText
      }
      if (!this.lastChatTime) {
        myMsg.sendTime = new Date().getHours() + ":" + new Date().getMinutes()
        this.lastChatTime = new Date().getTime()
      } else {
        let nowTime = new Date().getTime()
        if (nowTime - this.lastChatTime > 300000) {
          myMsg.sendTime = new Date().getHours() + ":" + new Date().getMinutes()
        } else {
          myMsg.sendTime = ''
        }
        this.lastChatTime = nowTime
      }
      this.messageList.push(myMsg)
      this.$http({
          method: 'post',
          url: '/api/v2',
          data: {
            "reqType":0,
            "perception": {
                "inputText": {
                    "text": this.chatText
                }
            },
            "userInfo": {
                "apiKey": "33754be04e074a24b34b8eb723616948",
                "userId": "264881"
            }
          }
      }).then((data) => {
        let results = data.data.results
        console.log(results)
        results.forEach((item,index) => {
          let newItem = {
            "sendObject":1,
            "sendMsg":item.values.text
          }
          this.messageList.push(newItem)
        })
      })
      this.chatText = ''
    },
    blurFocus(){
      this.beFocus = false
    },
    getFocus(){
      this.beFocus = true
    }
  },
  watch:{
    'chatText'(val){
      this.isInputed = val ? true : false
    }
  },
  directives: {
    scroll: {
      inserted(el) {
        el.scrollIntoView()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.singleChat{
  position: absolute;
  background: #ebebeb;
  top:0;
  bottom:0;
  right:0;
  left:0;
  z-index:11;
  // border:1px solid #ebebeb;
  .chatCont{
    position: relative;
    padding:1.33rem 0 1.32rem;
    height:100vh;
    box-sizing: border-box;
    overflow-y: auto;
    &.onInput{
      overflow-y: hidden;
      ul{
        position: absolute;
        bottom: 1.32rem;
      }
    }
    ul{
      width:100%;
      box-sizing: border-box;
      padding:0 .21rem;
      li{
        margin-bottom:.32rem;
        .time{
          display: block;
          text-align: center;
          padding:.32rem 0;
          i{
            display: inline-block;
            background: #d4d4d4;
            color:#fff;
            border-radius: .07rem;
            font-size:.32rem;
            padding:0.1rem 0.2rem;
          }
        }
        p{
          img{
            width:1.06rem;
            height:1.06rem;
          }
          span{
            position: relative;
            max-width: 6.2rem;
            border-radius: .07rem;
            padding:.24rem .27rem;
            min-height:1.06rem;
            box-sizing: border-box;
            line-height: 1.5;
            &:after{
              content:'';
              position:absolute;
              width:0;
              height:0;
            }
          }
          &.friend{
            img{
              float:left;
              margin-right: .27rem;
            }
            span{
              float:left;
              background: #fff;
              box-shadow: 0 0 .03rem#e4e4e4;
              &:after{
                border-top:.2rem solid transparent;
                border-bottom:.2rem solid transparent;
                border-right:.16rem solid #fff;
                left:-.13rem;
                top:0.35rem;
              }
            }
          }
          &.me{
            img{
              float:right;
              margin-left: .27rem;
            }
            span{
              float:right;
              background: #a0e859;
              box-shadow: 0 0 .03rem#8fcd5d;
              &:after{
                border-top:.2rem solid transparent;
                border-bottom:.2rem solid transparent;
                border-left:.16rem solid #a0e859;
                right:-.13rem;
                top:0.35rem;
              }
            }
          }
        }
      }
    }
  }
  .chatInput{
    position: fixed;
    width:100%;
    bottom:0;
    left:0;
    box-sizing: border-box;
    background: #fff;
    border-top: 0.01rem solid #e1e1e1;
    padding:0.1rem 0.32rem 0.28rem 1.3rem;
    z-index:9;
    span{
      bottom:0.16rem;
      position: absolute;
      i{
        color:#8e8e8e;
      }
      &.type{
        left:0.3rem;
        i{
          font-size:0.85rem;
        }
      }
      &.emoji{
        right:1.6rem;
        i{
          font-size:0.88rem;
        }
      }
      &.more{
        right:0.3rem;
        bottom:0.15rem;
        i{
          font-size:0.91rem
        }
      }
      &.button{
        background: #19ac18;
        border-radius: .07rem;
        border:1px solid #089406;
        right:0.18rem;
        color:#fff;
        bottom:0.28rem;
        padding:0.13rem 0.24rem;
        font-size:0.34rem;
      }
    }
  }
}
</style>
