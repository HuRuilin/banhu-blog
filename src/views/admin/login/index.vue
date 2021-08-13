<template>
  <div class="login-wrapper">
    <img class="logo" :src="logoPng" />
    <el-form class="form-wrapper" ref="form" :model="form" :rules="rules">
      <el-form-item prop="account" style="margin-bottom: 30px">
        <i class="input-icon iconfont iconuser"></i>
        <el-input
          v-model="form.account"
          maxlength="30"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <i class="input-icon iconfont iconpassword"></i>
        <el-input
          v-model="form.password"
          maxlength="30"
          placeholder="请输入密码"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <div class="login-btn" @click="handleLogin">登&nbsp;录</div>
    </el-form>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import logoPng from "../../../assets/logo.png";
export default {
  components: {},
  data() {
    return {
      logoPng,
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    console.log("导航成功");
  },
  computed: {},
  watch: {},
  methods: {
    handleLogin() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        const token = await this.$store.dispatch("adminUsers/login", this.form);
        if (token) {
          await this.$store.dispatch("adminUsers/queryUserInfo");
          const redirect = this.$route.query.redirect;
          this.$router.replace(redirect || "/admin/articlesManagment");
          Cookie.set("adminToken", token);
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.login-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(@/assets/login_bg.jpg) center/cover no-repeat;
  position: relative;
  .logo {
    position: absolute;
    left: 50%;
    top: 50px;
    transform: translate(-50%);
    margin: 0 atuo;
  }
  .form-wrapper {
    width: 400px;
    margin: 400px auto 0;
    color: #fff;

    .el-form-item {
      padding-left: 30px;
      box-shadow: 3px 3px 6px rgba(61, 83, 96, 0.4),
        -3px -3px 6px rgba(81, 113, 134, 0.4);
      position: relative;
      .input-icon {
        position: absolute;
        left: -15px;
      }
    }
    :deep(.el-input__inner) {
      background: transparent;
      border-color: transparent;
      letter-spacing: 1px;
      color: #fff;
    }
    .login-btn {
      background-color: transparent;
      cursor: pointer;
      margin: 0 auto;
      font-size: 14px;
      border-radius: 2px;
      padding: 10px 14px;
      width: fit-content;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      box-shadow: 3px 3px 6px rgba(61, 83, 96, 0.3),
        -3px -3px 6px rgba(81, 113, 134, 0.3);
    }
  }
}
</style>
