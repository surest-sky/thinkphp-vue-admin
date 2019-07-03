import request from '@/utils/request'
import {get, post, deletes, put} from '@/layout/components/http.js'

import md5 from 'js-md5';

export function login(data) {
  data.password = md5(data.password)
  return post('/api/login/login', data)
}

export function getInfo(token) {
  console.log(token)
  return get('/api/userinfo')
}

export function logout() {
  return get('/api/userinfo')
}
