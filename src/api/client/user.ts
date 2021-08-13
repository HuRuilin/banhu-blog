import request from '../../utils/request'
import type { AxiosResponse } from 'axios'
const clientBaseUrl = 'client/'
/**
    * 发送验证码
    * @param {*} data
    * @property {string} email - 邮箱地址
    */
export const sendCode = (data: any) => {
    return request({
        method: "post",
        url: `${clientBaseUrl}users/sendCode`,
        data
    })
}

/**
 * 登录
 * @param {*} data
 * @property email - 邮箱地址
 * @property code - 验证码
 */
export const clientLogin = (data: any) => {
    return request({
        method: "post",
        url: `${clientBaseUrl}users/login`,
        data
    })
}

/**
 *查询客户端用户信息
 */
export const queryClientUserInfo = (params: any) => {
    return request({
        method: "get",
        url: `${clientBaseUrl}users/queryUserInfo`,
        params
    })
}