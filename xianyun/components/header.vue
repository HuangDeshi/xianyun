<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 导航 -->
      <el-row type="flex" class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国际机票</nuxt-link>
      </el-row>
      <!-- 登录信息 -->
      <div>
        <div v-if="!$store.state.user.userInfo.token" class="logins">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <div v-else>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt />
              {{$store.state.user.userInfo.user.nickname}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="headleLoginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    headleLoginOut() {
      this.$store.commit("user/clearUserInfo");
      this.$message({
        message: "退出成功",
        type: "success"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  box-shadow: 0 3px 3px #ccc;
}
.main {
  height: 60px;
  width: 1000px;
  margin: 0 auto;

  .nav {
    flex: 1;
    line-height: 60px;
    a {
      color: #000000;
      padding: 0 20px;
      display: block;
      height: 60px;
      box-sizing: border-box;
      text-decoration: none;
      &:hover {
        color: #409eff;
        border-bottom: 5px solid #409eff;
      }
    }
    .nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
  .logo {
    margin-right: 20px;
    img {
      width: 165px;
      height: 42px;
      margin-top: 9px;
    }
  }
  .el-dropdown-link {
    line-height: 60px;
    img {
      height: 36px;
      width: 36px;
      vertical-align: middle;
    }
  }
  .logins {
    line-height: 60px;
  }
}
</style>

