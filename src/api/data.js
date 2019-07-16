import {get, post, deletes, put} from '@/layout/components/http.js'

export function getList(data) {
    return get('/api/info/discount_user', data)
}