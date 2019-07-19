<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @changeFlights="changeFlights"></FlightsFilters>

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
        <FlightsAside></FlightsAside>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      }, // 总数据
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      dataList: [], // 只负责页面渲染的数组
      pageIndex: 1,
      total: 0,
      pageSize: 5
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeFlights(arr) {
      this.flightsData.flights = arr;
      this.total = arr.length;
      this.setDataList();
    },
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
    },
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      })
        .then(res => {
          this.flightsData = res.data;
          this.cacheFlightsData = { ...res.data };
          //第一页数据
          this.dataList = this.flightsData.flights.slice(0, this.pageSize);
          this.total = this.flightsData.flights.length;
        })
        .catch(err => {
          console.log(err);
        });
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
