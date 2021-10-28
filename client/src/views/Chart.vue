<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { forTimeCount, forYearCount } from "api/index";

const yearData = ref("");
const myChart = ref<any>();
const myCharts = ref<any>();
const lineChart = ref<any>();
const lineCharts = ref<any>();
const chartData: Array<any> = reactive([]);
const lineChartData = reactive({
  total: [],
  life: [],
  food: [],
  clothes: []
});

onMounted(() => {
  handleBarChart()
  handleLineChart(new Date())
});

const handleLineChart = async (year: Date) => {
  const startDate = format(year);
  const endDate = startDate.slice(0, 4) + "-12-31";
  const res: any = await forYearCount({
    startDate: startDate,
    endDate: endDate,
    userId: localStorage.getItem("userId"),
  });
  lineChartData.total = res.data.total;
  lineChartData.life = res.data.life;
  lineChartData.food = res.data.food;
  lineChartData.clothes = res.data.clothes;
  initLineChart();
};
const handleBarChart = async () => {
  const tempData = format(new Date()).slice(0, 8) + '01'
  const res: any = await forTimeCount({
    startDate: tempData,
    endDate: format(new Date()),
    userId: localStorage.getItem("userId")
  });
  chartData.length = 0;
  chartData.push(...res.data);
  // 更新柱状图表数据
  initBarChart(chartData);
};
const initBarChart = (data: Array<any>) => {
  myCharts.value = echarts.init(myChart.value);
  let option;
  option = {
    color: ["#003366"],
    xAxis: {
      type: "category",
      data: data.map((item) => item.label),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        barWidth: "25%",
        data: data.map((item) => item.value),
      },
    ],
  };
  option && myCharts.value.setOption(option);
};
const initLineChart = () => {
  lineCharts.value = echarts.init(lineChart.value);
  let option;
  option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["综合", "生活", "饮食", "服饰"],
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
    series: [
      {
        name: "综合",
        type: "line",
        data: lineChartData.total,
      },
      {
        name: "生活",
        type: "line",
        data: lineChartData.life,
      },
      {
        name: "饮食",
        type: "line",
        data: lineChartData.food,
      },
      {
        name: "服饰",
        type: "line",
        data: lineChartData.clothes,
      },
    ],
  };
  option && lineCharts.value.setOption(option);
};
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
};
</script>

<template>
  <div class="countData-box">
    <!-- 柱状图 -->
    <el-card class="box-card">
      <template #header>
      <div class="card-header">
        <span>本月</span>
      </div>
    </template>
      <div id="myChart" style="width: 100%; height: 300px" ref="myChart"></div>
    </el-card>
    <!-- 折现图 -->
    <el-card class="box-card">
      <div class="block">
        <el-date-picker
          v-model="yearData"
          type="year"
          placeholder="请选择"
          @change="handleLineChart"
        >
        </el-date-picker>
      </div>
      <div class="text item">
        <div ref="lineChart" style="width: 100%; height: 300px"></div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.countData-box {
  margin: 0 auto;
  .col-input {
    position: relative;
    i {
      position: absolute;
      top: 9px;
      left: 7px;
      z-index: 1;
    }
    /deep/ .el-input {
      input {
        padding-left: 30px;
      }
    }
  }
  .box-card {
    margin: 15px 15px;
  }
}
</style>
