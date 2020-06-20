import { resolve } from "url";

import store from '@/store'
import { getToken } from '@/utils/auth'
import axios from "axios"
import QS from "qs"
import { Message } from 'element-ui'

const service = axios.create()

service.interceptors.request.use(config => {
  if (store.getters.token) {
    if(config.params) {
      config.params.sid = getToken()
    }else{
      config.params = {
        sid : getToken()
      }
    }
  }

  return config

}), error => {
    Promise.reject(error)
}

service.interceptors.response.use(
    response => {
        let res = {}
        res = response.data
        
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
          Message({
            message: res.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })

          // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
          if (res.code === 403) {
            // to re-login
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

          console.log(response.data)
          return Promise.reject(new Error(res.msg || 'Error'))
        } else {
          return res
        }

    },
    error => {
        if(error.response && error.response.status == 404){
            console.log(error)
        }

        return Promise.reject(error.response)
    }
)
export function get(url, params = {}) {
    params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.  
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

  
  //不要忘记export
  export {
    service
  }