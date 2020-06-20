import { get, post, deletes, put } from '@/utils/request'

export function getList(data) {
    return get('/admin/role', data)
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

export function deleteRole(id) {
    return deletes(`/admin/role/${id}`)
}