<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$alert("暂时没有往返", "提示", {
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch(value, cb) {
      // 第一种
      // this.querySearchCity(value,cb,(arr)=> {
      //   this.form.departCity = arr[0].value;
      //   this.form.departCode = arr[0].sort;
      // })
      const res = await this.querySearchCity(value);
      if (res.length > 0) {
        this.form.departCity = res[0].value;
        this.form.departCode = res[0].sort;
      }

      cb(res);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // 第一种
      // this.querySearchCity(value,cb,(arr)=> {
      //   this.form.destCity = arr[0].value;
      //   this.form.destCode = arr[0].sort;
      // })

      // 第二种调用
      this.querySearchCity(value).then(res => {
        if (res.length > 0) {
          this.form.destCity = res[0].value;
          this.form.destCode = res[0].sort;
        }

        cb(res);
      });
    },
    //封装搜索城市的函数,第一种
    // querySearchCity( queryString ,cb ,setCity){
    //   if (!queryString) {
    //     cb([]);
    //     return;
    //   }
    //   //发送后台请求
    //   this.$axios({
    //     url: "/airs/city",
    //     params: {
    //       name: queryString
    //     }
    //   }).then(res => {
    //     const { data } = res.data;
    //     const newDate = data.map(v => {
    //       v.value = v.name.replace("市", "");
    //       return v;
    //     });
    //     // 默认选中第一个
    //     // this.form.destCity = newDate[0].value;
    //     // this.form.destCode = newDate[0].sort;
    //     setCity(newDate)

    //     cb(newDate);
    //   });
    // }

    //第二种  封装搜索城市的函数
    querySearchCity(queryString) {
      return new Promise((resolve, reject) => {
        if (!queryString) {
          resolve([]);
          return;
        }
        //发送后台请求
        this.$axios({
          url: "/airs/city",
          params: {
            name: queryString
          }
        }).then(res => {
          const { data } = res.data;
          const newDate = data.map(v => {
            v.value = v.name.replace("市", "");
            return v;
          });
          // 默认选中第一个
          // this.form.destCity = newDate[0].value;
          // this.form.destCode = newDate[0].sort;
          // setCity(newDate);

          resolve(newDate);
        });
      });
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发日期"
        }
      };
      //开关左右。判断验证是否为空
      let valid = true;
      //循环判断上面的字段是否为空
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message);
        }
      });
      // 跳转
      if (valid) {
        this.$router.push({
          path: "/air/flights",
          query: this.form
        });
      }
      // 把当前的搜索条件存储到本地的数组中
      const airs = JSON.parse(localStorage.getItem("airs")) || [];
      airs.unshift(this.form);

      // 截取只剩下5个
      if (airs.length > 5) {
        airs.length = 5;
      }

      localStorage.setItem("airs", JSON.stringify(airs));
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>


