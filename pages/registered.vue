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
        >
        </el-input>
      </el-form-item>

      <!-- 邮箱验证码 -->
      <el-form-item prop="emailCode" class="email-code">
        <div class="send-email-btn">
          <el-button type="primary" @click="sendCode">发送</el-button>
        </div>
        <span class="svg-container">
          <i class="el-icon-user"> </i>
        </span>

        <!-- 邮箱验证码 -->
        <el-input
          ref="emailCode"
          v-model="form.emailcode"
          placeholder="邮箱验证码"
          name="emailCode"
        >
        </el-input>
      </el-form-item>

      <!-- 4位数验证测试 -->
      <el-form-item prop="emailCode" class="email-code">
        <div class="send-email-btn">
          <img :src="code.captcha" @click="resetCptcha" alt="" />
        </div>
        <span class="svg-container">
          <i class="el-icon-user"> </i>
        </span>
        <el-input
          ref="emailCode"
          v-model="form.captcha"
          placeholder="请输入右边验证码 "
          name="emailCode"
        >
        </el-input>
      </el-form-item>
      <!-- 4位数验证测试 -->

      <el-form-item prop="nickname">
        <span class="svg-container">
          <i class="el-icon-user"> </i>
        </span>
        <el-input
          ref="nickname"
          v-model="form.nickname"
          placeholder="昵称"
          name="nickname"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"> </i>
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="form.password"
          placeholder="密码"
          name="password"
          :type="passwordType"
        >
        </el-input>
        <span class="show-pwd" @click="showPwd">
          <i v-if="passwordType == 'password'" class="el-icon-lock"></i>
          <i v-else class="el-icon-key"></i>
        </span>
      </el-form-item>

      <el-form-item prop="repassword">
        <span class="svg-container">
          <i class="el-icon-lock"> </i>
        </span>
        <el-input
          ref="repassword"
          v-model="form.repassword"
          placeholder="再次输入密码"
          name="repassword"
          type="password"
        >
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click.native.prevent="handleRegister"
        style="width:100%;margin-bottom:30px"
      >
        注册
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordType: "password",
      form: {
        email: "564146958@qq.com",
        nickname: "休息休息",
        password: "123446",
        emailcode: "",
        repassword: "123456",
        captcha: ""
      },
      code: {
        captcha: "/api/user/captcha"
      },
      registerRule: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { max: 12, message: "密码长度12位以内" }
        ],
        emailcode: [{ required: true, message: "请输入邮箱验证码" }],
        captcha: [{ required: true, message: "请输入验证码" }],
        repassword: [
          {
            required: true,
            trigger: "blur",
            //验证方法
            validator: (rule, value, callback) => {
              console.log(value);
              if (value !== this.form.password) {
                console.log("输入不一致");
              } else {
                console.log("输入一致");
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    // this.$http.get('/user/test');
  },
  methods: {
    //验证码
    resetCptcha() {
      this.code.captcha = `/api/user/captcha?_t=${new Date().getTime()}`;
    },
    //密码显示
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
        return;
      }
      this.passwordType = "password";
    },
    //发送邮箱
    async sendCode() {
      let ret = await this.$http.get(`/user/sendcode?email=${this.form.email}`);
      console.log(ret);
    },
    //登录验证
    handleRegister() {
      this.$refs.form.validate(async valid => {
        console.log(valid);
        if (valid) {
          let obj = {
            email: this.form.email,
            password: this.form.password,
            emailcode: this.form.emailcode,
            captcha: this.form.captcha,
            nickname: this.form.nickname
          };
          let ret = await this.$http.post("/user/register", obj);
          console.log(ret)
          if (ret.data.code === 200) {
            this.$notify({
              title: "成功",
              message: ret.data.message,
              type: "success"
            });
            setTimeout(()=>{
              this.$router.push('/login')
            },1000)
          } else {
            this.$notify({
              title: "失败",
              message: ret.data.message,
              type: "warning"
            });
          }
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