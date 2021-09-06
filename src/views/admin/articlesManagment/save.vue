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
            <el-form-item label="文章标题" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入文章标题"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章类别">
              <el-select v-model="form.category">
                <el-option
                  v-for="(item, idx) in categories"
                  :key="idx"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="浏览量基数" prop="basePv">
              <el-input
                v-model.number="form.basePv"
                placeholder="请输入浏览量基数"
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
          <el-col :span="12">
            <el-form-item label="摘要">
              <el-input
                v-model="form.summary"
                placeholder="默认截取本地文章内容前50个字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="form.author"
                placeholder="请输入作者名字(默认:admin)"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-row style="padding-left: 56px">
        <el-col :span="24">
          <el-tabs
            :tab-position="'top'"
            v-model="form.type"
            @tab-click="handleToggle"
          >
            <el-tab-pane name="local" label="本地">
              <el-form-item label="文章内容" prop="mdContent">
                <div class="vditor-custome-class" ref="vditor"></div>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="external" label="外链">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="链接地址" prop="url">
                    <el-input v-model="form.url"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <div class="btns-wrapper">
        <el-button type="default" size="small" @click="$router.back(-1)"
          >返回</el-button
        >
        <el-button type="primary" size="small" @click="handleSave(2)"
          >存草稿</el-button
        >
        <el-button type="primary" size="small" @click="handleSave(1)"
          >发布文章</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { commonRules, personalRules } from "./data";
import { queryArticleInfo, queryCategoriesList, saveArticle } from "@/api";
import Vditor from "vditor";
import { ref } from "vue";
export default {
  components: {},
  data() {
    return {
      form: {
        // 文章标题
        title: "",
        // markdown格式内容
        mdContent: "",
        // 文章内容
        content: "",
        // 文章摘要
        summary: "",
        // 文章字数
        words: 0,
        // 文章作者
        author: "",
        // 浏览基数
        basePv: null,
        // 排序权重
        sortCode: null,
        // 外链地址
        url: "",
        // 区别文章类型（local 本地 | external 外链）
        type: "local",
        // 文章类别
        category: "",
      },
      commonRules,
      // 纯文本字符串
      txt: "",
      // 分类列表
      categories: [],
      contentEditor: "",
    };
  },
  created() {
    const { id } = this.$route.query;
    this.queryDetail(id);
    this.queryAllCategories();
  },
  mounted() {
    const that = this;
    const wrapRef = this.$refs["vditor"];
    this.contentEditor = new Vditor(wrapRef, {
      height: 360,
      theme: "classic",
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      input(content) {
        that.form.mdContent = content;
      },
    });
  },
  beforeUnmount() {
    this.contentEditor.destroy();
  },
  computed: {
    rules() {
      console.log(this.commonRules);
      return Object.assign({}, this.commonRules, personalRules[this.form.type]);
    },
  },

  methods: {
    // 切换外链内链
    handleToggle({ name }) {
      switch (name) {
        // 本地图文
        case "local":
          this.form.url = "";
          break;
        // 外链
        case "external":
          this.form.content = "";
          this.form.words = 0;
          this.form.mdContent = "";
          break;
      }
    },
    // html 转化为纯文本
    htmlToTxt(html) {
      return html
        .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
        .replace(/<[^>]+?>/g, "")
        .replace(/\s+/g, " ")
        .replace(/ /g, " ")
        .replace(/>/g, " ");
    },

    handleSave(status) {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
      
        const htmlStr = this.contentEditor.getHTML();
        const txt = this.htmlToTxt(htmlStr);
        this.form = Object.assign(this.form, {
          words: txt.length,
          content: htmlStr,
          summary : `${txt.slice(0, 50)}...`
        });
        this.form.status = status;
        this.save({ ...this.form, author: this.form.author || "Admin" });
      });
    },

    // 新增或者编辑文章
    async save(params) {
      try {
        await saveArticle(params);
        this.$router.back(-1);
        this.$message.success(params.status === 1 ? "发布成功" : "保存成功");
      } catch (error) {
        console.error("发布失败", error);
      }
    },

    // 查询文章详情
    async queryDetail(id) {
      try {
        if (!id) return;
        const { result } = await queryArticleInfo({ id });
        this.form = Object.assign(this.form, result);
        const { mdContent } = result;
        if (mdContent) {
          this.$nextTick(() => {
            this.contentEditor.setValue(mdContent, true);
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    // 图片上传
    async uploadImg(file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const { result } = await this.$api.upload(formData);
        return result.url;
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * 查询全部的分类列表
     */
    async queryAllCategories() {
      try {
        const { result } = await queryCategoriesList();
        this.categories = result;
      } catch (error) {
        console.error(error);
      }
    },
  },
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
  .vditor-custome-class {
    margin-top: 18px;
  }
}
</style>
