<template>
  <div class="category-list">
    <ul>
      <!-- 全部分类 -->
      <li
        :class="{ category: true, highlight: !currCategoryId }"
        @click="handleClickCategory({ _id: null })"
      >
        <img
          class="icon"
          src="https://ruilin.oss-cn-beijing.aliyuncs.com/sds_%E7%AC%AC00%E7%B1%BB%20%E5%85%A8%E9%83%A8.png"
          alt=""
        /><span class="title">全部</span>
      </li>
      <!-- 其他分类 -->
      <li
        v-for="item in categories"
        :key="item._id"
        :class="{ category: true, highlight: item._id === currCategoryId }"
        @click="handleClickCategory(item)"
      >
        <img class="icon" :src="item.icon" alt="" />
        <span class="title">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { queryCategories } from "@/api/index";
export default defineComponent({
  emits: ["filter"],
  setup(props, { emit }) {
    const state = reactive({
      currCategoryId: "",
      categories: [],
    });
    const queryCategorieList = async () => {
      try {
        const { result } = await queryCategories();
        state.categories = result;
      } catch (error) {
        console.error("【查询目录列表异常】", error);
      }
    };
    const handleClickCategory = (params: any) => {
      state.currCategoryId = params._id;
      emit("filter", params._id);
    };
    onMounted(queryCategorieList);
    return {
      ...toRefs(state),
      queryCategorieList,
      handleClickCategory,
    };
  },
});
</script>
<style scoped lang='scss'>
.category-list {
  .category {
    width: 150px;
    border-radius: 4px;
    @include flex(flex-start, center);
    cursor: pointer;
    padding: 6px 6px;
    margin-right: 10px;
    &:hover {
      background-color: rgba(#eef6f6, 0.5);
    }
    &.highlight {
      background: #cce5e5;
    }
    .icon {
      width: 20px;
      margin-right: 8px;
    }
    .title {
      letter-spacing: 2px;
      @include font(14px, #757575, left, 560);
    }
  }
}
</style>
