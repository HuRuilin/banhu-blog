import { createStore } from "vuex";
import clientArticles from './client/articles'
import clientUsers from "./client/user";
import adminUsers from './admin/user'
import adminApp from './admin/app'
const store = createStore(
    {
        state() {
            return {
            }
        },
        mutations: {

        },
        modules: {
            clientArticles,
            clientUsers,
            adminUsers,
            adminApp
        }
    }
)

export default store