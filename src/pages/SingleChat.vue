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
              <span v-if="item.msgType===1">{{item.sendMsg}}</span>
              <span class="audioType" v-else-if="item.msgType===2" :style="{width:(item.second*0.6) + 'rem'}" @click="playRecord">
                <i class="iconfont">&#xe628;</i>
                <b>{{item.second}}"</b>
                <audio ref="audioMe"></audio>
              </span>
            </p>
          </div>
          <div v-if="item.sendObject === 1">
            <p class="clearfix friend" v-scroll>
              <img :src="singleChatData.headUrl" alt="">
              <span v-if="item.msgType===1">{{item.sendMsg}}</span>
              <span class="audioType" v-else-if="item.msgType===2" :style="{width:(item.second*0.6) + 'rem'}" @click="playRecord"><i class="iconfont">&#xe62b;</i><b>{{item.second}}"</b></span>
            </p>
          </div>
        </li>
      </ul>
      <p></p>
    </div>
    <div class="chatInput clearfix">
      <!-- 文字输入 -->
      <span class="type" v-show="inputType===1" @click="switchType"><i class="iconfont">&#xe805;</i></span>
      <edit-div v-show="inputType===1" :isclear="clearChat" :isfocus="beFocus" v-model="chatText" @keyup.native.enter="sendMsg" @focus.native="getFocus"></edit-div>
      <!-- 语音输入 -->
      <span class="type" v-show="inputType===2" @click="switchType"><i class="iconfont">&#xe7b2;</i></span>
      <p class="yxBtn" :class="{tapeon:tapeState}" v-show="inputType===2" @touchstart="tapeStart" @touchend="tapeEnd" v-touch:long="tape">{{yxBtnText}}</p>
      <span class="emoji"><i class="iconfont">&#xe61e;</i></span>
      <span class="more" v-show="!isInputed"><i class="iconfont">&#xe607;</i></span>
      <span class="button" v-show="isInputed" @mousedown="sendMsg">发送</span>
    </div>
    <div class="taping" v-show="tapeState">
      <div class="run" v-if="!ishort">
        <i class="iconfont">&#xe64c;</i>
        <span><audio ref="audio" src="audioSrc"></audio></span>
        <p>手指上滑，取消发送</p>
      </div>
      <div class="over" v-else>
        <i class="iconfont">&#xea9e;</i>
        <p>录音时间太短！</p>
      </div>
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
      recordTime:0,
      chatList:CHAT_LIST,
      isInputed:false,
      chatText:'',
      beFocus:true,
      messageList:[],
      lastChatTime:null,
      inputType:1,
      yxBtnText:'按住 说话',
      tapeState:false,
      timer:null,
      ishort:false,
      audioSrc:'',
      audioStream:null,
      recorder:null,
      recorderFile:null,
      stopCallback:null
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
        "sendMsg":this.chatText,
        "msgType":1
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
            "sendMsg":item.values.text,
            "msgType":1
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
    },
    switchType(){
      this.inputType = this.inputType === 1 ? 2 : 1
    },
    tapeStart(){
      this.yxBtnText = '松开 结束'
      this.tapeState = true
    },
    tapeEnd(){
      this.yxBtnText = '按住 说话'
      if (this.recordTime === 0) {
        this.ishort = true
        if (this.recorder) this.stopRecord()
        setTimeout(()=>{
          this.tapeState = false
          this.ishort = false
        },500)
      } else {
        this.tapeState = false
        this.stopRecord(this.sendRecordMsg)
        setTimeout(()=>{
          this.recordTime = 0
        },1000)
      }
      clearInterval(this.timer)
    },
    tape(){
      this.timer = setInterval(()=>{
        this.recordTime++
        if (this.recordTime === 60000) {
          this.tapeEnd()
        }
      },1000)
      this.startRecord()
    },
    startRecord(){
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia({ audio: true }).then((stream)=>{
        this.audioStream = stream
        this.recorder = new MediaRecorder(stream)
        let chunks = [], startTime = 0
        this.recorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }
        this.recorder.onstop = (e) => {
          this.recorderFile = new Blob(chunks, { 'type' : this.recorder.mimeType })
          chunks = []
          if (this.stopCallback) {
            this.stopCallback()
          }
        }
        this.recorder.start()
      }).catch((err)=>{
        switch (name) {
          // 用户拒绝
          case 'NotAllowedError':
          case 'PermissionDeniedError':
            errorMessage = '用户已禁止网页调用录音设备'
          break;
          // 没接入录音设备
          case 'NotFoundError':
          case 'DevicesNotFoundError':
            errorMessage = '录音设备未找到'
          break;
          // 其它错误
          case 'NotSupportedError':
            errorMessage = '不支持录音功能'
          break;
          default:
            errorMessage = '录音调用错误'
        }
        console.log(errorMessage)
      })
    },
    stopRecord(callback){
      this.stopCallback = callback
      this.recorder.stop()
      // 关闭媒体流
      this.closeStream()
      let url = window.URL ? window.URL.createObjectURL(this.recorderFile) : window.webkitURL.createObjectURL(this.recorderFile)
      let audioDom = this.$refs.audioMe
      audioDom.src = url
    },
    closeStream(){
      if (typeof this.audioStream.stop === 'function') {
        this.audioStream.stop()
      }
      else {
        let trackList = [this.audioStream.getAudioTracks(), this.audioStream.getVideoTracks()]
        for (let i = 0; i < trackList.length; i++) {
          let tracks = trackList[i]
          if (tracks && tracks.length > 0) {
            for (let j = 0; j < tracks.length; j++) {
              let track = tracks[j]
              if (typeof track.stop === 'function') {
                track.stop()
              }
            }
          }
        }
      }
    },
    playRecord(){
      audioDom.autoplay = true
    },
    sendRecordMsg(){
      let myMsg = {
        "sendObject":0,
        "msgType":2,
        "second":this.recordTime
      }
      this.messageList.push(myMsg)
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
            &.audioType{
              padding-right: 0.2rem;
              text-align: right;
              min-width:1rem;
              max-width:4.5rem;
            }
            i.iconfont{
              color:#398800;
              font-size:0.44rem;
            }
            b{
              position: absolute;
              width:0.5rem;
              text-align: right;
              left:-0.7rem;
              color:#999;
              top:0.3rem;
              font-size:0.34rem;
            }
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
              &.audioType{
                padding-left: 0.2rem;
                text-align: left;
              }
              b{
                text-align: left;
                right:-0.9rem;
                left:auto;
                top:0.3rem;
              }
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
    padding:0.1rem 0.28rem 0.28rem 1.3rem;
    z-index:9;
    .yxBtn{
      height:.74rem;
      border: 0.02rem solid #d2d2d2;
      width:5.5rem;
      border-radius:0.1rem;
      text-align: center;
      line-height: 0.74rem;
      margin: 0.14rem 0 0 0.2rem;
      &.tapeon{
        background: #e2e2e2;
      }
    }
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
  .taping{
    position: fixed;
    left:50%;
    top:50%;
    background:rgba(0,0,0,0.7);
    width:4rem;
    height:4rem;
    margin: -2rem 0 0 -2rem;
    border-radius: 0.2rem;
    color:#fff;
    box-sizing: border-box;
    padding:0.5rem 0 0;
    text-align:center;
    .run{
      i{
        font-size:2rem;
      }
      p{
        margin-top: 0.4rem;
      }
    }
    .over{
      i{
        font-size:2.4rem
      }
    }
    p{
      font-size:0.36rem;
    }
  }
}
</style>
