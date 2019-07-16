<template>
  <div class="register">
    <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
      <el-form-item prop="username" class="form-item">
        <el-input v-model="form.username" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="captcha" class="form-item button">
        <el-input v-model="form.captcha" placeholder="验证码">
          <template slot="append">
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname" class="form-item">
        <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword" class="form-item">
        <el-input v-model="form.checkPassword" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn" @click="handleRegSubmit">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    handleSendCaptcha() {
      const phoneNumber = this.form.username;
      if (!phoneNumber.trim()) {
        this.$message.warning("请输入用户名手机号码");
        return;
      }
      this.$axios({
        method: "POST",
        url: "/captchas",
        data: {
          tel: phoneNumber
        }
      })
        .then(res => {
          const { code } = res.data;
          this.$alert(`验证码为${code}`, "标题名称", {
            confirmButtonText: "确定",
            type: "warning"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;
          this.$axios({
            method: "POST",
            url: "/accounts/register",
            data: props
          })
            .then(res => {
              this.$store.commit("user/setUserInfo", res.data);
              this.$message({
                message: "注册成功，正在跳转登录",
                type: "success"
              });
              // 跳转到首页
              setTimeout(() => {
                this.$router.replace("/");
              }, 1000);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [
          // validator: 自定义的验证函数
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style lang="less" scoped>
.register {
  padding: 20px;
  background-color: #fff;
  .btn {
    width: 100%;
  }
}
</style>

