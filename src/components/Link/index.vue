<template>
  <!-- eslint-disable vue/require-component-is -->
  <component :is="tag" v-bind="attrs">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/helper";
import { onMounted } from '@vue/runtime-core';
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
      const origin=window.location.origin
      if (isExternal(url)) {
        return {
          href: `${origin}#/linkBridge?target=${url}`,
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
