import { get, post, deletes, put } from '@/utils/request'

export function getList() {
    return get('/admin/role')
}

export function getPermissionAll(roleid) {
    return get('/admin/role/permission' + '/' + roleid)
}

export function getRoleInfo(id) {
    return get('/admin/role/permissions/' + id)
}

export function createOrUpdateRole(id = null, data) {
    if(!id) {
        return post('/admin/role', data)
    }else{
        return put('/admin/role/' + id, data)
    }
}

export function getRoleList() {
    return get('/admin/role/all')
}