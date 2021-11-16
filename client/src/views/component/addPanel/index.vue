<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { createBill, getTypeData } from "api/index"

const loading = ref(false)
const showDrawer = ref(true)
const showCommonPanelRef = ref(false)
const formDataRef: any = ref(null)
const objTypeEnum: Array<any> = reactive([])
const formData = reactive({
  objName: "",
  objType: "",
  objPrice: "",
  objDate: "",
  userId: ""
});
const formDataRules = reactive({
  objName: [{ required: true, message: "请输入名称", trigger: "blur" }],
  objType: [{ required: true, message: "请选择类型", trigger: "change" }],
  objPrice: [{ required: true, message: "请输入价格", trigger: "blur" }],
  objDate: [{ required: true, message: "请选择日期", trigger: "blur" }]
});
const commonType: any = reactive([
  { 
    type: 'food', 
    typeName: '饮食',
    data: ['🕖早餐', '🕛中餐', '🕖晚餐', '🍧零食', '🍆食材']
  },
  { 
    type: 'clothes',
    typeName: '服饰',
    data: ['👕上衣', '👖裤子', '👢鞋']
  },
  { 
    type: 'rent',
    typeName: '租房',
    data: ['🏠房租', '⚡物业']
  }
])
// 添加常用类型值
const emit = defineEmits(["close", "sure"])

onMounted(async () => {
  formData.objDate = format(new Date())
  const res: any = await getTypeData(null)
  objTypeEnum.length = 0
  objTypeEnum.push(...res.data)
})

const onSubmit = () => {
  formDataRef.value.validate().then(async () => {
    const userId = localStorage.getItem("userId")
    if (userId) {
      formData.userId = userId
    }
    loading.value = true
    const res: any = await createBill(formData)
    loading.value = false
    emit("sure")
  }).catch(() => {
    loading.value = false
  })
}
const onCancel = () => {
  emit("close")
}
const format = (value: Date) => {
  const year = value.getFullYear();
  const day = value.getDate() > 9 ? value.getDate() : "0" + value.getDate();
  let month: string | number = value.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
}
const selectCur = (data) => {
  if (data) {
    formData.objType = data.type
    formData.objName = data.curInfo
    showCommonPanelRef.value = false
  }
}
const openCommonPanel = () => {
  showCommonPanelRef.value = !showCommonPanelRef.value
}
</script>

<template>
  <el-drawer
    title="新增"
    append-to-body
    size="100%"
    direction="ltr"
    custom-class="demo-drawer"
    ref="drawer"
    destroy-on-close
    v-model="showDrawer"
  >
    <div class="add-new-box">
      <div class="common-type">
        <p class="common-type-title" @click="openCommonPanel">
          <span>常用类别</span>
          <el-icon><ArrowDown /></el-icon>
        </p>
        <div class="common-list" v-show="showCommonPanelRef">
          <div v-for="(item, index) in commonType" :key="index">
            <p class="item-title">{{item.typeName}}</p>
            <el-tag v-for="(items, indexs) in item.data" :key="indexs" @click="selectCur({type: item.type, curInfo: items})">{{items}}</el-tag>
          </div>
        </div>
      </div>
      <el-form
        class="form-data"
        :model="formData"
        ref="formDataRef"
        :rules="formDataRules"
      >
        <el-form-item prop="objName">
          <el-input v-model="formData.objName" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item class="select-form-item" prop="objType">
          <el-select v-model="formData.objType" placeholder="类型" clearable>
            <el-option
              v-for="(item, index) in objTypeEnum"
              :key="index"
              :label="item.label"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="objPrice">
          <el-input v-model="formData.objPrice" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item class="date-form-item" prop="objDate">
          <el-date-picker
            v-model="formData.objDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="objDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button @click="onCancel">取消</el-button>
          <el-button @click="onSubmit" :loading="loading">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<style scoped lang="less">
@import "common/style/index.less";
.add-new-box {
  .common-type {
    margin-bottom: 10px;
    position: relative;
    .common-type-title {
      color: @primary-color;
      font-weight: bold;
    }
    .common-list {
      width: 320px;
      border-radius: 5px;
      padding: 0 10px 15px 10px;
      background: #eee;
      border: 1px solid #eee;
      position: absolute;
      top: 25px;
      z-index: 2;
      .item-title {
        margin: 15px 0 5px 0;
      }
      ::v-deep(.el-tag) {
        margin: 5px 7px 0 0;
      }
    }
  }
  .form-data {
    ::v-deep(.el-form-item__content) {
      width: 100%;
    }
    .select-form-item {
      ::v-deep(.el-select) {
        width: 100%;
      }
    }
    .date-form-item {
      ::v-deep(.el-date-editor) {
        width: 100%;
      }
    }
    .btn-group {
      float: right;
    }
  }
}
</style>
