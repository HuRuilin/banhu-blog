<template>
  <!-- eslint-disable vue/require-component-is -->
  <component :is="tag" v-bind="attrs">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/helper";
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    tag() {
      return isExternal(this.to) ? "a" : "router-link";
    },
    attrs() {
      const url = this.to;
      if (isExternal(url)) {
        return {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }
      return {
        to: url,
      };
    },
  }
};
</script>
