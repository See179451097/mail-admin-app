<template>
  <div class="basic-detail-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item required label="标题：" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="desc">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item required label="商品类目：" prop="category">
        <el-select
          v-model="ruleForm.category"
          placeholder="请选择商品类别"
          style="width: 100%; margin-bottom: 20px"
          @change="changeCategory"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          prop="c_item"
          v-model="ruleForm.c_item"
          placeholder="请添加子类目"
          style="width: 100%"
        >
          <el-option
            v-for="item in categoryItem"
            :key="item"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标签：" prop="tags">
        <div class="tags-item">
          <el-tag
            :key="i"
            v-for="(tag, i) in tags"
            closable
            :type="tag.type"
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag.label }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="submitBtn" type="success" @click="nextForm()"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import getTag from "@/utils/getTag";
import getCategoryall from "@/api/category";
export default {
  props: ['ruleForm'],
  data() {
    return {
      rules: {},
      categoryList: [],
      categoryItem: [],
      inputVisible: false,
      inputValue: '',
      tags:[{type:"info", label: "24小时发货"}]
    }
  },
  created() {
    this.getCategoryData;
  },
  computed: {
    getCategoryData: {
      get() {
        getCategoryall().then((res) => {
          this.categoryList = res.data.data;
          this.categoryList = this.categoryList.data;
        });
      },
    },
    
  },
  methods: {
    changeCategory(value) {
      var categoryArr = this.categoryList.filter((item) => item.id === value);
      this.categoryItem = categoryArr[0].c_items;
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.ruleForm.tags.splice(this.ruleForm.tags.indexOf(tag.label), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(getTag(inputValue));
        this.ruleForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    nextForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.submitBtn {
  margin-left: 50%;
  transform: translatex(-50%);
  padding: 12px 50px;
}
.tags-item {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>>