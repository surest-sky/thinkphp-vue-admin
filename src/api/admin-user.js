import { get, post, deletes, put } from '@/utils/request'

export function getList(data) {
    return get('/api/admin-user', data)
}

export function createOrUpdateRole(id = null, data) {
    if(!id) {
        return post('/api/admin-user', data)
    }else{
        return put('/api/admin-user/' + id, data)
    }
}

export function getUser(id) {
    return get('/api/admin-user/' + id)
}

export function deleteUser(id) {
    return deletes('/api/admin-user/' + id)
}

