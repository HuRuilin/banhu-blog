<template>
  <div class="container">
    <RichTable
      ref="rich-table"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :asyncData="asyncData"
      @tap="handleClick"
    >
      <template v-slot:page-operations>
        <div class="operations">
          <router-link to="articlesManagment/save">
            <el-button type="primary">新增文章</el-button>
          </router-link>
        </div>
      </template>
      <!-- 发布状态 -->
      <template v-slot:status="slotProps">
        <span style="color: #ffcc99"
          >{{ formatStatus(slotProps.row.status) }}
        </span>
      </template>
    </RichTable>
  </div>
</template>

<script>
import RichTable from "@/components/admin/RichTable/index.vue";
import { initTableConfig, initSearchConfig } from "./data";
import {
  delArticle,
  queryCategoriesList,
  queryArticlesList,
  publish,
} from "@/api";
export default {
  components: {
    RichTable,
  },
  data() {
    return {
      tableConfig: initTableConfig(),
      searchConfig: initSearchConfig(),
      asyncData: { api: queryArticlesList,query:{ pageSize: 8 } },
    };
  },
  created() {
    this.queryAllCategories();
  },
  methods: {
    formatStatus(val) {
      const statusMap = new Map([
        [1, "已发布"],
        [2, "待发布"],
      ]);
      return statusMap.get(val);
    },
    // 点击事件
    handleClick({ btn, rowInfo }) {
      const { _id } = rowInfo;
      switch (btn.type) {
        // 编辑
        case "edit":
          this.$router.push({
            path: "/admin/articlesManagment/save",
            query: { id: _id },
          });
          break;
        // 删除
        case "delete":
          this.delArticle(_id);
          break;
        // 发布
        case "publish":
          this.publish({ id: _id, status: 1 });
          break;
        // 撤回
        case "withdraw":
          this.publish({ id: _id, status: 2 });
          break;
      }
    },

    /**
     * 撤回或者发布文章
     */
    async publish({ id, status }) {
      try {
        if (!id) return;
        await publish({ id, status });
        this.$refs["rich-table"].queryList();
        this.$message.success(status === 1 ? "发布成功" : "撤销成功");
      } catch (error) {
        console.error(error);
      }
    },

    // 删除文章
    async delArticle(id) {
      try {
        const { msg } = await delArticle(id);
        this.$refs["rich-table"].queryList();
        this.$message.success(msg || "操作成功");
      } catch (error) {
        console.log(error);
      }
    },

    /*
     * 查询全部的分类列表
     */
    async queryAllCategories() {
      try {
        const { result } = await queryCategoriesList();
        const list = result.map((item) => {
          const { name, _id } = item;
          return {
            label: name,
            value: _id,
          };
        });
        this.searchConfig = initSearchConfig({
          categories: list,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
