import { queryHotArticles, } from '@/api'
import { ref, onMounted } from 'vue'
export default function () {
    let hotArticles = ref([])
    // 查询热门列表
    const queryHots = async function () {
        try {
            const res = await queryHotArticles()
            if (!res.result) return
            hotArticles.value = res.result
        } catch (error) {
            console.error('【查询热门列表异常】', error)
        }
    }
    onMounted(queryHots)
    return {
        hotArticles,
        queryHots
    }
}