import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import registerGuards from './navigationGuards'
const routes = [
    { path: '/', redirect: "/client/articles/list" },
{
    path: '/client',
    component: () => import("../layouts/clientLayout.vue"),
    children: [
        {
            path: "articles/list",
            component: () => import("../views/client/articles/index.vue"),
            meta: {
                title: "首页"
            }
        },
        {
            path: "leaveWord",
            component: () => import("../views/client/leaveWord/index.vue"),
            meta: {
                title: "留言"
            }
        },
        {
            path: "article/:id",
            component: () => import("../views/client/articleDetail/index.vue"),
            meta: {
                title: "详情"
            }
        },
        {
            path: "articles/hot",
            component: () => import("../views/client/hotArticles/index.vue"),
            meta: {
                title: "热门文章"
            }
        }
    ]
},
{
    path: "/admin/login",
    component: () => import("../views/admin/login/index.vue")
},
{
    path: "/admin",
    component: () => import("../layouts/adminLayout.vue"),
    redirect: "/admin/articlesManagment",
    children: [
        {
            path: "articlesManagment",
            component: () => import("../views/admin/articlesManagment/index.vue"),
            meta: { title: "文章管理" }
        },
        {
            path: "articlesManagment/save",
            component: () => import("../views/admin/articlesManagment/save.vue"),
            meta: { title: "新增文章" }
        },
        {
            path: "categoryManagement",
            component: () => import("../views/admin/categoryManagement/index.vue"),
            meta: {
                title: "分类管理"
            }
        },
        {
            path: "categoryManagement/save",
            component: () => import("../views/admin/categoryManagement/save.vue"),
            meta: {
                title: "创建分类"
            }
        },
        {
            path: "messagesMananment",
            component: () => import("../views/admin/messagesMananment/index.vue"),
            meta: {
                title: "留言管理"
            }
        },
        {
            path: "usersManagement",
            component: () => import("../views/admin/usersManagement/index.vue"),
            meta: {
                title: "用户管理"
            }
        }
    ]
},
{
    path: "/:catchAll(.*)",
    component: () => import("../views/404.vue"),
},
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
registerGuards(router)
export default router