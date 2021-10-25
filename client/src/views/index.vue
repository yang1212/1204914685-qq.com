<script lang="ts" setup>
import navHeader from './component/navHeader/index.vue'

</script>

<template>
  <div class="index-page">
    <navHeader/>
    <router-view/>
  </div>
</template>

<style scoped>
.index-page {
  position: relative;
  height: 100%;
  background: #2a2a2a;
}
</style>
