<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import LoginPanel from 'component/loginPanel/index.vue'

const word = ref("Test")
const wordList: Array<string> = reactive(["hello world", "2", "3"])
const store = useStore()
const router = useRouter()

word.value = wordList[Math.floor(Math.random() * wordList.length)]

const openLoginModal = () => {
  if (store.state.isLogin) {
    router.push({
      path: 'chart'
    })
  } else {
    store.commit("setLoginMadalMutation", true)
  }
}
</script>

<template>
  <div class="home-container">
    <p class="text-info animation-word">{{ word }}</p>
    <p class="default-btn btn-position" @click="openLoginModal">开始使用</p>
    <LoginPanel v-if="store.state.showLoginModal"/>
  </div>
</template>

<style scoped lang="less">
.home-container {
  height: 100%;
  background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);
  .default-btn {
    padding: 8px 15px;
    border-radius: 5px;
    color: #fff;
    border: 1px solid #fff;
    font-size: 13px;
    line-height: 15px;
  }
  .btn-position {
    position: absolute;
    top: 25px;
    right: 17px;
  }
  .text-info {
    color: #fff;
    position: absolute;
    font-weight: bold;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
  }
  .animation-word {
    opacity: 0;
    animation-delay: 0.5s;
    animation-duration: 2s;
    animation-name: fontOpacity;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
}
@keyframes fontOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}  
</style>
