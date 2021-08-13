
import request from '../../utils/request'
const adminBaseUrl = 'admin/'

/**
 * 管理端账户登录
 * @param {*} data
 * @property {string} userName - 用户名
 * @property {string} password - 用户登录密码
 */
export const login = function (data: any) {
    return request({
        method: "post",
        url: `${adminBaseUrl}users/login`,
        data
    })
}

/**
 *查询管理端用户信息
 */
export const queryAdminUserInfo = () => {
    return request({
        method: "get",
        url: `${adminBaseUrl}users/queryUserInfo`
    })
}




// 查询客户列表
export const queryClientUsers = (params: any) => {
    return request({
        method: "get",
        url: `${adminBaseUrl}users/query`,
        params
    })
}

/**
 * 更新用户状态
 * @param {*} data
 */
export const updateClientUserStatus=(data:any)=> {
    return request({
        method:`post`,
        url: `${adminBaseUrl}users/updateStatus`,
        data
    })
}
