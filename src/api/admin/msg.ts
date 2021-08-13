import request from '../../utils/request'
const adminBaseUrl = 'admin/'
/**
 * 发表回复
 * @param {*} data
 */
export const replyMsgOfAdmin = (data: any) => {
    return request({
        method: "post",
        url: `${adminBaseUrl}msg/replyMsg`,
        data
    })
}

/**
 * 查询列表
 * @param {*} 
 */
export const queryMsgOfAdmin = () => {
    return request({
        method: "get",
        url: `${adminBaseUrl}msg/query`
    })
}

