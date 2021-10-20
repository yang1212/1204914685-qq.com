<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "register",
  data() {
    return {
      formData: {
        objName: "",
        password: "",
        confirmPassword: "",
      },
      loading: false,
    };
  },
  setup() {},
  methods: {
    confirmBtn() {
      if (!this.formData.objName) {
        this.$message.error("用户名不能为空");
        return;
      }
      if (!this.formData.password) {
        this.$message.error("请设置密码");
        return;
      }
      if (this.formData.password !== this.formData.confirmPassword) {
        this.$message.error("密码确认不一致");
        return;
      }
      this.loading = true;
      // register({ objName: this.formData.objName, password: this.formData.password }).then(res => {
      //   this.loading = false
      //   if (res.resultCode === 403) {
      //     this.$message.error(res.message)
      //   } else {
      //     localStorage.setItem('userId', JSON.stringify(res.data._id))
      //     this.$router.push({
      //       path: 'billManager'
      //     })
      //   }
      // })
    },
  },
});
</script>

<template>
  <el-form :model="formData" class="form-box">
    <el-form-item>
      <el-input v-model="formData.objName" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="formData.password"
        placeholder="密码"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="formData.confirmPassword"
        placeholder="确认密码"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item class="confirm-btn">
      <el-button @click="confirmBtn" size="small" :loading="loading">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">
.form-box {
  margin-top: 50px;
  /deep/ .el-input__inner {
    border: 1px solid transparent;
    border-bottom: 1px solid #929090;
    background: transparent;
    border-radius: 0;
    color: #fff;
  }
  .confirm-btn {
    /deep/ .el-button {
      width: 100%;
      margin-top: 20px;
      background: #eee;
      color: #fff;
      border: none;
    }
  }
}
</style>
