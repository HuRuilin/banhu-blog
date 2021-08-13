<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="content">
        <el-input
          class="textarea"
          type="textarea"
          v-model="form.content"
          placeholder="想说点儿什么呢？"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="float: right" type="primary" @click="handleSend">
          <i>SUBMIT</i>
        </el-button>
      </el-form-item>
    </el-form>
    <el-form
      ref="reply"
      :inline="true"
      :model="reply"
      :rules="replyRules"
      size="medium"
    >
      <ul>
        <li class="msg" v-for="msg in list" :key="msg._id">
          <p class="title">
            <span class="username">{{ msg.fromUserName }}</span>
            <span class="time">{{ formatTime(msg.createTime) }}</span>
          </p>
          <p class="content">{{ msg.content }}</p>
          <ul class="replys" v-if="msg.replys && msg.replys.length > 0">
            <li v-for="(elem, index) in msg.replys" :key="elem._id">
              <p class="reply-content">
                <span class="from-user"
                  ><strong>{{ elem.fromUserName }}：</strong></span
                ><span class="to-user">@ {{ elem.toUserName }}</span
                >&emsp;<span>{{ elem.content }}</span>
              </p>
              <p class="reply-attr">
                发布于<span class="time">{{
                  formatTime(elem.createTime)
                }}</span>
              </p>
              <p
                v-if="
                  index + 1 === msg.replys.length && elem.fromUserId !== userId
                "
              >
                <el-button
                  type="text"
                  v-if="currMsgId !== elem._id"
                  @click="currMsgId = elem._id"
                  >回复</el-button
                >
              </p>
              <p v-if="currMsgId === elem._id" style="margin-top: 20px">
                <el-form-item prop="content">
                  <el-input
                    :placeholder="'@' + elem.fromUserName + '：'"
                    v-model="reply.content"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="plain" @click="handleComment(elem)"
                    >确认回复</el-button
                  >
                </el-form-item>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </el-form>
  </div>
</template>

<script lang="ts">
import { queryMsgOfClient, leaveMsg, replyMsgOfClient } from "@/api";
import { defineComponent } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default defineComponent({
  mounted() {
    this.queryMsgList();
  },
  data() {
    return {
      // 留言表单
      form: {
        content: "",
      },
      // 留言回复
      reply: {
        content: "",
      },
      list: [],
      rules: {
        content: [
          {
            required: true,
            message: "多少还是说点儿啥呗，求求你了",
            trigger: "blur",
          },
        ],
      },
      replyRules: {
        content: [
          {
            required: true,
            message: "请填写回复内容",
            trigger: "blur",
          },
        ],
      },
      // 当前要回复的消息的id
      currMsgId: null,
    };
  },
  computed: {
    userId() {
      return this.$store.state["clientUsers"].userInfo._id;
    },
  },
  watch: {},
  methods: {
    async queryMsgList() {
      try {
        const { result } = await queryMsgOfClient();
        this.list = result;
      } catch (error) {
        console.error("【查询消息列表异常】", error);
      }
    },
    handleSend() {
      this.$refs["form"].validate((valid: boolean) => {
        if (!valid) return;
        this.leaveMsg(this.form.content);
      });
    },

    handleComment(msg: { msgId: any; fromUserId: any }) {
      this.$refs["reply"].validate((valid: boolean) => {
        if (!valid) return;
        this.replyMsg(msg);
      });
    },

    // 发布留言
    async leaveMsg(content: string) {
      try {
        if (!content) return;
        await leaveMsg({ content });
        this.queryMsgList();
        this.$message({
          message: "留言成功",
          type: "success",
        });
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * 回复留言
     */
    async replyMsg(msg: { msgId: any; fromUserId: any }) {
      const { msgId, fromUserId } = msg;
      try {
        await replyMsgOfClient({
          content: this.reply.content,
          id: msgId,
          toUserId: fromUserId,
        });
        this.queryMsgList();
        this.currMsgId = null;
      } catch (error) {
        console.error(error);
      }
    },

    formatTime(value: string) {
      if (!value) return "";
      return dayjs(value).fromNow();
    },
  },
});
</script>
<style scoped lang="scss">
.textarea {
  :deep(.el-textarea__inner) {
    min-height: 120px !important;
  }
}
.msg {
  min-height: 80px;
  padding-bottom: 30px;
  .replys {
    color: #666;
    background-color: #fafcfc;
    padding: 20px;
    .reply-content {
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
</style>
