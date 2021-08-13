export * from './client/user'
export * from './client/msg'
export * from './client/articles'
export * from './admin/articles'
export * from './admin/msg'
export * from './admin/user'
import request from '../utils/request'
const commonBaseUrl = 'common/'
export const upload = function (file: any) {
    return request({
        method: 'post',
        url: `${commonBaseUrl}upload`,
        data: file
    })
}