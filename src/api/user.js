import {get, post, deletes, put} from '@/layout/components/http.js'

export function login(data) {
  return post('/api/login', data)
}

export function getInfo(token, sid) {
  return get('/api/me', {sid: sid})

  // return get('https://www.easy-mock.com/mock/5d0f3bcb811a0c1980e0a346/js/userInfo')
}

export function logout(sid) {
  return deletes('/api/logout', sid)
}
