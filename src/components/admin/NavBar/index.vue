<template>
  <div class="navbar">
    <i
      :class="{
        'toggle-btn': true,
        'el-icon-s-unfold': true,
        'is-active': sidebar.opened,
      }"
      @click="toggleSideBar"
    ></i>
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <screenfull id="screenfull" class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> Home </el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/PanJiaChen/vue-admin-template/"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import screenfull from "@/components/Screenfull/index.vue";
// import Breadcrumb from '@/components/Breadcrumb'
import defaultAvatar from "@/assets/default_avatar.png"
export default {
  data() {
    return {};
  },
  components: {
    screenfull,
    // Breadcrumb,
  },
  created() {},
  computed: {
    sidebar() {
      return this.$store.state.adminApp.sidebar;
    },
    avatar() {
      return (
        this.$store.state.adminUsers.userInfo.avatar || defaultAvatar
       
      );
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.commit("app/TOGGLE_SIDEBAR");
    },
    async logout() {
      this.$store.commit("adminUser/SET_TOKEN", "");
      Cookie.remove("adminToken");
      this.$router.push({
        path: '/admin/login',
        query: {
          redirect: this.$route.fullPath,
        },
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-sizing: border-box;
  padding-left: 30px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .toggle-btn {
    font-size: 20px;
    line-height: 50px;
    cursor: pointer;
    &.is-active {
      transform: rotate(-180deg);
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
