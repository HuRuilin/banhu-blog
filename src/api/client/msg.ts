import request from '../../utils/request'
const clientBaseUrl = 'client/'
// 发布留言
export const leaveMsg = (data: any) => {
    return request({
        url: `${clientBaseUrl}msg/leaveMsg`,
        method: "post",
        data
    })
}

// 客户端回复留言
export const replyMsgOfClient = (data: any) => {
    return request({
        url: `${clientBaseUrl}msg/replyMsg`,
        method: "post",
        data
    })
}


// 查询留言列表
export const queryMsgOfClient = () => {
    return request({
        url: `${clientBaseUrl}msg/query`,
        method: 'get',
    })
}