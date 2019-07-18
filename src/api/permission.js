import { get, post, deletes, put } from '@/utils/request'

export function getList() {
    return get('/api/permission')
}

export function getSimple(id) {
    return get('/api/permission/'+id)
}

export function getPermissionAll() {
    return get('/api/permission/all')
}

export function update(id, params) {
    return put('/api/permission/' + id, params)
}

export function create(params) {
    return post('/api/permission', params)
}

export function delete_(id) {
    return deletes('/api/permission/' + id)
}

export function init_permission(is_delete) {
    return post('/api/permission/init_permission', {is_delete})
}