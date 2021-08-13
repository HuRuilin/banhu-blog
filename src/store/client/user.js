import Cookie from 'js-cookie'
import { clientLogin, queryClientUserInfo } from '@/api'
import tokenKeys from '@/enum/tokenKeys'
export default {
    namespaced: true,
    state() {
        return {
            // 客户端令牌
            token: Cookie.get(tokenKeys['clientToken']) || '',
            // 是否显示登录窗口
            isVisible: false,
            // 客户端用户信息
            userInfo: {}
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        setVisible(state, val) {
            state.isVisible = val
        },
    },

    actions: {
        isAuthorized({ commit, state }) {
            return new Promise((resolve, reject) => {
                const isLogin = !!state.token
                isLogin ? resolve() : reject()
            })
        },

        /**
         * 客户端登录
         * @param {*} param0
         * @param {*} data
         */
        async login({ commit }, data) {
            try {
                const { result } = await clientLogin(data)
                const token = result.token
                Cookie.set(tokenKeys['clientToken'], token)
                commit('SET_TOKEN', token)
                return token
            } catch (error) {
                console.error(error)
                throw new Error(error)
            }
        },

        /**
         * 查询用户信息
         * @param {*}
         */
        queryUserInfo({ commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { result } = await queryClientUserInfo()
                    commit('SET_USERINFO', result)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        }
    }

}
