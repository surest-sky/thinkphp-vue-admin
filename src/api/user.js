import { get, post, deletes, put } from '@/utils/request'

export function login(data) {
  return post('/admin/login', data)
}

export function getInfo(token, sid) {
  return get('/admin/me', {sid: sid})
}

export function logout(sid) {
  return deletes('/admin/logout', sid)
}
