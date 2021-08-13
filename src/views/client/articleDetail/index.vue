<template>
  <div class="article">
    <h1 class="article-title">{{ info.title }}</h1>
    <p class="article-statics">
      <span>{{ formatDate(info.createTime) }}</span>
      <span>阅读&nbsp;{{ info.count || 0 }}</span>
      <span>字数&nbsp;{{ info.words || 0 }}</span>
      <span>评论&nbsp;{{ info.comments || 0 }}</span>
      <span>喜欢&nbsp;{{ info.stars || 0 }}</span>
    </p>
    <div class="article-content" v-html="info.content" v-highlight></div>
    <!-- 文章评论 -->
    <comment-box
      ref="commentBox"
      class="article-comments"
      @submit="handleSave"
    ></comment-box>
    <!-- 评论列表 -->
    <comment-item
      v-for="(item, idx) in comments"
      :key="idx"
      :item="item"
      class="comment-list"
    ></comment-item>
    <p class="more-btn" v-if="totalPages >= 1">
      <span v-if="totalPages > pageIndex" @click="handleNext">查看更多</span>
      <span v-else>没有更多了</span>
    </p>
  </div>
</template>

<script>
import { queryCommentsOfClient, queryArticleById ,saveCommentOfClient} from "@/api";
import CommentItem from "./components/commentItem.vue";
import CommentBox from "./components/commentBox.vue";
export default {
  mounted() {
    this.queryInfo();
    this.queryComments();
  },
  components: {
    CommentItem,
    CommentBox,
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPages:0,
      info:{},
      comments:[]
    };
  },
  provide() {
    return {
      save: this.save,
      queryComments: this.queryComments,
      queryInfo: this.queryInfo,
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return;
      const dateObj = new Date(date);
      const monthMap = {
        0: "一",
        1: "二",
        2: "三",
        3: "四",
        4: "五",
        5: "六",
        6: "七",
        7: "八",
        8: "九",
        9: "十",
        10: "十一",
        11: "十二",
      };
      return `${
        monthMap[dateObj.getMonth() + 1]
      }月 ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    },
    handleSave(content) {
      this.save({ content });
    },

    // 查询下一页
    handleNext() {
      this.pageIndex += 1;
      this.queryComments();
    },

    //发表评论
    async save({ content, commentId, replyId, toUserId }) {
      try {
        await saveCommentOfClient({
          content,
          articleId: this.$route.params.id,
          commentId,
          replyId,
          toUserId,
        });
        this.$refs["commentBox"].form.content = "";
        this.pageIndex = 1;
        this.queryComments();
        this.queryInfo();
      } catch (error) {
        console.error(error);
      }
    },

    // 查询详情
    async queryInfo() {
      try {
        const { id } = this.$route.params;
        if (!id) return;
        const { result = {} } = await queryArticleById({
          id,
        });
        this.info = result;
      } catch (error) {
        console.error(error);
      }
    },

    // 查询评论列表
    async queryComments() {
      const { id } = this.$route.params;
      try {
        const res = await queryCommentsOfClient({
          articleId: id,
          pageIndex: this.pageIndex,
        });
        const { data = [], pageIndex, totalPages } = res.result;
        this.comments = pageIndex === 1 ? data : [...this.comments, ...data];
        this.totalPages = totalPages;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.article {
  padding: 30px;
  line-height: 1.75;
  color: #333;
  &-title {
    @include font(30px, #333, left);
    line-height: 100px;
  }
  &-statics {
    @include font(13px, #6a737d, left);
    margin-right: 13px;
    letter-spacing: 0.4px;
    position: relative;
    margin-bottom: 50px;
    &:after {
      content: "";
      width: 100px;
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: 1px solid #eaeaea;
    }
  }
  .article-content {
    :deep(img) {
      max-width: 100% !important;
    }
    :deep(pre) {
      padding: 6px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 3px;
      margin: 16px 0;
    }
  }
  .article-comments {
    margin-top: 50px;
  }
  .more-btn {
    @include font(12px, #ccc, center);
    text-align: center;
    cursor: pointer;
    line-height: 30px;
  }
  .comment-list {
    margin: 50px 0;
  }
}
</style>
