
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
        commit('SET_SUPERSTORE_ID', superstore_id)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}