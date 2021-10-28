<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import navHeader from './component/navHeader/index.vue'

const isHome = ref(false)
const route = useRoute()

onMounted(() => {
  if (route.path === '/home') {
    isHome.value = true
  }  
})

</script>

<template>
  <div class="index-page" :class="{'home-bg': isHome}">
    <navHeader/>
    <router-view/>
  </div>
</template>

<style scoped>
.index-page {
  position: relative;
  height: 100%;
}
.home-bg {
  background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);
}
</style>
