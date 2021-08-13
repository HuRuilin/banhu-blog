import { reactive, toRefs, onMounted, computed } from 'vue'
import { queryArticles } from "@/api/index";
import { useStore } from 'vuex'
export default function () {
    const store = useStore()
    const state = reactive({
        articlesList: [],
        pageIndex: 1,
        pages: 0
    })
    const keyWord = computed(() => {
        return store.state.clientArticles.keyWord || ''
    })
    const queryArticlesList = async (categoryId = '') => {
        const pageSize = 8
        try {
            const { result: { totalPages, data } } = await queryArticles({
                pageSize,
                pageIndex: state.pageIndex,
                categoryId,
                keyWord: keyWord.value,
            });
            state.articlesList = data;
            state.pages = totalPages
        } catch (error) {
            console.error('【查询文章列表异常】', error)
        }
    };
    onMounted(queryArticlesList)
    return {
        ...toRefs(state),
        queryArticlesList,
    }
}