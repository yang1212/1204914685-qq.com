<script lang="ts">
import { defineComponent } from 'vue'
import navHeader from './component/navHeader/index.vue'
import { getTypeData } from 'api/index'

export default defineComponent({
  name: 'index',
  components: {
    navHeader
  },
  data() {
    return {
    }
  },
  setup() {
  },
  created(){
    getTypeData({}).then(res => {
      console.log(1, res)
    })
  },
  methods: {
  }
})
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
