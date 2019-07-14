<template>
  <div class="container">
    <!-- 主要内容 -->
    <div class="main">
      <div class="form-wrapper">
        <div class="tabs">
          <span
            v-for="(item,index) in [`登录`,`注册`]"
            :key="index"
            @click="handleChangeTab(index)"
            :class="{active:current===index}"
          >{{item}}</span>
        </div>
        <loginForm v-if="current===0"></loginForm>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from "@/components/loginForm";
export default {
  components: {
    loginForm
  },
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleChangeTab(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: url("http://157.122.54.189:9095/assets/images/th03.jfif") center 0;
  height: 700px;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    position: relative;
    .form-wrapper {
      widows: 400px;
      position: absolute;
      top: 30%;
      left: 50%;
      .tabs {
        display: flex;
        span {
          width: 200px;
          background-color: #ccc;
          text-align: center;
          height: 50px;
          line-height: 50px;
          cursor: pointer;
        }
        .active {
          color: orange;
          background-color: #fff;
          font-weight: 700;
          border-top: 2px solid orange;
        }
      }
    }
  }
}
</style>

