<template>
  <ul class="wrapper">
    <li class="text item" v-for="(item, idx) in list" :key="idx">
      <router-link class="link" :to="{ path: `/client/article/${item._id}` }">
        <i class="top-idx">{{ idx + 1 }}</i>
        <p class="title">{{ item.title }}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
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
