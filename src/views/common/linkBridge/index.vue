<template>
  <div class="container">
    <div class="content">
      <p calss="title">即将离开半壶的博客，请注意账号财产安全</p>
      <p class="link">{{ target }}</p>
      <hr />
      <el-button
        style="float: right"
        type="primary"
        size="small"
        @click="openWindow"
        >继续访问</el-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    const { target } = route.query;
    const openWindow = () => {
      if (!target) return;
      window.open(target, "_self");
    };
    return {
      openWindow,
      target,
    };
  },
});
</script>
<style scoped lang='scss'>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f4f5f5;
  overflow: hidden;
  .content {
    width: 30%;
    height: 160px;
    box-sizing: border-box;
    padding: 30px;
    background-color: #fff;
    margin: 240px auto 0;
    .title {
      @include font(18px, #000000, left);
    }
    .link {
      color: #ccc;
      line-height: 32px;
    }
    hr {
      height: 1px;
      border: none;
      background-color: #eee;
      margin: 16px 0;
    }
  }
}
</style>
