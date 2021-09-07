<template>
  <div class="client-container">
    <NavBar class="clinet-nav" />
    <div class="client-main">
      <router-view></router-view>
    </div>
    <Copyright />
    <Login  />
  </div>
</template>

<script>
import Login from '@/components/client/Login.vue'
import NavBar from '@/components/client/NavBar.vue'
import Copyright from '@/components/client/Copyright.vue'
export default {
  components: {
    NavBar,
    Copyright,
    Login
  },
  data() {
    return {}
  },

  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style scoped lang="scss">
.client-container {
  padding-top: 90px;
  // background: no-repeat url(~assets/wallhaven-nme710.jpg) center/cover;
//   background-attachment: fixed;
  .clinet-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .client-main {
    width: 62.5%;
    min-width: 600px;
    margin: 0 auto;
    min-height: calc(100vh - 110px);
    // background-color: #fff;
    position: relative;
  }
}
</style>
