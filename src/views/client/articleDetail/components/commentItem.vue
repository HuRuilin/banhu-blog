<template>
  <div>
    <!-- 评论主体内容 -->
    <comment-atom :atom="item"></comment-atom>
    <!-- 评论回复列表 -->
    <div class="replys">
      <comment-atom
        v-for="elem in item.replys"
        :key="elem._id"
        :atom="elem"
      ></comment-atom>
    </div>
  </div>
</template>

<script>
import CommentAtom from './commentAtom.vue'
export default {
  components: {
    CommentAtom,
  },
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
<style scoped lang='scss'>
.replys {
  margin-left: 50px;
  padding-left: 10px;
  background-color: #fafbfc;
  .comment {
    padding-right: 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>
