<template>
  <div class="page-container">
    <el-pagination
      @current-change="handleCurrent"
      class="page-item"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="total"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    handleCurrent(current) {
      this.$emit("current", current);
      
    },
  },
};
</script>

<style scoped lang="scss">
.page-container {
  width: 28%;
  margin-top: 50px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>