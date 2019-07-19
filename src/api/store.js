import { get, post, deletes, put } from '@/utils/request'

/**
 * 获取店铺列表
 * @param {*} id  商圈id
 * @param {*} params 查询参数
 */
export function getList(id, params) {
    return get("/api/store/show/" + id, params)
}

/**
 * 获取所有的商圈
 */
export function getSuperstoreAll() {
    return get("/api/superstore/all")
}

/**
 * 获取店铺类型
 */
export function getStoreType() {
    return get('/api/storetype')
}

/**
 * 获取商圈下对应的店铺
 * @param {*} superstore_id 
 */
export function getSroreToSuperstore(superstore_id) {
    return get('/api/store/show/' + superstore_id )
}

/**
 * 获取店铺详情
 * @param {*} id 店铺id
 */
export function getStore(id) {
    return get("/api/store/" + id)
}

/**
 * 更新店铺
 * @param {*} id 
 * @param {*} data 
 */
export function updateStore(id, data) {
    return put("/api/store/" + id, data)
}

/**
 * 创建店铺
 * @param {*} id 
 * @param {*} data 
 */
export function createStore(data) {
    return post("/api/store", data)
}