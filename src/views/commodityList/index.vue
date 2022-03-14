<template>
  <div class="products-container" v-loading="loading">
    <div class="commodity-list-container">
      <div class="search-container">
        <div class="search">
          <span>搜索关键字：</span>
          <el-autocomplete
            class="input"
            v-model="state"
            clearable
            trigger-on-focus
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入关键字"
            @input="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="conmmodity-type">
          <span>商品类别：</span>
          <div class="block">
            <el-select
              clearable
              filterable
              @clear="handleLoaking"
              :filter-method="filterMethod(value)"
              v-model="value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <el-button class="search-btn" type="warning ">搜索</el-button>
        <el-button class="add-btn" plain @click="handleAddProject">
          添加商品
        </el-button>
      </div>
      <div class="commodityItem-container">
        <CommodityLists
          @edit="handleEdit"
          @delete="handleDelete"
          :tableData="getPageData"
          :category="this.categoryList"
        />
      </div>
    </div>
    <Pages
      :total="this.getPagetotal"
      :current-page="pager.currentPage"
      :page-size="pager.pageSize"
      @current="handleCurrent"
    />
  </div>
</template>

<script>
import CommodityLists from "./components/CommodityLists.vue";
import Pages from "./components/Page.vue";
import getCategoryall from "@/api/category";
import { getProductsAll, removeProducs } from "@/api/product";

export default {
  components: {
    CommodityLists,
    Pages,
  },
  data() {
    return {
      state: "",
      timeout: null,
      categoryList: [],
      productsList: [],
      value: "",
      newProductsList: "",
      accurateProducts: "",
      locking: true,
      loading: true,
      isLoading: false,
      pager: {
        total: 1,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getCategoryData;
    this.getProductsData;
    
  },
  computed: {
    getCategoryData: {
      get() {
        getCategoryall().then((res) => {
          this.categoryList = res.data.data;
          this.categoryList = this.categoryList.data;
        })
      }
    },
    getProductsData: {
      get() {
        getProductsAll().then((res) => {
          this.productsList = res.data.data;
          this.productsList = this.productsList.data;
          this.loading = false;
        });
      },
    },
    getProductsList() {
      return this.accurateProducts || this.newProductsList || this.productsList;
    },
    getPageData() {
      return this.getProductsList.slice(
        (this.pager.currentPage - 1) * this.pager.pageSize,
        this.pager.currentPage * this.pager.pageSize
      );
    },
    getPagetotal() {
      return this.getProductsList.length;
    },
  },
  methods: {
    handleEdit(row) {
      this.$router.push({
        name: "EditCommodity",
        params: {
          id: row.id,
        },
      });
    },
    handleDelete(row) {
      this.$confirm(`确认删除商品：${row.title}； 商品ID：${row.id}`)
        .then(() => {
          removeProducs(row.id).then(() => {
            getProductsAll().then((res) => {
              this.productsList = res.data.data;
              this.productsList = this.productsList.data;
            });
          });
        })
        .catch(() => {
          console.log(222);
        });
    },
    handleAddProject() {
      this.$router.push({
        path: "/addCommodity",
        name: "AddCommodity",
      });
    },
    handleCurrent(current) {
      this.pager.currentPage = current;
      console.log(this.productsList)
    },
    handleLoaking() {
      this.locking = true;
    },
    filterMethod(value) {
      if (!this.locking) {
        return;
      }
      if (!value) {
        this.newProductsList = this.productsList;
        return;
      }
      const arr = this.productsList.filter((item) => {
        return item.category === value;
      });
      this.newProductsList = arr;
      this.locking = false;
    },
    handleSelect(value) {
      if (!value) {
        this.accurateProducts = "";
        return;
      }
      const arr = this.newProductsList.filter((it) => {
        return it.title.indexOf(value) >= 0;
      });
      this.accurateProducts = arr;
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.productsList;
      let arr = [];
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      results.forEach((item) => {
        item.value = item.title;
        arr.push(item);
      });

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(arr);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (item) => {
        return item.title.indexOf(queryString) === 0;
      };
    },
  },
};
</script>

<style scoped lang="scss">
.commodity-list-container {
  position: relative;
  padding: 5px;
  background-color: #eee;
}
.search-container {
  display: flex;
  height: 70px;
  align-items: center;
  .search {
    display: flex;
    height: 40px;
    margin-left: 35px;
    span {
      font-size: 15px;
      line-height: 40px;
    }
    .input {
      height: 30px;
    }
  }
  .conmmodity-type {
    display: flex;
    line-height: 40px;
    span {
      font-size: 15px;
      margin-left: 40px;
    }
    .block {
      width: 150px;
    }
  }
  .search-btn {
    margin: 20px;
  }
  .add-btn {
    position: absolute;
    top: 15px;
    right: 10px;
  }
}
.commodityItem-container {
  width: 100%;
  margin-top: 10px;
}

</style>
