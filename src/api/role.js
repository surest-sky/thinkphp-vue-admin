import {get, post, deletes, put} from '@/layout/components/http.js'

export function getList() {
    return get('/api/role')
}

export function getPermissionAll(roleid) {
    return get('/api/role/permission' + '/' + roleid)
}

export function getRoleInfo(id) {
    return get('/api/role/permissions/' + id)
}

export function createOrUpdateRole(id = null, data) {
    if(!id) {
        return post('/api/role', data)
    }else{
        return put('/api/role/' + id, data)
    }
}