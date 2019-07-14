<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
      <el-form-item prop="username" class="form-item">
        <el-input v-model="form.username" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <p>忘记密码</p>
      <el-form-item>
        <el-button type="primary" class="btn" @click="headleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    headleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login", this.form).then(res => {
            this.$message({
              message: "登录成功，正在跳转",
              type: "success"
            });
            // 跳转到首页
            setTimeout(() => {
              this.$router.replace("/");
            }, 1000);
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 400px;
  background-color: #fff;
  padding: 20px;
  .form-item {
    margin-bottom: 20px;
  }
  p {
    color: #409eff;
    font-size: 12px;
    padding: 5px;
    text-align: right;
  }
  .btn {
    width: 100%;
  }
}
</style>

