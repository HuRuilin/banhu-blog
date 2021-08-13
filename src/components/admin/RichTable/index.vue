/*
 * @Author: RuiLin
 * @Date: 2021-04-28 15:20:22
 * @Last Modified by: RuiLin
 * @Last Modified time: 2021-08-06 15:57:14
 */
<template>
  <div class="rt-wrapper">
    <!--------------------------------------- 表格行搜索配置 -------------------------------------------->
    <div class="rt-header">
      <SearchWrapper
        v-if="_searchConfig.show"
        style="margin-top: 10px"
        :search-config="_searchConfig"
        @onSubmit="_handleSubmit"
      />
      <slot name="page-operations" />
    </div>
    <div class="rt-content">
      <!-- 表格组件 -->
      <el-table
        ref="table"
        class="el-table"
        :data="list"
        v-bind="_elTable"
        @select="_handleSelect"
        @select-all="_handleSelectAll"
        @sort-change="_handleSortChange"
        @selection-change="_handleChange"
      >
        <!---------------------------------- 表格行单选或者多选配置 ------------------------------------->
        <!-- 支持表格行单选 -->
        <el-table-column
          v-if="_elTable.selectiveType === 'radio'"
          label="选择"
          width="80"
          align="center"
        >
          <template #="scope">
            <el-radio
              v-model="currId"
              :label="scope.row[_elTable.rowKey]"
              @change="_handleChange"
              ><i
            /></el-radio>
          </template>
        </el-table-column>
        <!-- 支持表格行多选 -->
        <template v-if="_elTable.selectiveType === 'checkbox'">
          <el-table-column type="selection" reserve-selection align="center" />
        </template>
        <!--------------------------------------- 表格内容配置 ------------------------------------------>
        <template v-for="(item, index) in _columns" :key="index">
          <el-table-column v-bind="item">
            <!-- 考虑到对手机、邮箱账号脱敏，在业务场景中需求较为频繁，所以通过encrypt字段对此场景作预定义 -->
            <template v-if="item.encrypt || item.isSlotHeader" #header>
              <!-- 脱敏"眼睛切换按钮" -->
              <span v-if="item.encrypt">
                {{ item.label }}
                <!-- <svg-icon
                  class="icon"
                  style="cursor: pointer"
                  :icon-class="
                    desensitization[item.prop] ? 'eye_open' : 'eye_close'
                  "
                  @click="
                    desensitization[item.prop] = !desensitization[item.prop]
                  "
                /> -->
              </span>
              <!-- 自定义列表头内容   -->
              <slot v-else :name="item.prop + '_header'" />
            </template>
            <template v-if="item.encrypt || item.isSlot" #default="scope">
              <!-- 脱敏内容 -->
              <span v-if="item.encrypt">{{
                format(scope.row[item.prop], item.encrypt, item.prop)
              }}</span>
              <!-- 单元格自定义内容 -->
              <slot v-else :name="item.prop" :row="scope.row" />
            </template>
          </el-table-column>
        </template>
        <!----------------------------------------- 行按钮配置 -------------------------------------------->
        <el-table-column v-if="_elTable.btnsGroup" align="center" label="操作">
          <template #="scope">
            <template v-for="item in _calcBtns(scope.row)">
              <!-- 删除按钮 -->
              <el-popconfirm
                v-if="item.type === 'delete'"
                :key="item.type"
                icon="el-icon-info"
                icon-color="red"
                :title="
                  item.deleteTip ? item.deleteTip : '您确定要删除本条数据吗？'
                "
                @confirm="_handleClick(item, scope.row)"
              >
                <template #reference>
                  <el-button
                    style="margin-left: 10px; color: red"
                    type="text"
                    size="mini"
                    >{{ item.label }}
                  </el-button>
                </template>
              </el-popconfirm>
              <!-- 常规按钮 -->
              <el-button
                v-else
                :key="item.type"
                size="mini"
                type="text"
                @click="_handleClick(item, scope.row)"
                >{{ item.label }}</el-button
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-------------------------------------------- 表格行分页配置 ------------------------------------------->
    <div v-if="_elPagination.show" class="rt-footer">
      <el-pagination
        v-bind="_elPagination"
        :total="total"
        :page-size="_pageSize"
        v-model:current-page="currPage"
        @current-change="_handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import SearchWrapper from "../../SearchWrapper/index.vue";
export default {
  components: {
    SearchWrapper,
  },
  props: {
    // 搜索条件配置
    searchConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    // table 相关配置
    tableConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    // 分页器相关配置
    paginationConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    // 异步数据相关配置
    asyncData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // 搜索条件
      searchParams: {},
      // 表格数据
      list: [],
      // 当前页码
      currPage: 1,
      // 列表总条数
      total: 0,
      // 选中行数据标识字段
      currId: null,
      // 选中的多行数据
      multipleSelection: [],
      // 记录脱敏字段状态
      desensitization: {},
      // 请求参数
      queryParams: {},
    };
  },
  computed: {
    _columns() {
      return this._elTable["columns"].map((col) => {
        if (!col.formatter) {
          col.formatter = (row, col, cell) => {
            return cell === null || cell === undefined || cell === ""
              ? "-"
              : cell;
          };
        }
        col.align = col.align || "left";
        return col;
      });
    },
    _searchConfig() {
      const defaultVal = {
        canExport: false,
        show: true,
        // 表单项配置
        itemsMap: {},
      };
      return Object.assign({}, defaultVal, this.searchConfig);
    },
    _elTable() {
      const defaultVal = {
        // 表格列属性配置
        columns: [],
        /**
         * 表格行操作按钮
         * 数组类型
         * Array :[{label:'详情',type:'info'}]
         * 函数类型
         * Function:function(row){
         *  return [{label:'详情',type:'info'}]
         * }
         */
        btnsGroup: null,
        // 行数据key selectiveType !==null 时，必须提供
        rowKey: undefined,
        /**
         * 是否支持选择行数据
         * selectiveType  null (不支持选择) | radio (单选) |checkbox | (多选)
         */
        border: true,
        style: "width: 100%",
        selectiveType: null,
        // 设置表格行背景色
        headerRowStyle() {
          return {
            backgroundColor: "#f7f7f7",
          };
        },
      };
      return Object.assign({}, defaultVal, this.tableConfig);
    },
    _elPagination() {
      const defaultVal = {
        // 是否显示
        show: true,
        background: true,
        layout: "total, prev, pager, next,jumper",
      };
      return Object.assign({}, defaultVal, this.paginationConfig);
    },
    _asyncData() {
      const defaultVal = {
        // 是否需要做初始化请求
        isInitial: true,
        // 列表数据异步请求api
        api: null,
        // api 请求参数
        query: {},
        // 异步请求完毕后回调函数
        cb: function (res) {
          return res;
        },
      };
      return Object.assign({}, defaultVal, this.asyncData);
    },
    _pageSize() {
      const { pageSize = 10 } = this._asyncData.query;
      return pageSize;
    },
  },
  watch: {
    tableConfig: {
      handler(newVal) {
        const { columns } = newVal;
        if (!Array.isArray(columns)) return;
        // 对脱敏字段状态进行初始化,默认为true
        columns.forEach((elem) => {
          const { encrypt, prop } = elem;
          if (encrypt !== undefined) {
            this.desensitization[prop] = true;
          }
        });
      },
      immediate: true,
      deep: true,
    },
  },
  async created() {
    const { isInitial } = this._asyncData;
    if (isInitial) {
      await this.queryList();
    }
  },
  methods: {
    encryptName() {},
    format(val, encrypt, prop) {
      if (!this.desensitization[prop]) return val;
      switch (encrypt) {
        case "phone":
          // eslint-disable-next-line no-case-declarations
          const regExp = /(\d{3})\d*(\d{4})/;
          return val ? val.replace(regExp, "$1****$2") : "";
        case "email":
          return val
            ? val.substr(0, 2) + "****" + val.substr(val.indexOf("@"))
            : "";
        case "username":
          if (!val) return "";
          return val;

        default:
          return val;
      }
    },
    // 判断表格行显示内容
    _calcBtns(row) {
      const btnsGroup = this._elTable.btnsGroup;
      if (typeof btnsGroup === "function") {
        return btnsGroup(row) || [];
      }
      return btnsGroup;
    },
    // 搜索
    _handleSubmit(type, form) {
      switch (type) {
        case "enter":
        case "search":
        case "reset": {
          this.currPage = 1;
          const beforeSearch = this.searchConfig.beforeSearch;
          this.searchParams = beforeSearch ? beforeSearch(form) || {} : form;
          this.queryList();
          break;
        }
        // 导出事件
        case "export":
          this.$emit("export", form);
          break;
        // 自定义按钮事件
        case "custom":
          this.$emit("custom", form);
          break;
      }
    },
    // 分页
    _handlePageChange(page) {
      this.currPage = page;
      this.queryList();
    },

    // 行按钮点击事件
    _handleClick(item, row) {
      this.$emit("tap", {
        btn: item,
        rowInfo: row,
      });
    },

    // 表格字段排序
    _handleSortChange(sortInfo) {
      const { order, prop } = sortInfo;
      console.log(order, prop);
      const orderMap = { descending: false, ascending: true };
      this.searchParams[prop] = order ? orderMap[order] : null;
      this.queryList();
    },

    /**
     * 表格行发生变化
     * @param {String} ids (单选时，为行数据唯一标识，多选时为行数)
     */
    _handleChange(ids) {
      this.$emit("handleSelect", ids);
    },

    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    _handleSelect(selection, row) {
      this.$emit("select", selection, row);
    },

    // 当用户手动勾选全选 Checkbox 时触发的事件
    _handleSelectAll(selection) {
      this.$emit("select-all", selection);
    },
    // 获取表格实例对象
    getTable() {
      return this.$refs["table"];
    },
    // 清除表格选中
    clearSelection() {
      const tableInstance = this.getTable();
      if (!tableInstance) return;
      tableInstance.clearSelection();
    },
    // 重置rich-table现存数据
    resetTableData() {
      Object.assign(this.$data, this.$options.data());
    },

    // 数据列表请求
    async queryList(queryParams = {}) {
      try {
        const { api, query, cb } = this._asyncData;
        this.queryParams = Object.assign(this.queryParams, queryParams);
        if (!api) return;
        const defaultParams = {
          pageIndex: this.currPage,
          pageSize: this._pageSize,
        };
        const response = await api({
          ...defaultParams,
          ...query,
          ...this.searchParams,
          ...this.queryParams,
        });
        const { result } = cb(response) || {};
        if (result) {
          const { data, totalSize } = result;
          this.list = data || [];
          this.total = totalSize;
          // 解决当前页数据被清空后，没有自动请求上一页数据的问题
          if (Array.isArray(data) && data.length === 0) {
            if (this.currPage >= 2) {
              this.currPage -= 1;
              this.queryList();
            }
          }
          return;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@mixin flex(
  $justify-content: center,
  $align-items: center,
  $flex-direction: row
) {
  display: flex;
  justify-content: $justify-content;
  align-items: $align-items;
  flex-direction: $flex-direction;
}
.rt-header {
  @include flex(space-between, center);
  margin-bottom: 15px;
}
.rt-content {
  .el-table :deep(.el-table__header th) {
    background-color: #f7f7f7;
  }
}
.rt-footer {
  @include flex(flex-end, center);
  margin: 30px 0;
}
</style>
