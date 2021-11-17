<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"
import { billDetailList, delListData } from "api/index"
import AddPanel from "component/addPanel/index.vue"

const curIndex = ref()
const showAddPanelRef = ref(false)
const detailList: Array<any> = reactive([])

onMounted(() => {
  initData()
})
const initData = async () => {
  const res: any = await billDetailList({
    userId: localStorage.getItem("userId")
  })
  detailList.length = 0
  detailList.push(...res.data)
}
const handleDelete = (index: number) => {
  curIndex.value = index
  ElMessageBox.confirm("确定删除吗？", "温馨提示", {
    confirmButtonText: "确 定",
    cancelButtonText: "取 消",
    type: "warning"
  }).then(() => {
    const curItem = detailList.find((item, index) => index === curIndex.value)
    delListData({ id: curItem._id }).then((res) => {
      ElMessage({
        type: "info",
        message: "删除成功"
      })
      initData()
    })
  })
}
const openAddModal = () => {
  showAddPanelRef.value = true
}
const closeAddModal = () => {
  showAddPanelRef.value = false
}
const addSuccess = () => {
  showAddPanelRef.value = false
  initData()
}
</script>

<template>
  <div class="detail-box">
    <el-icon @click="openAddModal" class="el-icon-circle-plus-outline add-btn">
      <CirclePlus/>
    </el-icon>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in detailList"
        :key="index"
        :timestamp="item.objDate"
        placement="top"
        v-show="detailList.length > 0"
      >
        <el-card>
          <h4>({{ item.objName }})</h4>
          <p>支出: {{ item.objPrice }}元</p>
          <el-icon class="delete-btn" @click="handleDelete(index)">
            <Delete />
          </el-icon>
        </el-card>
      </el-timeline-item>
      <el-timeline-item placement="top" v-show="detailList.length === 0">
        <el-card>
          <p @click="handleDelete(1)">暂无数据</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <AddPanel v-if="showAddPanelRef" @close="closeAddModal" @sure="addSuccess"/>
  </div>
</template>

<style lang="less" scoped>
@import "common/style/index.less";

.detail-box {
  padding: 65px 20px 15px 20px;
  text-align: left;
  height: 1000px;
  .delete-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    i {
      font-weight: bold;
      color: gray;
    }
  }
  .add-btn {
    z-index: 2;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 25px;
    font-weight: bold;
    color: @primary-color;
  }
}
</style>
