<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent  } from "vue"
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

const word = ref("Test")
const wordList: Array<string> = reactive(["hello world", "tree wanted keep", "everything be ok"])
const store = useStore()
const router = useRouter()
const LoginPanel = defineAsyncComponent(
  () => import("component/loginPanel/index.vue")
)

word.value = wordList[Math.floor(Math.random() * wordList.length)]

const openLoginModal = () => {
  if (store.state.isLogin) {
    router.push({
      path: 'listDetail'
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
@import "common/style/index.less";

.home-container {
  height: 100%;
  background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 47%, #6654F1 100%);
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
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 5px 5px 5px @primary-color;
    font-size: 17px;
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
