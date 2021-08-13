<template>
  <div class="navbar-wrapper">
    <router-link to="/">
      <img class="logo" :src="logoPng" alt="" />
    </router-link>
    <div class="right-menus">
      <el-input
        @change="handleSearch"
        prefix-icon="el-icon-search"
        size="mini"
        v-model="keyword"
        placeholder="请输入内容"
        style="margin-right: 30px"
        :clearable="true"
      ></el-input>
      <div
        v-for="nav in navBarList"
        :key="nav.type"
        @click="handleClick(nav.type)"
        class="menu-item"
      >
        <span>{{ nav.name }}</span>
      </div>

      <!-- <screenfull id="screenfull" class="menu-item hover-effect" /> -->

      <div
        v-if="token"
        class="menu-item"
        @click="handleClick('personalCenter')"
      >
        <div class="dropdown-menu">
          <div class="avatar-wrapper">
            <img :src="avatar" class="avatar" />
            <avatar-uploader
              class="avatar-uploader"
              :api="upload"
              @success="updateAvatar"
              @fail="handleFail"
            >
              <template v-slot:upload-btn> 上传 </template>
            </avatar-uploader>
          </div>
          <!-- 下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <i class="el-icon-arrow-down el-icon--right"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="my-homepage"
                  >我的主页</el-dropdown-item
                >
                <el-dropdown-item divided command="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <span v-else class="menu-item login-btn" @click="handleClick('login')"
        >登&nbsp;录</span
      >
    </div>
  </div>
</template>

<script>
import Screenfull from "@/components/Screenfull/index.vue";
import Cookie from "js-cookie";
import AvatarUploader from "@/components/AvatarUploader/index.vue";
import logoPng from "../../assets/logo.png";
import defaultAvatar from "../../assets/default_avatar.png";
import { upload } from "@/api";
export default {
  components: {
    AvatarUploader,
    Screenfull
  },
  data() {
    return {
      navBarList: [
        {
          icon: "",
          name: "留言",
          type: "leaveWord",
        },
      ],
      keyword: "",
      logoPng,
      upload,
    };
  },
  computed: {
    avatar() {
      return this.$store.state.clientUsers.userInfo.avatar || defaultAvatar;
    },
    token() {
      return this.$store.state.clientUsers.token;
    },
  },
  methods: {
    handleFail(error) {
      console.log("失败", error);
    },
    // 列表搜索
    handleSearch(keyWord) {
      this.$store.commit("clientArticles/updateKeyword", keyWord);
    },
    handleClick(type) {
      if (!this.$store.state["clientUsers"].token) {
        return this.$store.commit("clientUsers/setVisible", true);
      }
      switch (type) {
        case "leaveWord":
          console.log(1);
          this.$router.push("/client/leaveWord");
          console.log(2);
          break;
        case "personalCenter":
          break;
      }
    },
    handleCommand(command) {
      switch (command) {
        case "my-homepage":
          this.$router.push("/client/personalCenter");
          break;
        case "logout":
          this.logout();
          break;
      }
    },

    logout() {
      this.$store.commit("clientUsers/SET_TOKEN", "");
      Cookie.remove("clientToken");
      window.location.reload();
    },

    /**
     * 更新用户头像
     */
    async updateAvatar({ url }) {
      try {
        if (!url) return;
        await this.$api.updateClientUserInfo({ avatar: url });
        await this.$store.dispatch("clientUsers/queryUserInfo");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.navbar-wrapper {
  height: 100vw;
  height: 60px;
  background-color: $theme-color;
  padding: 0 50px;
  @include flex(space-between, center);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .logo {
    height: 60px;
  }
  .menu-item {
    color: #fff;
    cursor: pointer;
    flex-shrink: 0;
  }
  .menu-item:not(:last-child) {
    margin-right: 30px;
  }
  .right-menus {
    @include flex(flex-end, center);
    .dropdown-menu {
      @include flex();
      .el-icon-arrow-down {
        margin: 12px 10px;
      }
    }
    .avatar-wrapper {
      cursor: pointer;
      @include flex(flex-start, center);
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 100%;
      overflow: hidden;
      border: 2px solid #fff;
      &:hover {
        .avatar-uploader {
          bottom: 0;
          transition: bottom 0.3s;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
        overflow: hidden;
      }
      .avatar-uploader {
        width: 100%;
        height: 20px;
        line-height: 20px;
        position: absolute;
        left: 0;
        bottom: -100%;
        background-color: rgba(0, 0, 0, 0.4);
        @include font(12px, #fff, center);
        color: #fff !important;
        transition: bottom 0.3s;
      }
    }
  }
}
</style>
