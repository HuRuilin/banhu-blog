import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import store from '@/store'
import router from '@/router/index'
import TokenKeys from '@/enum/tokenKeys'
import Cookie from 'js-cookie'
import ErrMsgs from '@/enum/errMsg'
export interface ResponseData {
    code: number;
    result?: any;
    msg: string;
}

let service: AxiosInstance = axios.create({
    baseURL: "http://localhost:3333/"
})
service.interceptors.request.use((config: AxiosRequestConfig) => {
    const source = config.url.split('/')[0]
    const tokenMap = {
        admin: store.state.adminUsers.token,
        client: store.state.clientUsers.token,
    }
    const token = tokenMap[source]
    config.headers['authorization'] = token ? `Bearer ${token}` : ''
    return config
})
service.interceptors.response.use((res) => {
    const { status, data } = res
    const codeList = [200];
    if (status !== 200 || !codeList.includes(data.code)) {
        ElMessage.warning({
            message: data.msg || '数据访问异常',
            type: 'warning'
        })
        return Promise.reject(data)
    }
    return data
}, ((err: AxiosError) => {
    let errMsg = '';
    if (err.message === 'Request failed with status code 401') {
        errMsg = ErrMsgs['unauthorized'];
        // 401状态
        if (err.config) {
            const url = err.config.url || ''
            const source = url && url.split('/')[0]
            if (source === 'admin') {
                // 管理端
                router.replace(`/admin/login`)
            } else {
                // 客户端
                store.commit('clientUsers/SET_TOKEN', '')
                store.commit('clientUsers/setVisible', true)
                Cookie.remove(TokenKeys['clientToken'])
                router.replace(`/client/articles`)
            }
        }
    }
    else if (err.message && err.message.includes('timeout')) {
        errMsg = ErrMsgs['timeout'];
    } else {
        errMsg = err.message || '请求异常';
    }

    // for debug
    if (process.env.NODE_ENV !== 'production') {
        console.error('错误拦截---------------------', err);
    }

    ElMessage({
        message: errMsg,
        type: 'error',
        duration: 5 * 1000
    });
    console.error(err)
    return Promise.reject(err);
}))

export default service