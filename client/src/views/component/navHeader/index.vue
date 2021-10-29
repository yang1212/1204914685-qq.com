<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { getMemberInfo } from "api/index"
import AddPanel from "../addPanel/index.vue"

const showAddPanelRef = ref(false)
const userName = ref('')
const store = useStore()
const router = useRouter()

onMounted(() => {
  handleMemberInfo()
});

const openAddModal = () => {
  showAddPanelRef.value = true;
};
const closeAddModal = () => {
  showAddPanelRef.value = false;
};
const handleMemberInfo = async () => {
  const res:any = await getMemberInfo({userId: localStorage.getItem('userId')})
  userName.value = res.data[0].objName
}
const goChartPage = () => {
  router.push({
    path: "chart",
  });
};
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
      <span @click="openAddModal">&nbsp;数据录入</span>
      <span @click="goChartPage">&nbsp;数据分析</span>
    </div>
    <div class="member-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="member-avatar">T</span>
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
    <AddPanel v-if="showAddPanelRef" @close="closeAddModal" />
  </div>
</template>

<style scoped lang="less">
.header {
  height: 55px;
  line-height: 55px;
  .nav-list {
    float: left;
    padding-right: 20px;
    color: #2a2a2a;
    font-size: 15px;
    text-align: right;
    span {
      display: inline-block;
      width: 80px;
    }
  }
  .member-info {
    position: absolute;
    top: 0px;
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
