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
        ref="form"
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
            <span  class="dialog-footer">
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {sendCode} from '@/api'
export default {
  data() {
    return {
      // 倒计时长
      duration: 60,
      // 按钮显示内容
      content: '发送验证码',
      // 是否禁用
      disabled: false,
      form: {
        // 邮箱号
        email: '',
        // 验证码
        code: '',
        // 密码
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'blur',
            message: '请填写邮箱地址',
          },
          {
            pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            trigger: 'blur',
            message: '邮箱格式不正确',
          },
        ],
        code: [
          {
            required: true,
            trigger: 'blur',
            message: '请填写验证码',
          },
          {
            pattern: /^[A-Za-z0-9]{4}$/,
            trigger: 'blur',
            message: '验证码格式不正确',
          },
        ],
      },
    }
  },
  computed: {
    visible() {
      return this.$store.state['clientUsers'].isVisible
    },
  },
  components: {},
  methods: {
    // 发送验证码
    handleGetCode() {
      this.$refs['form'].validateField('email', (errMsg) => {
        if (errMsg) return
        if (this.disabled) return
        this.disabled = true
        let count = this.duration
        this.content = `${count} 后重试`
        this.intervalId = setInterval(() => {
          count -= 1
          if (count <= 0) {
            this.content = '重新发送'
            clearInterval(this.intervalId)
            this.disabled = false
            return
          }
          this.content = `${count} s后重试`
        }, 1000)

        this.sendCode(this.form.email)
      })
    },

    async sendCode(email) {
      try {
        if (!email) return
        await sendCode({
          email,
        })
        this.$message.success('验证码发送成功')
      } catch (error) {
        console.error(error)
      }
    },
    handleLogin() {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) return
        try {
          await this.$store.dispatch('clientUsers/login', { ...this.form })
          await this.$store.dispatch('clientUsers/queryUserInfo')
          window.location.reload()
          this.$store.commit('clientUsers/setVisible', false)
        } catch (error) {
          console.error(error)
        }
      })
    },
    close() {
      this.$store.commit('clientUsers/setVisible', false)
    },
  },
}
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
