import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/pages/Chat'
import Address from '@/pages/Address'
import Discover from '@/pages/Discover'
import UserCenter from '@/pages/UserCenter'
import SingleChat from '@/pages/SingleChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/chat'
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      children: [
        {
          path: 'singleChat/:wxid',
          name: 'SingleChat',
          component: SingleChat
        }
      ]
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/user',
      name: 'UserCenter',
      component: UserCenter
    }
  ]
})
