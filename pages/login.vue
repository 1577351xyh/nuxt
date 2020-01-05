<template>
  <div class="login-container">
    <el-form :rules="registerRule" ref="form" :model="form" class="login-form">
      <div class="title-container">
        <img src="/logo.png" alt="" style="width:200px" />
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"> </i>
        </span>
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="邮箱"
          name="email"
          prop="email"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"> </i>
        </span>
        <el-input
          ref="password"
          v-model="form.password"
          placeholder="密码"
          name="password"
          prop="password"
        >
        </el-input>
      </el-form-item>

      <el-button
        type="primary"
        @click.native.prevent="login"
        style="width:100%;margin-bottom:30px"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: "login",
  data() {
    return {
      form: {
        email: "564146958@qq.com",
        password: "123446"
      },
      registerRule: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { max: 12, message: "密码长度12位以内" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          // vuex状态管理
          // let ret = await this.$http.post("/user/login", this.form);
          let ret = await this.$store.dispatch("user/login", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 200px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .auth {
    margin-top: 10px;
    text-align: center;
    img {
      width: 45px;
      height: 45px;
      margin: 0 30px;
    }
  }
}
</style>
