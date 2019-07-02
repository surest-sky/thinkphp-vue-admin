import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 公共组件 */
import Layout from '@/layout'

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
    name: 'D88',
    meta: { title: 'D88', icon: 'dashboard' },
    children: [
      {
        path: '/index',
        name: 'D88',
        component: () => import('@/views/Dashboard/index'),
        meta: { title: 'D88', icon: 'dashboard' }
      },
    ]
  },

  {
    path: '/superstore',
    component: Layout,
    redirect: '/superstore/index',
    name: '商圈管理',
    meta: { title: '商圈管理', icon: 'v' },
    children: [
      {
        path: 'index',
        name: '商圈管理',
        component: () => import('@/views/Superstore/index'),
        meta: { title: '商圈管理', icon: 'superstore' }
      },
    ]
  },

  {
    path: '/store',
    component: Layout,
    redirect: '/store/index',
    name: '店铺管理',
    meta: { title: '店铺管理', icon: 'store' },
    children: [
      {
        path: 'index',
        name: '店铺管理',
        component: () => import('@/views/Store/index'),
        meta: { title: '店铺管理', icon: 'store' }
      },
    ]
  },

  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    name: '消息管理',
    meta: { title: '消息管理', icon: 'message' },
    children: [
      {
        path: 'index',
        name: '消息管理',
        component: () => import('@/views/Message/index'),
        meta: { title: '消息管理', icon: 'message' }
      },
    ]
  },

  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    name: 'App管理',
    meta: { title: 'App管理', icon: 'app' },
    children: [
      {
        path: 'index',
        name: 'App管理',
        component: () => import('@/views/App/index'),
        meta: { title: 'App管理', icon: 'app' }
      },
    ]
  },

]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 最后匹配404页面
  { path: '*', redirect: '/404', hidden: true }
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
