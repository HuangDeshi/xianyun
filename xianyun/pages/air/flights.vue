<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>
        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item"></FlightsItem>
        <!-- size-change：切换条数时候触发 -->
        <!-- current-change: 页数切换时候触发 -->
        <!-- current-page: 当前页数 -->
        <!-- page-size: 当前页面的条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  components: {
    FlightsListHead,
    FlightsItem
  },
  data() {
    return {
      flightsData: {
        flights: []
      }, // 总数据
      dataList: [], // 只负责页面渲染的数组
      pageIndex: 1,
      total: 0,
      pageSize: 5
    };
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    })
      .then(res => {
        this.flightsData = res.data;
        //第一页数据
        this.dataList = this.flightsData.flights.slice(0, this.pageSize);
        this.total = this.flightsData.flights.length;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 切换条数时候触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },
    // 页数切换时候触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    },
    // 设置显示数据列表
    setDataList() {
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
