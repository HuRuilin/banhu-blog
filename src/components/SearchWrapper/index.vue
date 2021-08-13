<template>
  <div class="search-container">
    <el-form
      :inline="true"
      :model="form"
      class="form-inline"
      size="small"
      @submit.prevent
    >
      <template v-for="(val, name) in formFields" :key="name" >
        <el-form-item :label="val.label">
          <!-- 文本输入框 -->
          <el-input
            v-if="val.type === 'input'"
            v-model="form[name]"
            :placeholder="val.placeholder || '请输入' + val.label"
            clearable
            @keyup.enter="onClick('enter')"
          />
          <!-- 下拉选择框 -->
          <el-select
            v-if="val.type === 'select'"
            v-model="form[name]"
            :placeholder="val.placeholder || '请选择' + val.label"
          >
            <el-option
              v-for="item in val.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 日期范围、日期时间范围选择器 -->
          <el-date-picker
            v-if="val.type === 'daterange' || val.type === 'datetimerange'"
            v-model="form[name]"
            :type="val.type"
            :value-format="val.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
          <!-- 级联选择器 -->
          <el-cascader
            v-if="val.type === 'cascader'"
            v-model="form[name]"
            :placeholder="val.placeholder || '请选择' + val.label"
            v-bind="val"
          />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="onClick('search')"
        >查询
        </el-button>
        <el-button
          icon="el-icon-refresh"
          @click="onClick('reset')"
        >
          重置 </el-button>
        <el-button
          v-if="canExport"
          icon="el-icon-download"
          type="primary"
          @click="onClick('export')"
        > 导出 </el-button>
        <el-button
          v-if="customBtnName"
          type="primary"
          @click="onClick('custom')"
        > {{ customBtnName }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 搜索条件配置
    searchConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    formFields() {
      return this.searchConfig.itemsMap || {}
    },
    canExport() {
      return !!this.searchConfig.canExport
    },
    customBtnName() {
      return this.searchConfig.customBtnName || ''
    }
  },
  watch: {
    formFields: {
      immediate: true,
      deep: true,
      handler(newVal) {
        // 初始化表单对象
        if (!newVal) return
        const keys = Object.keys(newVal)
        if (!(Array.isArray(keys) && keys.length > 0)) return
        keys.forEach((val) => {
          const defaultVal = this.formFields[val].defaultValue
          this.form[val]=defaultVal === undefined ? '' : defaultVal
        })
        this.defaultConfig = JSON.parse(JSON.stringify(this.form))
      }
    }
  },

  methods: {
    onClick(type) {
      let form = {}
      switch (type) {
        case 'custom':
        case 'enter':
        case 'search':
        case 'export':
          form = { ...this.form }
          break
        case 'reset':
          this.form = Object.assign({}, this.defaultConfig)
          form = { ...this.defaultConfig }
          break
      }
      this.$emit('onSubmit', type, form)
    }
  }
}
</script>
