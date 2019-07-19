<template>
  <!-- 轮播图 -->
  <div class="container">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banners-image"
          :style="`background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat; background-size:contain contain;`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- tab栏 -->
    <div class="banner-content">
      <div class="search-bar">
        <div class="search-tab">
          <span
            v-for="(item,index) in tabs"
            :key="index"
            :class="{ active: current === index }"
            @click="dianji(index)"
          >
            <i>{{item.title}}</i>
          </span>
        </div>
        <div class="search-input">
          <input type="text" :placeholder="tabs[current].placeholder" />
          <i class="el-icon-search"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      tabs: [
        { title: "攻略", placeholder: "搜素城市" },
        { title: "酒店", placeholder: "请输入城市搜索酒店" },
        { title: "机票", placeholder: "" }
      ],
      current: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    })
      .then(res => {
        const { data } = res.data;
        this.banners = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    dianji(index) {
      this.current = index;
      if (index === 2) {
        this.$router.push("/air");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banners-image {
    width: 100%;
    height: 100%;
  }
}
.banner-content {
  z-index: 9;
  position: absolute;
  left: 50%;
  top: 40%;
  width: 1000px;
  // background-color: red;
  margin-left: -500px;
  .search-bar {
    margin: 0 auto;
    width: 500px;
    .search-input {
      display: flex;
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;
      input {
        width: 100%;
        border: 0;
        font-size: 16px;
        outline: none;
        padding: 13px 15px;
      }
      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 13px 10px;
        font-weight: bold;
      }
    }
    .search-tab {
      display: flex;
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        margin-right: 8px;
        position: relative;
        cursor: pointer;
        i {
          z-index: 2;
          display: block;
          text-align: center;
          font-style: normal;
          line-height: 30px;
          position: absolute;
          width: 100%;
          height: 100%;
          color: #fff;
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>

