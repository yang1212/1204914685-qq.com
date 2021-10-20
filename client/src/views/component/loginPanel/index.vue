<script lang="ts">
import { defineComponent } from "vue"
import login from './login.vue'
import register from './register.vue'

export default defineComponent({
  name: "loginPanel",
  components: {
    login,
    register
  },
  data() {
    return {
      showDrawer: true,
      loading: false
    };
  },
  setup() {},
  methods: {
  },
});
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
        <login/>
      </el-tab-pane>
      <el-tab-pane label="register">
        <register/>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<style scoped lang="less">

</style>
