import request from '../../utils/request'
const adminBaseUrl = 'admin/'
/**
 * 查询文章列表
 * @param {*} params
 * @property {number} pageIndex -页码
 * @property {number} pageSize -页容量
 */
export const queryArticlesList = (params = {}) => {
    return request({
        method: "get",
        url: `${adminBaseUrl}articles/query`,
        params
    })
}

/**
 * 查询文章详情
 * @param {*} params
 * @property {string} id -文章id
 */
export const queryArticleInfo = (params: any) => {
    return request({
        url: `${adminBaseUrl}articles/queryById`,
        method: "get",
        params
    })
}

/**
 * 新增或者编辑文章
 * @param {*} data
 */
export const saveArticle = (data = {}) => {
    return request({
        method: "post",
        url: `${adminBaseUrl}articles/save`,
        data
    })
}

/**
 * 移除文章
 * @param {string} id -文章id
 */
export const delArticle = (id: string) => {
    return request({
        method: "delete",
        url: `${adminBaseUrl}articles/${id}`
    })
}

/**
 * 发布、撤回文章
 * @param {*} data
 */
export const publish = (data: any) => {
    request({
        method: "post",
        url: `${adminBaseUrl}articles/publish`,
        data
    })
}

/**
 * 保存目录
 * @param {*} data
 */
export const saveCategory = (data: any) => {
    return request({
        method: "post",
        url: `${adminBaseUrl}categories/save`,
        data
    })
}

/**
 * 查询目录列表
 * @param {*} data
 */
export const queryCategoriesOfAdmin = (params: any) => {
    return request({
        method: "get",
        url: `${adminBaseUrl}categories/query`,
        params
    })
}

/**
 * 删除目录
 * @param {*} data
 */
export const delCategory = (id: String) => {
    if (!id) return
    return {
        method: "delete",
        url: `${adminBaseUrl}categories/${id}`
    }
}

/**
 * 查询分类详情
 * @param {*} params
 */
export const queryCategoryById = (id: String) => {
    return request({
        method: "get",
        url: `${adminBaseUrl}categories/queryById`,
        params: {
            id
        }
    })
}


// 查询全部分类
export const queryCategoriesList = () => {
    return request({
        method: "get",
        url: `${adminBaseUrl}categories/queryAll`
    })
}