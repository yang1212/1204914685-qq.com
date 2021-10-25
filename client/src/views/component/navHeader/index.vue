<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import addPanel from '../addPanel/index.vue'
import loginPanel from '../loginPanel/index.vue'

const showAddPanelRef = ref(false)
const store = useStore();

onMounted(() => {
  if (localStorage.getItem('userId')) {
    store.commit("setIsLogin", true)
  } else {
    store.commit("setIsLogin", false)
  }
})

const openAddModal = () => {
  showAddPanelRef.value = true
}
const closeAddModal = () => {
  showAddPanelRef.value = false
}
const openLoginModal = () => {
  store.commit("setLoginMadalMutation", true)
}
const closeLoginModal = () => {
  store.commit("setLoginMadalMutation", false)
}
</script>

<template>
  <div class="header">
    <div v-if="$store.state.isLogin">
      <div class="nav-list response-list">
        <span @click="openAddModal">&nbsp;1</span>
        <span @click="goChartPage">&nbsp;2</span>
        <span @click="goMemberPage">&nbsp;3</span>
      </div>
      <span class="more-icon response-icon">=</span>
    </div>
    <p class="default-btn btn-position" @click="openLoginModal" v-else>start</p>
    <addPanel v-if="showAddPanelRef" @close="closeAddModal"/>
    <loginPanel v-if="$store.state.showLoginModal"/>
  </div>
</template>

<style scoped lang="less">
.header {
  .nav-list {
    float: right;
    padding-right: 20px;
    color: #fff;
    font-size: 15px;
    text-align: right;
    span {
      display: inline-block;
      width: 80px;
    }
  }
  .more-icon {
    position: absolute;
    right: 20px;
    top: 3px;
    color: #fff;
  }
  .default-btn {
    padding: 5px 15px;
    border-radius: 5px;
    color: #fff;
    border: 1px solid #fff;
    font-size: 13px;
  }
  .btn-position {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.response-icon {
  display: none;
}
@media only screen and (max-width: 500px) {
  .response-list {
    display: none;
  }
  .response-icon {
    display: block;
  }
}
</style>
