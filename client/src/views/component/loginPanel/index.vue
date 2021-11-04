<script lang="ts" setup>
import { ref } from "vue"
import { useStore } from 'vuex'
import Login from './login.vue'
import Register from './register.vue'

const showDrawer = ref(true)
const store = useStore()

const handleClose = () => {
  store.commit("setLoginMadalMutation", false)
}

</script>

<template>
  <div>
    <el-drawer
      append-to-body
      size="100%"
      direction="ltr"
      v-model="showDrawer"
      :before-close="handleClose"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="登录">
          <Login/>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <Register/>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<style scoped lang="less">

</style>
