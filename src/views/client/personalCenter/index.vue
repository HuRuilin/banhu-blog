<template>
  <div class="">
    <el-tabs v-model="state.activeName">
      <el-tab-pane label="我赞过的" name="star">
        <div v-if="state.starArtilces && state.starArtilces.length > 0">
          <template v-for="(item, idx) in state.starArtilces" :key="idx">
            <articleItem :item="item"></articleItem>
          </template>
        </div>
        <el-empty v-else description="描述文字"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="我收藏的" name="collection">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive} from "vue";
import articleItem from "../articles/components/articleItem.vue";
import { queryStarArticles } from "@/api";
    const state = reactive({
      starArtilces: [],
      activeName: "star",
    });
    const query = async function () {
      const { result } = await queryStarArticles();
      state.starArtilces.value = result;
    };
    query();
</script>
