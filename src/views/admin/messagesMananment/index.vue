<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :hide-required-asterisk="true"
    :inline="true"
    size="medium"
    class="message-list"
  >
    <ul>
      <li class="msg" v-for="msg in list" :key="msg._id">
        <p class="title">
          <span class="username">{{ msg.fromUserName }}</span>
          <span class="time">{{ formatTime(msg.createTime) }}</span>
        </p>
        <p class="content">{{ msg.content }}</p>
        <p v-if="!(msg.replys && msg.replys.length > 0)">
          <el-button
            type="text"
            v-if="currId !== msg._id"
            @click="currId = msg._id"
            >回复</el-button
          >
        </p>
        <template v-if="currId === msg._id">
          <el-form-item prop="replyContent">
            <el-input v-model="form.replyContent"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="onSubmit(msg)">确定回复</el-button>
          </el-form-item>
        </template>
        <ul class="replys" v-if="msg.replys && msg.replys.length > 0">
          <li v-for="(elem, index) in msg.replys" :key="elem._id">
            <p class="reply">
              <span class="from-user"
                ><strong>{{ elem.fromUserName }}：</strong></span
              ><span class="to-user">@ {{ elem.toUserName }}</span
              >&nbsp;
              <span>{{ elem.content }}</span>
            </p>
            <p class="reply-attr">
              发布于<span class="time">{{ formatTime(elem.createTime) }}</span>
            </p>
            <p
              v-if="
                index + 1 === msg.replys.length &&
                elem.fromUserId !== userId &&
                currId !== elem._id
              "
            >
              <el-button type="text" @click="currId = elem._id">回复</el-button>
            </p>
            <template v-if="currId === elem._id">
              <el-form-item prop="replyContent">
                <el-input v-model="form.replyContent"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="text" @click="onSubmit(msg)"
                  >确定回复</el-button
                >
              </el-form-item>
            </template>
          </li>
        </ul>
      </li>
    </ul>
  </el-form>
</template>



<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
import { queryMsgOfAdmin ,replyMsgOfAdmin} from "@/api";
export default {

  created() {
    this.queryList();
  },
  components: {},
  data() {
    return {
      list: [],
      // 待回复留言信息id
      currId: null,
      form: {
        replyContent: "",
      },
      rules: {
        replyContent: [
          {
            required: true,
            message: "请填写评论内容",
          },
        ],
      },
    };
  },
  computed: {
    userId() {
      return this.$store.state["adminUsers"].userInfo._id;
    },
  },
  watch: {},
  methods: {
    handleComment(id) {
      this.currId = id;
    },

    // 提交评论
    onSubmit(msg) {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.replyMsg(msg);
      });
    },

    // 查询留言列表
    async queryList() {
      try {
        const { result } = await queryMsgOfAdmin();
        this.list = result;
      } catch (error) {
        console.error(error);
      }
    },

    // 发表留言
    async replyMsg(msg) {
      try {
        const { fromUserId, _id } = msg;
        const { result } = await replyMsgOfAdmin({
          toUserId: fromUserId,
          id: _id,
          content: this.form.replyContent,
        });
        this.currId = null;
        this.queryList();
      } catch (error) {
        console.error(error);
      }
    },

    formatTime(value) {
      if (!value) return "";
      return dayjs(value).fromNow();
    },
  },
};
</script>
<style scoped lang="scss">
.message-list {
  .msg {
    min-height: 80px;
    padding-bottom: 30px;
    .replys {
      color: #666;
      background-color: #fafcfc;
      padding: 20px;
      border-radius: 6px;
      .reply {
        margin: 20px 0;
        .from-user {
          color: $theme-color;
        }
        .to-user {
          color: $theme-color;
        }
      }
      .reply-attr {
        @include font(12px, #ccc, left);
      }
    }
    .username {
      color: rgb(255, 204, 153);
    }
    .title {
      .time {
        @include font(12px, #999, right);
      }
      @include flex(space-between, center);
    }
    .content {
      color: #666;
      line-height: 40px;
    }
  }
}
</style>
