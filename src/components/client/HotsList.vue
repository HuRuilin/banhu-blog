<template>
  <ul class="wrapper">
    <li class="text item" v-for="(item, idx) in list" :key="idx">
      <custome-link
        class="link"
        :to="
          item.type === 'external' ? item.url : `/client/article/${item._id}`
        "
      >
        <i class="top-idx">{{ idx + 1 }}</i>
        <p class="title">  <i v-if="item.type === 'external'" class="el-icon-link"></i>{{ item.title }}</p>
      </custome-link>
    </li>
  </ul>
</template>

<script>
import CustomeLink from "@/components/Link/index.vue";
export default {
  components: {
    CustomeLink,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  .item {
    margin-bottom: 12px;
    line-height: 26px;
    cursor: pointer;
    .link {
      @include flex(flex-start, flex-start);
    }
    &:nth-child(-n + 3) {
      .top-idx {
        color: #ffd0a6;
      }
    }
    .top-idx {
      @include font(16px, #ccc, left, bold);
    }
    .title {
      @include lines-ellipsis(2);
      @include font(14px, #666, left);
      padding-left: 10px;
    }
  }
}
</style>
