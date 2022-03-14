<template>
  <el-table class="table-container" :data="getNewData" style="width: 100%" stripe>
    <el-table-column type="expand">
      <template slot-scope="props ">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称：">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="所属店铺：">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID：">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品标签：">
            <span>{{ props.row.tags }}</span>
          </el-form-item>
          <el-form-item label="店铺地址：">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述：">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
          <el-form-item label="" class="btn">
            <el-button @click="handleEdit(props.row)" type="primary" plain icon="el-icon-edit"></el-button>
            <el-button @click="handleDelete(props.row)" type="danger" plain icon="el-icon-delete"></el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="ID" prop="id"> </el-table-column>
    <el-table-column label="标题" prop="title"> </el-table-column>
    <el-table-column label="类目" prop="category"> </el-table-column>
    <el-table-column label="预售价格" prop="price"> </el-table-column>
    <el-table-column label="折扣价格" prop="price_off"> </el-table-column>
    <el-table-column label="限制购买数量" prop="inventory"> </el-table-column>
    <el-table-column label="上架状态" prop="status"> </el-table-column>

  </el-table>
</template>


<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: [],
    },
    category: {
      type: Array,
    }
  },
  computed: {
    getNewData() {
      return this.tableData.map((item) => {
        return {
          ...item,
          category: this.setValue(item.category),
        };
      })
    }
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
      
    },
    handleDelete(row) {
      this.$emit("delete", row);
    },
    setValue(value) {
      for(let i = 0; i < this.category.length; i++) {
        if(this.category[i].id === value) {
          return this.category[i].name;;
        }
      }
    }
  },
};
</script>

<style scoped>
.table-container{
  font-size: 15px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.btn{
  padding-left: 35%;
}
</style>