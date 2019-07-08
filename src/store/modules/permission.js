import { asyncRoutes, constantRoutes } from '@/router'

import Layout from '@/layout'
import Message from "@/views/Message/index"
import Storetype from "@/views/Storetype/index"

const routeMap = [
  {
    "path": "/storetype",
    "url": "admin/storetype",
    "redirect": '/message/index',
    "component": Storetype
  },
  {
    "path": "/message",
    "redirect": '/message/index',
    "url": "admin/message",
    "component": Message,
  }
]




// path: '/',
// component: Layout,
// redirect: '/index',
// name: 'D88',
// meta: { title: 'D88', icon: 'dashboard' },


function filterRoutes(routes, son=false) {
  const res = []

  routes.forEach(route => {
    let tmp = { ...route }
    console.log(route)
    let result = findRouter(route)
    if(result || route.hidden || (route.url == "#")) {
      let r = {};
      if(!son) {
        r = {  // 路由
          path: result.path,
          component: Layout,
          redirect: result,
          name: route.name,
          meta: { title: route.name, icon: route.icon }
        }
      }else{
        r = {
          path: 'index',
          name: route.name,
          component: result.component,
          meta: { title: route.name, icon: route.icon }
        }
      }
      
      if(tmp.children) {
        r.children = filterRoutes(tmp.children, true)
      }
      
      res.push(r)
    }
  })

  return res
}

function findRouter(route) {
  return routeMap.find((router) => { return (router.url == route.url) || true  })
}


/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}


export function AddAsyncRoutes(permissions) {
  return filterRoutes(permissions)
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
  generateRoutes({ commit }, permissions) {
    return new Promise(resolve => {
      let accessedRoutes
      
      accessedRoutes = AddAsyncRoutes(permissions) // 根据角色动态加载路由
      
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
