<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="0">
        <img src="/logo.png" alt="" style="width:50px;" />
      </el-menu-item>
      <el-menu-item index="0">
        <nuxt-link to="/">首页</nuxt-link>
      </el-menu-item>
      <el-menu-item index="1">
        <nuxt-link to="/editor/new">写文章</nuxt-link>
      </el-menu-item>
      <el-menu-item index="2" class="pull-right">
        <nuxt-link to="/registered">注册</nuxt-link>
      </el-menu-item>
      <el-menu-item index="3" class="pull-right">
        <nuxt-link to="/login">登录</nuxt-link>
      </el-menu-item>
    </el-menu>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scope>
.pull-right {
  float: right !important;
}
.email-code {
  width: 340px;
  position: relative;
  .send-email-btn {
    position: absolute;
    right: -110px;
    .el-button {
      width: 90px;
      height: 50px;
    }
    img {
      width: 90px;
      height: 50px;
      cursor: pointer;
    }
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
}
</style>
