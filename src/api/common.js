import { get, post, deletes, put } from '@/utils/request'

/**
 * 获取店铺列表
 * @param {*} id  商圈id
 * @param {*} params 查询参数
 */
export function getQiniuToken() {
    return get("/api/qiniu/photo", {
        type: 'photo'
    })
}