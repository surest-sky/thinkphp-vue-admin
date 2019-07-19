import { resolve } from "url";

import store from '@/store'
import { getToken } from '@/utils/auth'
import axios from "axios"
import QS from "qs"
import { Message } from 'element-ui'

const service = axios.create()

const http = {}

// dev 开发版
// production 生产环境
// const host = "http://store.ink/admin/"
// const host = "http://test-offline.d88.ink/admin/"
// const host = "https://offline.d88.ink/admin/"
// const host = "http://192.168.2.199:96/admin/"


service.interceptors.request.use(config => {
  if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    
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
    var url = url.replace('/\api/', host);
    return service({
      url: url,
      method: 'get',
      params
    })
  }


  //封装post请求
export function post(url, data = {}) { 
    var url = url.replace('/\api/', host);
    //默认配置 
    let sendObject={
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data:QS.stringify(data)
    };

    return service(sendObject)
  }
  
  //封装put方法 (resfulAPI常用)
  export function put(url,data = {}){
    var url = url.replace('/\api/', host);
    let sendObject = {
      url: url,
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data:QS.stringify(data)
    }
    return service(sendObject)
  }
  //删除方法(resfulAPI常用)
  export function deletes(url, data){
    var url = url.replace('/\api/', host);
    return service({
      url: url,
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data:QS.stringify(data)
    }) 
  }

  
  //不要忘记export
  export {
    service
  }