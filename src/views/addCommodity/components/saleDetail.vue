<template>
  <div class="sale-detail-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item required label="商品售价：" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item required label="折扣价格：" prop="price_off">
        <el-input v-model="ruleForm.price_off"></el-input>
      </el-form-item>
      <el-form-item required label="商品库存：" prop="inventory">
        <el-input v-model="ruleForm.inventory"></el-input>
      </el-form-item>
      <el-form-item required label="计量单位：" prop="unit">
        <el-input v-model="ruleForm.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品相册：" prop="images">
        <el-upload
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            this.$store.state.aapkey
          "
          :file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          name="avatar"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button class="submitBtn" type="success" @click="prevForm"
          >上一步</el-button
        >
        <el-button class="submitBtn" type="success" @click="nextForm"
          >提 交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['ruleForm'],
  data() {
    return {
      rules: {},
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    if(this.ruleForm.images.length > 0) {
      this.fileList = this.ruleForm.images.map((item, index) => {
        return {
          name: `image-${index}`,
          url: item,
        }
      })
      console.log(this.fileList)
    }
  },
  methods: {
    handleRemove(file, fileList) {
      const url = file.response.data.url;
      this.ruleForm.images = this.ruleForm.images.filter((item) => item !== url);
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res, file, fileList) {
      
      this.ruleForm.images.push(res.data.url);
      this.fileList = fileList;
      console.log(fileList);
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
    prevForm() {
      this.$emit("prev", this.ruleForm);
    },
  },
};
</script>

<style scoped>
.submitBtn {
  margin: 20px;
  width: 30%;
}
</style>