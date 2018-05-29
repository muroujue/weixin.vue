// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueTouch,{name: 'v-touch'})

// /* simple requests ajax module */
// let ajax = axios.create()
// // 允许跨域传送cookies
// ajax.interceptors.request.use((config) => {
//   /* 降级为简单的ajax请求，用以适配服务端API不支持CORS标准的情况 */
//   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//   if(config.method === 'post') {
//       config.data = qs.stringify( {
//           ...config.data
//       })
//   }
//   return config
// },(error) => {
//   console.log('请求发送异常')
//   Promise.reject(error)
// })

// ajax.interceptors.response.use(function (response) {
//   return response.data
// }, function (error) {
//   console.log('请求接收异常')
//   return Promise.reject(error)
// })

// Vue.prototype.$ajax = ajax

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
