import { get, post, deletes, put } from '@/utils/request'

export function getList(data) {
    return get('/admin/info/data', data)
}