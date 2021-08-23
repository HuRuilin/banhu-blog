<template>
  <custome-link
    :to="item.type === 'external' ? item.url : `/client/article/${item._id}`"
  >
    <div class="article-item">
      <p class="title">
        <i v-if="item.type === 'external'" class="el-icon-link"></i>
        {{ item.title }}
      </p>
      <p class="article-summary">{{ item.summary }}</p>
      <p>
        <span class="icon-wrapper pv">
          <i class="iconfont iconview"></i>
          {{ item.count }}
        </span>
        <span class="icon-wrapper pv">
          <i class="iconfont iconpinglun"></i>
          {{ item.comments }}
        </span>
        <span
          :class="{ love: isStar }"
          class="icon-wrapper stars"
          @click.prevent="handleStar"
          ><i class="iconfont icondianzan"></i>{{ likes }}
        </span>
      </p>
    </div>
  </custome-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "@/components/Link/index.vue";
import { starArticle } from "@/api";
export default defineComponent({
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    customeLink: Link,
  },
  data() {
    return {
      likes: 0,
      isStar: false,
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(newVal) {
        this.likes = newVal.stars;
        this.isStar = newVal.isStar;
      },
    },
  },
  methods: {
    handleStar() {
      const { _id } = this.item;
      if (!this.$store.state.clientUsers.token) {
        return this.$store.commit("clientUsers/setVisible", true);
      }
      this.starArticle(_id);
    },
    async starArticle(id) {
      try {
        if (!id) return;
        const isStar = !this.isStar;
        await starArticle({ id, isStar });
        this.likes = this.likes + (isStar ? 1 : -1);
        this.isStar = isStar;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
<style scoped lang="scss">
.article-item {
  height: 120px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  @include flex(space-between, flex-start, column);
  .title {
    @include font(16px, #333, left, 500);
  }
  .article-summary {
    @include font(13px, #b2bac2, left);
    line-height: 1.5;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.01);
  }
  .iconfont {
    margin-right: 4px;
  }
  .icon-wrapper {
    color: #999;
  }
  .icon-wrapper:not(:last-child) {
    margin-right: 6px;
  }
  .pv,
  .stars {
    transition: all 200ms;
  }
  .stars {
    &.love {
      color: #ef6d57;
    }
  }
  .pv {
    &:hover {
      transition: all 200ms;
      color: #ffa800;
    }
  }
  .stars {
    &:hover {
      transition: all 200ms;
      color: #ef6d57 !important;
    }
  }
}
</style>
