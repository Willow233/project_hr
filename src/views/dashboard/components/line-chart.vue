<template>
  <div ref="myDiv" class="line-echart" />
</template>

<script>
// 完整加载
// import * as echarts from 'echarts'
// 按需导入
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent
])

export default {
  mounted() {
    // 页面渲染完毕 此时才能获取对应的div
    // 初始化图表，设置配置项
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表的实例
    myChart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['人事部', '财务部', '技术部', '运营部', '市场部']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '人事部',
          type: 'line',
          stack: 'Total',
          data: [120, 232, 201, 234, 290, 330, 410]
        },
        {
          name: '财务部',
          type: 'line',
          stack: 'Total',
          data: [320, 282, 291, 334, 290, 430, 510]
        },
        {
          name: '技术部',
          type: 'line',
          stack: 'Total',
          data: [350, 232, 301, 454, 290, 330, 410]
        },
        {
          name: '运营部',
          type: 'line',
          stack: 'Total',
          data: [220, 432, 401, 434, 490, 530, 720]
        },
        {
          name: '市场部',
          type: 'line',
          stack: 'Total',
          data: [620, 632, 901, 934, 1090, 1330, 1320]
        }
      ]
    })
  }
}
</script>

<style>
.line-echart {
    width: 570px;
    height: 250px;
}
</style>
