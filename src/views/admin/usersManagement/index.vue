<template>
  <div class="">
    <RichTable
      ref="rich-table"
      :table-config="tableConfig"
      :search-config="searchConfig"
      :asyncData="asyncData"
      @tap="handleClick"
    >
      <!-- 头像 -->
      <template v-slot:avatar="slotProps">
        <img
          style="width: 50px"
          v-if="slotProps.row.avatar"
          :src="slotProps.row.avatar"
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
import { updateClientUserStatus, queryClientUsers } from "@/api";
export default {
  layout: "admin",
  components: {
    RichTable,
  },
  data() {
    return {
      tableConfig: initTableConfig(),
      searchConfig: initSearchConfig(),
      asyncData: { api: queryClientUsers ,query:{ pageSize: 8 }},
    };
  },
  methods: {
    // 点击事件
    handleClick({ btn, rowInfo }) {
      const { _id } = rowInfo;
      switch (btn.type) {
        // 启用
        case "start":
          this.updateStatus(_id, 1);
          break;
        // 禁用
        case "forbidden":
          this.$confirm("此操作将禁止用户登录此系统，是否继续?", "提示", {
            type: "warning",
          })
            .then(() => {
              this.updateStatus(_id, 0);
            })
            .catch(() => {
              console.log();
            });
          break;
      }
    },

    // 更新用户状态
    async updateStatus(id, status) {
      try {
        await updateClientUserStatus({ id, status });
        this.$message.success("操作成功");
        this.$refs["rich-table"].queryList();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped lang='scss'>
/* @import url(); 引入公共css类 */
</style>
