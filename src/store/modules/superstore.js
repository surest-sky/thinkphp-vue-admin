
const state = {
    superstore_id: ''
}

const mutations = {
    SET_SUPERSTORE_ID(state, superstore_id) {
        state.superstore_id = superstore_id
    }
}

const actions = { 
    setStoreId({ commit }, superstore_id) {
        return new Promise((resolve, reject) => {
            commit('SET_SUPERSTORE_ID', superstore_id)
            resolve()
        })
    }
}

// 获取状态信息
const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}