<template>
  <div>
    <i class="el-icon-full-screen screenfull" @click="click"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click() {
      console.log('是否支持',screenfull.isEnabled)
      if (!screenfull.isEnabled) {
        this.$message({
          message: '当前浏览器不支持该功能',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  font-size: 20px;
}
</style>
