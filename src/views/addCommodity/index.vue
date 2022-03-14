<template>
  <div class="add-commodity-container">
    <div class="steps-container">
      <el-steps
        :active="active"
        simple
        process-status="wait"
        finish-status="success"
        align-center
      >
        <el-step title="填写商品基本信息"></el-step>
        <el-step title="填写商品销售信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="form-container">
      <BasicDetail v-if="active === 1" @next="next" :ruleForm="form" />
      <SaleDetail
        v-if="active === 2"
        @next="next"
        @prev="prev"
        :ruleForm="form"
      />
      <Complete v-if="active === 3" @continue="continueAdd" />
    </div>
  </div>
</template>

<script>
import { addProducs, datail, edit } from "@/api/product";
import BasicDetail from "./components/basicDetail.vue";
import SaleDetail from "./components/saleDetail.vue";
import Complete from "./components/Complete.vue";

export default {
  components: {
    BasicDetail,
    SaleDetail,
    Complete,
  },
  data() {
    return {
      active: 1,
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: "",
        tags: ["24小时发货"],
        price: 0,
        unit: "",
        price_off: 0,
        inventory: 0,
        image: [],
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    if(id) {
      datail(id).then((res) => {
        this.form = res.data.data;
      })
    }
    console.log(id);
  },

  methods: {
    continueAdd() {
      location.reload();
    },

    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.active === 1) {
        this.active += 1;
      } else {
        if(this.$route.params) {
          edit(this.form).then((res) => {
            this.active += 1;
            console.log(res)
          });
        } else{
          addProducs(this.form).then((res) => {
          this.active += 1;
          
        });
        }
        
      }
    },
    prev() {
      this.active -= 1;
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 65%;
  margin: 80px auto;
}
</style>