import { resolve } from "url";

import axios from "axios"
import QS from "qs"

const service = axios.create()

const http = {}


// dev 开发版
// production 生产环境
const host = "http://store.ink/admin/"
// const host = "http://test-offline.d88.ink/admin/"
// const host = "https://offline.d88.ink/admin/"
// const host = "http://192.168.2.199:96/admin/"



service.interceptors.request.use(config => {
    return config
}), error => {
    Promise.reject(error)
}

service.interceptors.response.use(
    response => {
        let res = {}
        res = response.data
        return res
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
      data:JSON.stringify(data)
    }


    console.log(sendObject)

    return service(sendObject)
  }
  //删除方法(resfulAPI常用)
  export function deletes(url){
    var url = url.replace('/\api/', host);
    return service({
      url: url,
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }) 
  }

  
  //不要忘记export
  export {
    service
  }