import request from '../../utils/request'
const clientBaseUrl = 'client/'

// 查询文章列表
export const queryArticles = function (params?: any) {
    return request({
        method: 'get',
        url: "client/articles/query",
        params,
    })
}

// 查询分类列表
export const queryCategories = function (params?: any) {
    return request({
        method: 'get',
        url: "client/categories/queryAll",
        params,
    })
}

// 文章评论列表查询
export const queryCommentsOfClient = (params: any) => {
    return request({
        url: `${clientBaseUrl}comments/query`,
        method: "get",
        params
    })
}

/**
 * 查询文章详情
 *  @param {*} params
 * @property {string} id -文章id
 */
export const queryArticleById = (params: any) => {
    return request({
        url: `${clientBaseUrl}articles/queryById`,
        method: 'get',
        params
    })
}

// 文章评论列表查询
export const saveCommentOfClient = (data: any) => {
    return request({
        method: 'post',
        url: `${clientBaseUrl}comments/save`,
        data
    })
}

// 查询热门文章
export const queryHotArticles = () => {
    return request({
        method: 'get',
        url: `${clientBaseUrl}articles/hotArticles`,
    })
}

/**
    * 文章点赞
    * @param {*} data
    * @property {string} id -文章id
    */
export const starArticle = (data = {}) => {
    return request({
        method: "post",
        url: `${clientBaseUrl}articles/star`,
        data
    })
}

    /**
     * 查询当前用户点赞过的文章
     */
export const queryStarArticles = (params={}) => {
    return request({
        method: "get",
        url: `${clientBaseUrl}articles/likes`,
        params
    })
}
