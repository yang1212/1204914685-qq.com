<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from "vuex"
import navHeader from 'component/navHeader/index.vue'

const route = useRoute()
const store = useStore()

onMounted(() => {
  if (localStorage.getItem("userId")) {
    store.commit("setIsLogin", true);
  } else {
    store.commit("setIsLogin", false);
  }
})

</script>

<template>
  <div class="index-page">
    <navHeader v-if="route.path !== '/home'"/>
    <router-view/>
  </div>
</template>

<style scoped>
.index-page {
  position: relative;
  height: 100%;
}
</style>
