export default {
    namespaced: true,
    state() {
        return {
            // 搜索关键字
            keyWord: ""
        }
    },
    mutations: {
        updateKeyword(state, val) {
            state.keyWord = val
        }
    }
}

