<script lang="ts" setup>
import { ref, reactive } from "vue"
import Login from './login.vue'
import Register from './register.vue'

const showDrawer = ref(true)
const loading = ref(false)

</script>

<template>
  <el-drawer
    append-to-body
    size="100%"
    direction="ltr"
    custom-class="demo-drawer"
    ref="drawer"
    destroy-on-close
    v-model="showDrawer"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="login">
        <Login/>
      </el-tab-pane>
      <el-tab-pane label="register">
        <Register/>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<style scoped lang="less">

</style>
