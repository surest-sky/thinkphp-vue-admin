import { get, post, deletes, put } from '@/utils/request'

export function getList() {
    return get('/admin/permission')
}

export function getSimple(id) {
    return get('/admin/permission/'+id)
}

export function getPermissionAll() {
    return get('/admin/permission/all')
}

export function update(id, params) {
    return put('/admin/permission/' + id, params)
}

export function create(params) {
    return post('/admin/permission', params)
}

export function delete_(id) {
    return deletes('/admin/permission/' + id)
}

export function init_permission(is_delete) {
    return post('/admin/permission/init_permission', {is_delete})
}