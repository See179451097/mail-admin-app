<template>
  <div class="data-statistics-container">
    <div class="card-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品总览</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div class="text item">content</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户总览</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div class="text item">content</div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>销售总览</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div class="text item">content</div>
      </el-card>
    </div>
    <div class="vline-container">
      <Vcharts />
    </div>
  </div>
</template>

<script>
import Vcharts from "./components/Vcharts.vue";

export default {
  components: {
    Vcharts,
  }
};
</script>

<style scoped>
.card-container {
  margin: 15px;
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.box-card:nth-child(2) {
  margin: 0 15px;
}
</style>