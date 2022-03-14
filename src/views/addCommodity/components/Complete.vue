<template>
  <div class="complete-container">
    <div class="complete-icon">
      <i class="el-icon-success icom"></i>
    </div>
    <div class="complete-words">
      <p class="complete-text">提交成功</p>
      <p class="complete-text">请根据提示进行操作</p>
    </div>
    <div class="complete-btn">
      <el-button @click="handelAdd" type="success">继续添加商品</el-button>
      <el-button @click="handelList" type="success">回到商品列表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handelAdd() {
      this.$emit("continue");
    },
    handelList() {
      this.$router.push({
        name: "CommodityList",
      })
    }
  }
};
</script>

<style scoped>
.complete-container {
  text-align: center;
}
.complete-icon{
  margin: 30px 0;
}
.icom {
  font-size: 100px;
  color: #67C23A;
  
}
.complete-words{
  margin-bottom: 100px;
}
.complete-text{
  font-size: 18px;
  font-weight: bold;
}
</style>