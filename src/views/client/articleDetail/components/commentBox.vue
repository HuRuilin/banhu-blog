<template>
  <el-form class="comment-box" ref="form" :model="form">
    <el-form-item class="content" prop="content">
      <el-input
        placeholder="输入评论..."
        ref="input"
        type="textarea"
        v-model="form.content"
      ></el-input>
    </el-form-item>
    <div class="action-box">
      <el-button
        type="primary"
        size="mini"
        :disabled="!form.content"
        @click="handleSubmit"
        >评论</el-button
      >
    </div>
  </el-form>
</template>

<script>
export default {
  components: {},
  emits:['submit'],
  data() {
    return {
      form: {
        content: "",
      },
      // 是否显示评论按钮
      showActions: false,
    };
  },
  props: {
    isShow: {
      type: Boolean,
    },
  },

  methods: {
    handleSubmit() {
      if (!this.$store.state["clientUsers"].token) {
        return this.$store.commit("clientUsers/setVisible", true);
      }
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        this.$emit("submit", this.form.content);
      });
    },
  },
};
</script>
<style scoped lang='scss'>
.comment-box {
  background-color: #fafbfc;
  padding: 5px;
  border-radius: 4px;
  :deep(.el-textarea__inner) {
    color: #333;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .content {
    margin-bottom: 0;
  }
  .action-box {
    @include flex(flex-end, center);
    margin: 10px 0;
  }
}
</style>
