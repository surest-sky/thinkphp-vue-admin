import request from '@/utils/request'
import {get, post, deletes, put} from '@/layout/components/http.js'

import md5 from 'js-md5';

export function login(data) {
  data.password = md5(data.password)
  return post('/api/login/login', data)
}

export function getInfo(token) {
  // return get('/api/userinfo')

  return get('https://www.easy-mock.com/mock/5d0f3bcb811a0c1980e0a346/js/userInfo')
}

export function logout() {
  return get('/api/userinfo')
}
