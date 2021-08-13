<template>
  <div class="container">
    <div class="wrapper">
      <div class="avatar-wrapper">
        <img
          class="avatar"
          :src="atom.fromUserId.avatar || defaultAvatar"
          alt=""
          v-if="atom.fromUserId"
        />
      </div>
      <div class="comment">
        <p class="username" v-if="atom.fromUserId">
          {{ atom.fromUserId.username }}
        </p>
        <p class="content">
          <span v-if="atom.replyId">回复 {{ atom.toUserId.username || '匿名' }}：</span
          >{{ atom.content }}
        </p>
      </div>
    </div>
    <div v-clickOutSide="handleClickOut">
      <div class="reply-box">
        <div class="reply-box-left">
          <span class="time-distance">{{ timeDistance }}</span>
          <section v-if="showDelBtn">
            <span class="del-btn" @click="handleDel">删除</span>
          </section>
        </div>
        <el-button type="text" @click="isShow = !isShow">回复</el-button>
      </div>
      <comment-box
        :isShow="isShow"
        v-if="isShow"
        @submit="handleSave"
      ></comment-box>
    </div>
  </div>
</template>

<script>
import CommentBox from "./commentBox.vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
import defaultAvatar from "@/assets/default_avatar.png";
export default {
  props: {
    atom: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { defaultAvatar };
  },
  inject: ["save", "queryComments", "queryInfo"],
  components: {
    CommentBox,
  },
  computed: {
    // 发表时间
    timeDistance() {
      return dayjs(this.atom.createTime).fromNow();
    },
    // 是否具有删除权限
    showDelBtn() {
      return (
        this.$store.state.clientUsers.userInfo._id === this.atom.fromUserId._id
      );
    },
  },
  directives: {
    clickOutSide: {
      // 初始化指令
      mounted(el, binding) {
        const clickHandler = function (event) {
          // 判断点击元素是否包含本身
          if (el.contains(event.target)) {
            return false;
          }
          if (binding.value) {
            binding.value(event);
          }
          el.clickOutSide = clickHandler;
        };
        document.addEventListener("click", clickHandler);
      },
      beforeUnmount(el) {
        // 解除监听
        document.removeEventListener("click", el.clickOutSide);
        delete el.clickOutSide;
      },
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    // 关闭评论框
    handleClickOut() {
      this.isShow = false;
    },

    async handleSave(content) {
      const { _id, commentId, fromUserId } = this.atom;
      const params = {
        content,
      };
      if (commentId) {
        // 回复->回复
        params.commentId = commentId;
        params.replyId = _id;
        params.toUserId = fromUserId._id;
      } else {
        // 回复->评论
        params.commentId = _id;
      }
      await this.save(params);
      this.isShow = false;
    },

    handleDel() {
      const { _id } = this.atom;
      this.delComment(_id);
    },

    // 删除评论
    async delComment(id) {
      try {
        await this.$api.delComment(id);
        this.queryComments();
        this.queryInfo();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.container {
  padding-top: 10px;
  &:hover {
    .del-btn {
      display: block !important;
    }
  }
  .wrapper {
    @include flex(flex-start);
    .avatar-wrapper {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .comment {
      flex: 1;
      .username {
        @include font(14px, #333, left);
        line-height: 22px;
      }
      .content {
        @include font(14px, #505050, left);
        line-height: 24px;
      }
    }
  }
  .reply-box {
    padding: 0 10px;
    @include flex(space-between, center);
    .reply-box-left {
      @include flex(flex-start, flex-end);
      @include font(12px, #ccc, left);
    }
    .del-btn {
      @include font(14px, #999, left);
      cursor: pointer;
      margin-left: 10px;
      position: relative;
      display: none;
      &::before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 2px;
        border-radius: 100%;
        background-color: #ccc;
        position: absolute;
        left: -6px;
        top: 8px;
      }
    }
  }
}
</style>
