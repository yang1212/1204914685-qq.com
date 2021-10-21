<script lang="ts" setup>
import { ref, reactive } from "vue"
import { register } from 'api/index'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const loading = ref(false)
const formData = reactive({
  objName: "",
  password: "",
  confirmPassword: "",
})
const router = useRouter()
const confirmBtn = async () => {
  // if (formData.password !== formData.confirmPassword) {
  //   return ElMessage.error('密码确认不一致')
  // }
  loading.value = true
  const res: any = await register({ objName: formData.objName, password: formData.password })
  const result = res.data
  loading.value = false
  if (result.resultCode === 403) {
    ElMessage.error(result.message)
  } else {
    localStorage.setItem('userId', JSON.stringify(result.data._id))
    router.push({
      path: 'contact'
    })
  }
}
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
