<script lang="ts">
import { defineComponent } from 'vue'
import addPanel from '../addPanel/index.vue'
import loginPanel from '../loginPanel/index.vue'

export default defineComponent({
  name: 'navHeader',
  components: {
    addPanel,
    loginPanel
  },
  data() {
    return {
      hasLogin: false,
      showAddPanel: false,
      showLoginPanel: false
    }
  },
  created() {
    const userId = JSON.parse(localStorage.getItem('userId'))
    if (userId) {
      this.hasLogin = true
    }
  },
  setup() {
  },
  methods: {
    addData() {
      this.showAddPanel = true
    },
    closeModal() {
      this.showAddPanel = false
    },
    goLogin() {
      this.showLoginPanel = true
    },
    closeLoginModal() {
      this.showLoginPanel = false
    }
  }
})
</script>

<template>
  <div class="header">
    <div v-if="hasLogin">
      <div class="nav-list response-list">
        <span @click.native="addData">&nbsp;1</span>
        <span @click.native="goChartPage">&nbsp;2</span>
        <span @click.native="goMemberPage">&nbsp;3</span>
      </div>
      <span class="more-icon response-icon" @click="openMore">=</span>
    </div>
    <p class="default-btn btn-position" @click="goLogin" v-else>start</p>
    <addPanel v-if="showAddPanel" @close="closeModal"/>
    <loginPanel v-if="showLoginPanel" @close="closeLoginModal"/>
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
