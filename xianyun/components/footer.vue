<template>
  <div class="footer-wrapper">
    <div class="footer">
      <el-row>
        <el-col :span="6">
          <ul>
            <li>
              <h3>闲云旅游旅游网</h3>
            </li>
            <li>上亿旅行者共同打造的"旅行神器</li>
            <li>
              <span>60,000</span> 多个全球旅游目的地
            </li>
            <li>
              <span>600,000</span> 个细分目的地新玩法
            </li>
            <li>
              <span>760,000,000</span> 次攻略下载
            </li>
            <li>
              <span>38,000</span> 家旅游产品供应商
            </li>
          </ul>
        </el-col>
        <el-col :span="5">
          <ul>
            <li>
              <h3>关于我们</h3>
            </li>
            <li>隐私政策 商标声明</li>
            <li>服务协议 游记协议</li>
            <li>商城平台服务协议</li>
            <li>网络信息侵权通知指引</li>
            <li>闲云旅游旅游网服务监督员</li>
            <li>网站地图加入闲云旅游</li>
          </ul>
        </el-col>
        <el-col :span="5">
          <ul>
            <li>
              <h3>旅游服务</h3>
            </li>
            <li>旅游攻略 酒店预订</li>
            <li>旅游特价 国际租车</li>
            <li>旅游问答 旅游保险</li>
            <li>旅游指南 订火车票</li>
            <li>旅游资讯 APP下载</li>
          </ul>
        </el-col>
        <el-col :span="6" class="scan">
          <p>
            <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
          </p>关注我们
        </el-col>
      </el-row>
      <div
        class="licence"
      >京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer-wrapper {
  background: #333;
  color: #ccc;
  min-width: 1000px;
  .footer {
    ul {
      margin-left: 30px;
      list-style: none;
      font-size: 12px;
      li {
        padding: 3px 0;
        span {
          color: orange;
        }
      }
    }
    padding-top: 30px;
    width: 1000px;
    margin: 0 auto;
    .scan {
      text-align: center;
      font-size: 12px;
      img {
        width: 140px;
        height: 140px;
      }
    }
    .licence {
      margin-top: 20px;
      border-top: 2px solid #666;
      padding: 50px 0;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
