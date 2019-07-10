import { asyncRoutes, constantRoutes } from '@/router'

import Layout from '@/layout'
import Message from "@/views/Message/index"
import Storetype from "@/views/Storetype/index"


/**
 * 定义路由映射表
 * @param {String} path 对应的是路由跳转地址, 可以由后端进行控制,这里默认的是采用后端配置的url进行
 */
const routeMap = [
  {
    "path": "admin/storetype",
    "component": Storetype
  },
  {
    "path": "admin/message",
    "component": Message,
  }
]


/**
 * 递归创建节点
 * @param {String} routes 权限列表 
 * @param {Boolean} son  用户判断子节点
 * @returns {Boolean} 权限路由
 */
function filterRoutes(routes, son=false) {
  const res = []

  routes.forEach(route => {
    // 展开符获取所有的路由参数
    let tmp = { ...route }
    // 查找节点是否存在
    let result = findRouter(route)

    // 判断是否找到
    // 路由是否需要隐藏(例如表单类的控制是需要隐藏的)
    // 判断是否是根节点
    if(result || route.hidden || (route.url == "#")) {
      let r = {};
      // 渲染根节点(菜单导航)
      if(!son) {
        r = {  // 路由
          path: "",
          component: Layout,
          name: route.name,
          meta: { title: route.name, icon: route.icon }
        }
      }else{
        // 渲染子节点
        r = {
          path: route.url,
          component: result.component, // 引入对应的component
          name: route.name,
          meta: { title: route.name, icon: route.icon},
          hidden: route.hidden // 用户确定是否需要在菜单栏中展开关闭
        }
      }
      
      // 判断子节点是否存在, 存在即添加, 递归形式进行
      if(tmp.children) {
        r.children = filterRoutes(tmp.children, true)
      }
      
      // 插入等待添加的路由中, 数组形式存在
      res.push(r)
    }
  })

  return res
}

/**
 * 查找权限节点是否定义了component
 * @param {*} route 
 */
function findRouter(route) {
  return routeMap.find((router) => { return (router.url == route.url) || true  })
}


/**
 * 动态添加权限
 * @param {*} rules 
 */
export function AddAsyncRoutes(rules) {
  return filterRoutes(rules)
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}


const actions = {
  generateRoutes({ commit }, rules) {
    return new Promise(resolve => {
      let accessedRoutes
      
      accessedRoutes = AddAsyncRoutes(rules) // 根据角色动态加载路由
      
      // 设置路由到vuex中
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
