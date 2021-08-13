<template>
  <div :class="classObj" class="layout-container">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <NavBar />
      <router-view class="main" />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar/index.vue'
import NavBar from '@/components/admin/NavBar/index.vue'
// import ResizeHandler from '@/mixins/ResizeHandler'
export default {
  middleware: ['authenticated'],
  components: {
    Sidebar,
    NavBar,
  },
//   mixins: [ResizeHandler],
  data() {
    return {}
  },
  computed: {
    sidebar() {
      return this.$store.state.adminApp.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
    device() {
      return this.$store.state.adminApp.device
    },
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style scoped lang="scss">
@import '@/styles/sidebar.scss';
.layout-container {
  width: 100%;
  height: 100%;
  .main-container {
    .main {
      padding: 30px;
    }
  }
}
</style>
