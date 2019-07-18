import { asyncRoutes, constantRoutes } from '@/router'

import Layout from '@/layout'
import Message from "@/views/Message/index"
import Storetype from "@/views/Storetype/index"
import Superstore from "@/views/Superstore/index"
import Store from "@/views/Store/index"
import Circle from "@/views/Circle/index"
import App from "@/views/App/index"
import Auth from "@/views/Auth/index"
import Role from "@/views/Auth/Role/index"
import AdminUser from "@/views/AdminUser/index"
import Data from "@/views/Data/index"


/**
 * 定义路由映射表
 * @param {String} path 对应的是路由跳转地址, 可以由后端进行控制,这里默认的是采用后端配置的rule进行
 */
const routeMap = [
  {
    "path": "admin/storetype",
    "component": Storetype
  },
  {
    "path": "admin/message",
    "component": Message,
  },
  {
    "path": "admin/permission",
    "component": Auth,
  },
  {
    "path": "admin/superstore",
    "component": Superstore,
  },
  {
    "path": "admin/store/show/<id>",
    "component": Store,
  },
  {
    "path": "admin/circle",
    "component": Circle,
  },
  {
    "path": "admin/app",
    "component": App,
  },
  {
    "path": "admin/role",
    "component": Role,
  },
  {
    "path": "admin/admin-user",
    "component": AdminUser,
  }, {
    "path": "admin/data",
    "component": Data,
  }
]


/**
 * 递归创建节点
 * @param {String} routes 权限列表 
 * @param {Boolean} son  用户判断子节点
 * @returns {Boolean} 权限路由
 */
function filterRoutes(routes, son = false) {
  const res = []

  routes.forEach(route => {
    // 展开符获取所有的路由参数
    let tmp = { ...route }
    // 查找节点是否存在
    let result = findRouter(route)

    // 判断是否找到
    // 路由是否需要隐藏(例如表单类的控制是需要隐藏的)
    // 判断是否是根节点
    if ((result || (route.rule == "#"))) {
      let r = {};
      // 渲染根节点(菜单导航)
      if (!son) {
        r = {  // 路由
          path: "",
          component: Layout,
          name: route.name,
          meta: { title: route.name, icon: route.icon }
        }
      } else {

        r = {
          path: route.rule,
          component: result ? result.component : undefined, // 引入对应的component
          name: route.name,
          meta: { title: route.name, icon: route.icon },
          hidden: route.hidden // 用户确定是否需要在菜单栏中展开关闭
        }
      }

      // 判断子节点是否存在, 存在即添加, 递归形式进行
      if (tmp.children) {
        r.children = filterRoutes(tmp.children, true)
      }
      // 插入等待添加的路由中, 数组形式存在
      // 检查 r 是否存在子节点, 如果没有子节点, 就将其隐藏

      if (result || r.children && r.children.length != 0) {
        res.push(r)
      }
    }

  })
  return res
}

/**
 * 查找权限节点是否定义了component
 * @param {*} route 
 */
function findRouter(route) {
  return routeMap.find((router) => { 
    let pattern = new RegExp('get') // 菜单只需要显示的是get方法的可进入地址就可以
    return (router.path == route.rule) && pattern.test(route.method)
   })
}


/**
 * 重新规划节点菜单
 * @param {*} rules 
 */
function renderRouter(rules) {
  let new_rule = [] 
  let tmp = []
  console.log(rules)
  rules.forEach(rule => {
    if(rule.children) {
      // 遍历菜单, 将菜单整理为合适的格式, 如 Example
      rule.children.forEach((son_rule) => {
        if(son_rule.children) {
          son_rule.children.forEach(sson_rule => {
            if(sson_rule.component) {
              rule.children.push(sson_rule)
            }
          })
        }
      })
      tmp = []

      // 二次遍历菜单
      // : 因为菜单中会包含一些 # 的菜单项, 将其剔除
      rule.children.forEach((son_rule) => {
        if(son_rule.component) {
          tmp.push(son_rule)
        }
      })

      delete rule.children
      rule.children = tmp
      new_rule.push(rule)
    }
  })

  console.log(new_rule)
  return new_rule
}


/**
 * 动态添加权限
 * @param {*} rules 
 */
export function AddAsyncRoutes(rules) {
  let rules_ = filterRoutes(rules)
  rules_ = renderRouter(rules_)
  return rules_
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
