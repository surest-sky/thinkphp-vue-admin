import { resolve } from "url";

import axios from "axios"

const service = axios.create()

const http = {}


// dev 开发版
// production 生产环境
// const host = "http://store.ink"
// const host = "http://test-offline.d88.ink"
const host = "http://192.168.2.199:96/admin/"



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
      headers: {     
      },
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
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:data
    };
    sendObject.data=JSON.stringify(data);
    return service(sendObject)
  }
  
  //封装put方法 (resfulAPI常用)
  export function put(url,data = {}){
    var url = url.replace('/\api/', host);
    return service({
      url: url,
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:JSON.stringify(data)
    }) 
  }
  //删除方法(resfulAPI常用)
  export function deletes(url){
    var url = url.replace('/\api/', host);
    return service({
      url: url,
      method: 'delete',
      headers: {}
    }) 
  }

  
  //不要忘记export
  export {
    service
  }