<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { forTimeCount, forYearCount } from "api/index";

const yearData = ref("");
const myChart = ref<any>();
const myCharts = ref<any>();
const lineChart = ref<any>();
const lineCharts = ref<any>();
const formData = reactive({
  startDate: "",
  endDate: "",
});
const chartData: Array<any> = reactive([]);
const lineChartData = reactive({
  total: [],
  life: [],
  food: [],
  clothes: [],
});

onMounted(() => {
  initDate("init");
});

const initDate = (tag: string) => {
  getCountData("init");
};
const getCountData = async (tag: string) => {
  const res: any = await forTimeCount({
    startDate: formData.startDate,
    endDate: formData.endDate,
    userId: localStorage.getItem("userId"),
  });
  chartData.length = 0;
  chartData.push(...res.data);
  // 更新柱状图表数据
  initBarChart(chartData);
};
const handleYearChange = async (year: string) => {
  const startDate = format(new Date(year));
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
        end: 40,
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
      boundaryGap: false,
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
    <el-row>
      <el-form :model="formData">
        <el-col :span="10" :offset="1" class="col-input"
          ><i class="el-icon-date"></i
          ><el-input id="dateStart" v-model="formData.startDate"></el-input
        ></el-col>
        <el-col :span="10" :offset="2" class="col-input"
          ><i class="el-icon-date"></i
          ><el-input id="dateEnd" v-model="formData.endDate"></el-input
        ></el-col>
      </el-form>
    </el-row>
    <!-- 柱状图 -->
    <el-card class="box-card">
      <div id="myChart" style="width: 100%; height: 300px" ref="myChart"></div>
    </el-card>
    <!-- 折现图 -->
    <el-card class="box-card">
      <div class="block">
        <el-date-picker
          v-model="yearData"
          type="year"
          placeholder="选择年"
          @change="handleYearChange"
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
