import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 公共组件 */
import Layout from '@/layout'

import {HOST_NAME, HOST_TITLE} from '@/utils/web.js'

/**
 * 注意: 子菜单仅在路由children.length> = 1时出现
 * 详情见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则为true，项目不会显示在侧栏中（默认为false）
 * alwaysShow: true               如果设置为true，则将始终显示根菜单
 *                                如果没有设置alwaysShow，当项目有多个子路线时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           noRedirect如果设置noRedirect将不会在breadcrumb中重定向
 * name:'router-name'             'router-name'这个名字由<keep-alive>使用（必须设置!!!）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            如果设置为false，该项将隐藏在痕迹中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * 基础路由(不需要权限)
 * 没有权限要求的路由
 * 谁都可以访问的路由
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },


  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: HOST_NAME,
    meta: { title: HOST_NAME, icon: 'dashboard' },
    children: [
      {
        path: '/index',
        name: HOST_NAME,
        component: () => import('@/views/Dashboard/index'),
        meta: { title: HOST_NAME, icon: 'dashboard' }
      },
    ]
  },

]


const createRouter = () => new Router({
  // mode: 'history', // 需要服务支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
