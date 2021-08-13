<template>
  <HotsList :list="hotArticles" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useHotArticles from "../articles/composables/useHotArticles";
import HotsList from "@/components/client/HotsList.vue";
export default defineComponent({
  setup() {
    const { hotArticles } = useHotArticles();
    return { hotArticles };
  },
  components: {
    HotsList,
  },
});
</script>
