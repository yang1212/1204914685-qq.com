<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage } from 'element-plus'
import { login } from 'api/index'

const loading = ref(false)
const formData = reactive({
  objName: "",
  password: ""
})

const onLogin = async () => {
  if (!formData.objName || !formData.password) {
    return ElMessage.error('请输入用户名和密码进行登录')
  }
  loading.value = true
  const res: any = await login(formData)
  if (res.data.length === 0) {
    return ElMessage.error('请输入正确的用户名和密码进行登录')
  } else {
    localStorage.setItem('userId', JSON.stringify(res.data[0]._id))
  }
}

</script>

<template>
  <div class="login-box">
    <el-form :model="formData" class="form-box">
      <el-form-item>
        <el-input
          v-model="formData.objName"
          placeholder="用户名: test"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="formData.password"
          placeholder="密码: 123"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button @click="onLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.login-box {
  .form-box {
    margin-top: 50px;
    /deep/ .el-input__inner {
      border: 1px solid transparent;
      border-bottom: 1px solid #dcdfe6;
      background: transparent;
      border-radius: 0;
      color: #fff;
    }
    .text-btn {
      font-size: 14px;
      color: #929090;
      float: right;
    }
    .login-btn {
      text-align: center;
      /deep/ .el-button {
        width: 180px;
        padding: 20px 0;
        margin-top: 20px;
        background: #eee;
        color: #fff;
        border: none;
        border-radius: 25px;
      }
    }
  }
}
</style>
