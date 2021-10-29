<script lang="ts" setup>
import { reactive, ref, onMounted, defineEmits } from "vue";
import { createBill, getTypeData } from "api/index";

const loading = ref(false);
const showDrawer = ref(true);
const formDataRef: any = ref(null);
const objTypeEnum: Array<any> = reactive([]);
const formData = reactive({
  objName: "",
  objType: "",
  objPrice: "",
  objDate: "",
  userId: "",
});
const formDataRules = reactive({
  objName: [{ required: true, message: "请输入名称", trigger: "blur" }],
  objType: [{ required: true, message: "请选择类型", trigger: "change" }],
  objPrice: [{ required: true, message: "请输入价格", trigger: "blur" }],
  objDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
});
const emit = defineEmits(["close"]);

onMounted(async () => {
  formData.objDate = format(new Date());
  const res: any = await getTypeData(null);
  // 不可直接赋值，不然答不到响应式，原理暂时不是很理解
  objTypeEnum.length = 0;
  objTypeEnum.push(...res.data);
});
const onSubmit = () => {
  formDataRef.value.validate().then(async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      formData.userId = userId;
    }
    loading.value = true;
    const res: any = await createBill(formData)
    loading.value = false;
    emit("close")
  }).catch(() => {
    loading.value = false;
  })
};
const onCancel = () => {
  emit("close");
};
const format = (value: Date) => {
  const year = value.getFullYear();
  const day = value.getDate() > 9 ? value.getDate() : "0" + value.getDate();
  let month: string | number = value.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
};
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
.add-new-box {
  padding: 20px 40px;
  .form-data {
    /deep/ .el-form-item__content {
      width: 100%;
    }
    .select-form-item {
      /deep/ .el-select {
        width: 100%;
      }
    }
    .date-form-item {
      /deep/ .el-date-editor {
        width: 100%;
      }
    }
  }
}
</style>
