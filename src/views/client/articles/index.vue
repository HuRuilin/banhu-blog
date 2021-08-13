<template>
  <div class="container">
    <div class="content">
      <!-- 分类列表 -->
      <category-list @filter="queryArticlesList"></category-list>
      <!-- 文章列表 -->
      <div class="articles-list">
        <articleItem
          :item="item"
          v-for="(item, idx) in articlesList"
          :key="idx"
        >
        </articleItem>
        <el-empty v-if="pages === 0" description="数据列表为空"></el-empty>
      </div>

      <!-- 热门文章 -->
      <el-card class="box-card">
        <template #header>
          <div class="header-slot">
            <span>热门文章</span>
            <router-link to="/client/articles/hot">
              <el-button type="text">更多</el-button>
            </router-link>
          </div>
        </template>
        <HotsList :list="hotArticles"></HotsList>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import articleItem from "@/views/client/articles/components/articleItem.vue";
import HotsList from "@/components/client/HotsList.vue";
import CategoryList from "./components/categories.vue";
import useArticlesQuery from "./composables/useArticlesQuery";
import useHotArticles from "./composables/useHotArticles";
export default defineComponent({
  name: "articlesList",
  components: {
    articleItem,
    HotsList,
    CategoryList,
  },
  setup() {
    const { articlesList, pages ,queryArticlesList} = useArticlesQuery();
    let { hotArticles } = useHotArticles();
    hotArticles.value = hotArticles.value.slice(0, 5);
    return {
      pages,
      articlesList,
      hotArticles,
      queryArticlesList
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  .content {
    @include flex(space-between, flex-start);
    .articles-list {
      flex: 1;
      margin-right: 30px;
    }
    .box-card {
      width: 240px;
      .header-slot {
        @include flex(space-between, center);
        :deep(.el-button) {
          padding: 0 !important;
        }
      }
    }
  }
}
</style>

