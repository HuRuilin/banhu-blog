<template>
  <div class="container">
    <RichTable
      ref="rich-table"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :asyncData="asyncData"
      :pagination-config="paginationConfig"
      @tap="handleClick"
    >
      <template v-slot:page-operations>
        <div class="operations">
          <router-link to="categoryManagement/save">
            <el-button type="primary">新增分类</el-button>
          </router-link>
        </div>
      </template>
      <!-- 发布状态 -->
      <template v-slot:icon="slotProps">
        <img
          style="width: 50px"
          v-if="slotProps.row.icon"
          :src="slotProps.row.icon"
          alt=""
        />
        <span v-else>-</span>
      </template>
    </RichTable>
  </div>
</template>

<script>
import RichTable from "@/components/admin/RichTable/index.vue";
import { initTableConfig, initSearchConfig } from "./data";
import { queryCategories, publish } from "@/api";
export default {
  components: {
    RichTable,
  },
  data() {
    return {
      tableConfig: initTableConfig(),
      searchConfig: initSearchConfig(),
      asyncData: {
        api: queryCategories,
        query: { pageSize: 8 },
        cb(res) {
          const { result } = res;
          res.result = {
            data: result,
          };
          return res
        },
      },
      paginationConfig: {
        show: false,
      },
    };
  },
  methods: {
    // 点击事件
    handleClick({ btn, rowInfo }) {
      const { _id } = rowInfo;
      switch (btn.type) {
        // 编辑
        case "edit":
          this.$router.push({
            path: "/admin/categoryManagement/save",
            query: { id: _id },
          });
          break;
        // 删除
        case "delete":
          this.$confirm(
            "删除该分类后，该分类下的文章将会流入文章池，确定删除吗？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(() => this.delArticle(_id));
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
        this.$message.success(status === 2 ? "发布成功" : "撤销成功");
      } catch (error) {
        console.error(error);
      }
    },

    // 删除文章
    async delArticle(id) {
      try {
        const { msg } = await this.$api.delCategory(id);
        this.$refs["rich-table"].queryList();
        this.$message.success(msg || "操作成功");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
