<template>
  <div class="container">
    <el-dialog
      title="邮箱登录"
      v-model="visible"
      width="30%"
      center
      :before-close="close"
      destroy-on-close
    >
      <el-form
        ref="formElem"
        :model="form"
        :rules="rules"
        :validate-on-rule-change="false"
      >
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="邮箱地址"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="code-wrapper">
          <el-input
            v-model="form.code"
            maxlength="4"
            placeholder="验证码"
          ></el-input>
          <el-button
            class="code-btn"
            :class="{ disabled: disabled }"
            type="text"
            @click="handleGetCode"
            >{{ content }}</el-button
          >
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleLogin">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { sendCode } from "@/api";
import { defineComponent } from "@vue/runtime-core";
import { ref, computed, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import useCountDown from "./composables/useCountDown";
import useForm from "./composables/useForm";
export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const { duration, content, disabled, startCountDown, resetCountDown } =
      useCountDown();
    const { form, rules } = useForm();
    const formElem = ref(null);
    const visible = computed(() => store.state["clientUsers"].isVisible);
    let intervalId = 0;
    const sendCodeByEmail = async (email) => {
      try {
        if (!email) return;
        await sendCode({
          email,
        });
        ElMessage.success("验证码发送成功");
      } catch (error) {
        console.error(error);
      }
    };

    const handleLogin = () => {
      formElem.value.validate(async (valid) => {
        if (!valid) return;
        try {
          await store.dispatch("clientUsers/login", { ...form.value });
          await store.dispatch("clientUsers/queryUserInfo");
          window.location.reload();
          store.commit("clientUsers/setVisible", false);
        } catch (error) {
          console.error(error);
        }
      });
    };

    // 发送验证码
    const handleGetCode = () => {
      formElem.value.validateField("email", (errMsg) => {
        if (errMsg) return;
        if (disabled.value) return;
        intervalId = startCountDown();
        sendCodeByEmail(form.value.email);
      });
    };
    const close = () => {
      store.commit("clientUsers/setVisible", false);
    };
    watch(visible, (newVal) => {
      if (!newVal.value) {
        resetCountDown();
      }
    });
    return {
      visible,
      duration,
      content,
      disabled,
      form,
      rules,
      formElem,
      close,
      handleGetCode,
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss">
.code-wrapper {
  position: relative;
  .code-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    &.disabled {
      color: #ccc !important;
    }
  }
}
</style>
