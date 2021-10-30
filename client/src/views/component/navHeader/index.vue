<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { getMemberInfo } from "api/index"

const userName = ref('')
const store = useStore()
const router = useRouter()

onMounted(() => {
  handleMemberInfo()
});

const handleMemberInfo = async () => {
  const res:any = await getMemberInfo({userId: localStorage.getItem('userId')})
  userName.value = res.data[0].objName
}
const goChartPage = () => {
  router.push({
    path: "chart",
  });
};
const goDetailPage = () => {
  router.push({
    path: "listDetail",
  });
}
const loginOut = () => {
  localStorage.removeItem("userId")
  store.commit("setIsLogin", false)
  router.push({
    path: 'home'
  })
}
</script>

<template>
  <div class="header">
    <div class="nav-list">
      <span @click="goDetailPage">&nbsp;详情</span>
      <span @click="goChartPage">&nbsp;图表</span>
    </div>
    <div class="member-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="member-avatar">B</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Hello, {{userName}}</el-dropdown-item>
            <el-dropdown-item @click="loginOut">Login out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header {
  height: 55px;
  line-height: 55px;
  border-bottom: 1px solid#eee;
  position: relative;
  .nav-list {
    padding-left: 5px;
    color: #2a2a2a;
    font-size: 15px;
    text-align: left;
    span {
      display: inline-block;
      width: 60px;
    }
  }
  .member-info {
    position: absolute;
    top: -3px;
    right: 10px;
    .member-avatar {
      font-weight: bold;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      color:#fff;
      background: #000;
      display: inline-block;
    }
  }
}
</style>
