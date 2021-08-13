<template>
  <div class="save-wrapper">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :validate-on-rule-change="false"
      label-width="100px"
    >
      <div class="common-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类别名称" prop="name">
              <el-input
                v-model="form.name"
                maxlength="20"
                placeholder="请输入类别名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序权重" prop="sortCode">
              <el-input
                v-model.number="form.sortCode"
                placeholder="请输入整数（值越大越靠前）"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="类别图标" prop="icon">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.icon" :src="form.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-row>
      </div>
      <div class="btns-wrapper">
        <el-button type="default" size="small" @click="$router.back(-1)"
          >返回</el-button
        >
        <el-button type="primary" size="small" @click="handleSave"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      uploadUrl:
        (process.env.NODE_ENV === "production"
          ? "http://huruilin.top/"
          : `http://localhost:4000/`) + "api/common/upload",
      form: {
        // 类别名称
        name: "",
        // 排序权重
        sortCode: null,
        icon: "",
      },
      //表单校验规则
      rules: {
        name: [
          {
            required: true,
            message: "请输入类别名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 20,
            trigger: "blur",
            message: "长度只能为2到20个字符",
          },
        ],
        sortCode: [
          {
            pattern: /^[1-9]\d*|0$/,
            message: "只能输入非负整数",
            trigger: "blur",
          },
        ],
        icon: [
          {
            required: true,
            message: "请上传分类图标",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleSave() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.saveCategory(this.form);
      });
    },

    handleAvatarSuccess(res, file) {
      // this.form.icon = URL.createObjectURL(file.raw)
      const { code, result } = res;
      if (code === 200) {
        this.form.icon = result.url;
        this.$nextTick(() => this.$refs["form"].validateField("icon"));
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const fileTypes = ["image/jpeg", "image/png"];
      const isAllow = fileTypes.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isAllow) {
        this.$message.error("图标只能是png或者jpeg类型");
      }
      if (!isLt2M) {
        this.$message.error("图标大小不能超过 2MB!");
      }
      return isAllow && isLt2M;
    },

    /**
     * 保存目录
     */
    async saveCategory(data) {
      try {
        await this.$api.saveCategory(data);
        const { _id } = data;
        this.$message.success(_id ? "编辑成功" : "新增成功");
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 查询分类信息
     */
    async queryInfo(id) {
      try {
        if (!id) return;
        const { result } = await this.$api.queryCategoryById(id);
        this.form = result;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    const { id } = this.$route.query;
    this.queryInfo(id);
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.save-wrapper {
  padding: 40px 300px;
  .common-form {
    padding-top: 20px;
    padding-right: 20px;
    border-radius: 10px;
  }
  :deep(.el-tabs) {
    .el-tabs__content {
      padding: 20px 8px 30px 0;
    }
  }

  .btns-wrapper {
    @include flex(center, center);
  }
  .avatar-uploader :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader :deep(.el-upload:hover) {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
