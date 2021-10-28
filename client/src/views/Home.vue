<script lang="ts" setup>
import { ref, reactive } from "vue";

const word = ref("Test")
const wordList: Array<string> = reactive(["hello world", "2", "3"])

word.value = wordList[Math.floor(Math.random()*wordList.length)]
</script>

<template>
  <div class="home-container">
    <p class="text-info animation-word">{{ word }}</p>
  </div>
</template>

<style scoped lang="less">
.home-container {
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
@keyframes fontOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}  
</style>
