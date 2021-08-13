import Cookie from 'js-cookie'
import MD5 from 'js-md5'
import { login, queryAdminUserInfo} from '@/api'
import tokenKeys from '@/enum/tokenKeys'

export default {
    namespaced: true,
    state() {
        return {
            token: Cookie.get(tokenKeys['adminToken']),
            userInfo: {}
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        async login({ commit }, form) {
            try {
                const { account, password } = form
                const cryptoPwd = MD5(password)
                const { result } = await login({
                    account,
                    password: cryptoPwd,
                })
                const token = result.token
                Cookie.set(tokenKeys['adminToken'], token)
                commit('SET_TOKEN', token)
                return token
            } catch (err) {
                console.error(err)
            }
        },

        /**
        * 查询用户信息
        * @param {*}
        */
        queryUserInfo({ commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { result } = await queryAdminUserInfo()
                    console.log('管理端用户信息', result)
                    commit('SET_USERINFO', result)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}



