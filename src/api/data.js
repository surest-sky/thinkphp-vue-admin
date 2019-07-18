import { get, post, deletes, put } from '@/utils/request'

export function getList(data) {
    return get('/api/info/discount_user', data)
}