<template>
  <div class="login">
    <el-button class="btn" @click="authorization">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    authorization () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
  background-image: url(../assets/img/bg.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    font-size: 26px;
    color: #ffffff;
    background-color: rgba(194, 190, 190, 0.4);
  }
}
</style>
