import { get, post, deletes, put } from '@/utils/request'

export function login(data) {
  return post('/admin/login', data)
}

export function getInfo(token, sid) {
  return get('/admin/me', {sid: sid})

  // return get('https://www.easy-mock.com/mock/5d0f3bcb811a0c1980e0a346/js/userInfo')
}

export function logout(sid) {
  return deletes('/admin/logout', sid)
}
