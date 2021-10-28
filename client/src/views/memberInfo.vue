
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { getMemberInfo } from "api/index"
import { useStore } from 'vuex'
const userName = ref('')
const router = useRouter()
const store = useStore()

onMounted(() => {
  handleMemberInfo()
})
const handleMemberInfo = async () => {
  const res:any = await getMemberInfo({userId: localStorage.getItem('userId')})
  userName.value = res.data[0].objName
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
  <div class="member-box">
    <div class="member-info">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        class="member-avatar-default"
      ></el-avatar>
    </div>
    <div class="login-out">
      <i class="el-icon-edit-outline"></i>&nbsp;Hello, {{ userName }}
    </div>
    <div class="login-out" @click="loginOut">
      <i class="el-icon-s-promotion"></i>&nbsp;Login out
    </div>
  </div>
</template>

<style scoped lang="less">
.member-box {
  .member-info {
    height: 260px;
    text-align: center;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
    margin-top: -80px;
    .member-avatar-default {
      margin-top: 120px;
      width: 60px;
      height: 60px;
    }
    .member-avatar {
      margin-top: 120px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .upload-btn {
      font-size: 40px;
      color:gray;
      position: relative;
      left: 25px;
      top: -43px;
    }
  }
  .login-out {
    height: 60px;
    line-height: 60px;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
    color: gray;
    font-weight: bold;
    padding-left: 20px;
  }
}
</style>
