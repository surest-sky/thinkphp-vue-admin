import { get, post, deletes, put } from '@/utils/request'

export function getList(data) {
    return get('/admin/admin-user', data)
}

export function createOrUpdateRole(id = null, data) {
    if(!id) {
        return post('/admin/admin-user', data)
    }else{
        return put('/admin/admin-user/' + id, data)
    }
}

export function getUser(id) {
    return get('/admin/admin-user/' + id)
}

export function deleteUser(id) {
    return deletes('/admin/admin-user/' + id)
}

