import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import QS from "qs"

// 创建一个axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

    if (store.getters.token) {
      
      // 添加前置参数
      if(config.params) {
        config.params.sid = getToken()
      }else{
        config.params = {
          sid : getToken()
        }
      }
    }
    return config
  },
  error => {
    
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 前置响应
service.interceptors.response.use(

  response => {
    const res = response.data

    // 这里设置的非请求成功的code
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 这里设置你请求出现异常, 例如超权限请求的地,告知他重新登录
      if (res.code === 403) {
        // 提示
        MessageBox.confirm('您已注销，可以取消以留在此页，或重新登录。', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // 错误的提示
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)



export function get(url, params = {}) {
  return service({
    url: url,
    method: 'get',
    params
  })
}

  //封装post请求
  export function post(url, data = {}) { 
    //默认配置 
    let sendObject={
      url: url,
      method: 'post',
      data:QS.stringify(data)
    };

    return service(sendObject)
  }
  
  //封装put方法 (resfulAPI常用)
  export function put(url,data = {}){
    let sendObject = {
      url: url,
      method: 'put',
      data:QS.stringify(data)
    }
    return service(sendObject)
  }
  
  //删除方法(resfulAPI常用)
  export function deletes(url, data){
    return service({
      url: url,
      method: 'delete',
      data:QS.stringify(data)
    }) 
  }