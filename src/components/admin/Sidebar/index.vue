<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="$menuBg"
        :text-color="$menuText"
        :unique-opened="false"
        :active-text-color="$menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="item in navList" :key="item.path">
          <router-link :to="item.path">
            <el-menu-item :index="item.path">
              <i :class="['icon', item.icon]"></i>
              <span>{{ item.title }} </span>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showLogo: false,
      navList: [
        {
          path: "/admin/articlesManagment",
          title: "文章管理",
          icon: "el-icon-notebook-2",
        },
        {
          path: "/admin/categoryManagement",
          title: "分类管理",
          icon: "el-icon-set-up",
        },
        {
          path: "/admin/messagesMananment",
          title: "留言管理",
          icon: "el-icon-chat-dot-square",
        },
        {
          path: "/admin/usersManagement",
          title: "用户管理",
          icon: "el-icon-user",
        },
        // {
        //   path: '/admin/commentsManagment',
        //   title: '评论管理',
        //   icon: 'el-icon-s-comment',
        // },
      ],
      $menuText: "#fff",
      $menuActiveText: "#4d9999",
      $menuBg: "#c2e0e0",
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    isCollapse() {
      return !this.$store.state.adminApp.sidebar.opened;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/sidebar.scss";
.icon {
  font-size: 16px;
  color: $menuText;
}
</style>
