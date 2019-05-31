import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'
import Admin from '@/components/admin/Index'
import Home from '@/components/admin/Home'
import SuperStore from '@/components/admin/SuperStore'
import App from '@/components/admin/App'
import Message from '@/components/admin/Message'
import Store from '@/components/admin/Store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/home',
      children: [
        {
          path: "/admin/home",
          name: '首页',
          component: Home
        },
        {
          path: "/admin/store",
          name: '店铺管理',
          component: Store
        },
        {
          path: "/admin/superstore",
          name: '商圈管理',
          component: SuperStore
        },
        {
          path: "/admin/message",
          name: '消息管理',
          component: Message
        },
        {
          path: "/admin/app",
          name: 'App版本管理',
          component: App
        },
      ]
    },
    
  ]
})
