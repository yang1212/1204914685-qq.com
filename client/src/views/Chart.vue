<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import * as echarts from "echarts"
import { forTimeCount, forYearCount, getTypeData } from "api/index"

const barChartRef = ref(null)
const lineChartRef = ref(null)
const chartData: Array<any> = reactive([])
const typeEnum: Array<any> = reactive([
  {
    code: 'total',
    label: '全部'
  }
])
let lineChartData: any = reactive({})
const yearData = reactive({ date: new Date() })

onMounted(async () => {
  const res:any = await getTypeData(null)
  typeEnum.length = 1
  typeEnum.push(...res.data)
  initData()
})

const initData = () => {
  handleBarChart()
  handleLineChart(new Date())
}
const handleBarChart = async () => {
  const tempData = format(new Date()).slice(0, 8) + '01'
  const res: any = await forTimeCount({
    startDate: tempData,
    endDate: format(new Date()),
    userId: localStorage.getItem("userId")
  });
  chartData.length = 0
  chartData.push(...res.data)
  // 更新柱状图表数据
  initBarChart(chartData)
}
const initBarChart = (data: Array<any>) => {
  const barChart = echarts.init(barChartRef.value)
  barChart.setOption({
    color: ["#003366"],
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.label),
      axisTick: {
        alignWithLabel: true //坐标轴刻度与标签对齐
      },
      axisLabel: {
        interval: 0,
        rotate: 0
      }
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        barWidth: "30%",
        data: data.map((item) => item.value),
      }
    ]
  })
}
const handleLineChart = async (value: Date) => {
  const startDate = format(value).slice(0, 4) + "-01-01"
  const endDate = startDate.slice(0, 4) + "-12-31"
  const res: any = await forYearCount({
    startDate: startDate,
    endDate: endDate,
    userId: localStorage.getItem("userId")
  });
  lineChartData = res.data
  initLineChart()
}
const initLineChart = () => {
  const lineChart = echarts.init(lineChartRef.value)
  const series = typeEnum.map((item) => {
    return {
      name: item.label,
      type: "line",
      data: lineChartData[item.code]
    }
  })
  lineChart.setOption({
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: typeEnum.map((item) => item.label)
    },
    dataZoom: [
      {
        type: "inside", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        start: 0, // 左边在 10% 的位置。
        end: 80,
      },
    ],
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      boundaryGap: false, // 距离坐标原点是否有间隔
      axisLabel: { //  如果这个字段不设置，echarts会根据屏宽及横坐标数据自动给出间隔
        interval: 1, // 间隔数，比如第一个横坐标为1， 间隔为2，意思是显示第四个横坐标的label
        rotate: 40 // 横坐标上label的倾斜度
      },
      max: 11,
    },
    yAxis: {
      type: "value",
    },
    series: series
  })
}
const format = (value: Date) => {
  if (!value) {
    return "";
  }
  const year = value.getFullYear();
  const day = value.getDate() > 9 ? value.getDate() : "0" + value.getDate();
  let month: string | number = value.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}`;
}
</script>

<template>
  <div class="countData-box">
    <!-- 柱状图 -->
    <el-card class="box-card">
      <p>本月</p>
      <div style="width: 100%; height: 300px" ref="barChartRef"></div>
    </el-card>
    <!-- 折现图 -->
    <el-card class="box-card">
      <div>
        <el-date-picker
          v-model="yearData.date"
          type="year"
          placeholder="请选择"
          @change="handleLineChart"
        ></el-date-picker>
      </div>
      <div class="text item">
        <div ref="lineChartRef" style="width: 100%; height: 300px"></div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.countData-box {
  margin: 0 auto;
  padding: 65px 20px 15px 20px;
  .col-input {
    position: relative;
    i {
      position: absolute;
      top: 9px;
      left: 7px;
      z-index: 1;
    }
    ::v-deep(.el-input) {
      input {
        padding-left: 30px;
      }
    }
  }
  .box-card {
    border-top: none;
    margin-top: 10px;
    ::v-deep(.el-card__body) {
      padding: 10px 0;
    }
  }
}
</style>
