import { getPageTitle } from '@/utils/common'
const whiteList = ['/admin/login','/bridge'] // no redirect whitelist
import { getToken } from '../utils/auth'
export default function (router) {
    // 前置守卫
    router.beforeEach(function (to, from, next) {
        const { fullPath } = to
        const source = fullPath.split('/')[1]
        const token = getToken(`${source}Token`)
        if (whiteList.includes(fullPath)) {
            if (token && fullPath === '/admin/login') {
                next(false)
            } else {
                next()
            }
        } else {
            switch (source) {
                case 'admin':
                    token ? next() : next({ path: "/admin/login", replace: true })
                    break
                case 'client':
                    next()
                    break
            }
        }

    })
    // 后置守卫 
    router.afterEach(function (to, from) {
        const { meta } = to
        document.title = getPageTitle(meta.title)
    })
}