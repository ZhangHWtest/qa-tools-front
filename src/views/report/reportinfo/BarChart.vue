<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '450px'
    },
    chartDate: {
      type: Object, required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartDate: {
      deep: true,
      handler(val) {
        this.initChart(this.chartDate)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.chartDate)
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(chartDate) {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: 'center',
          top: '20',
          data: ['总数', '未解决', '已解决']
        },
        xAxis: [{
          type: 'category',
          axisLabel: {
            rotate: '45'
          },
          data: chartDate.date
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '总数',
          type: 'bar',
          color: '#409EFF',
          data: chartDate.total,
          label: {
            show: true,
            position: 'top'
          }
        }, {
          name: '已解决',
          type: 'bar',
          color: '#909399',
          data: chartDate.resolve,
          label: {
            show: true,
            position: 'top'
          }
        }, {
          name: '未解决',
          type: 'bar',
          color: '#F56C6C',
          data: chartDate.open,
          label: {
            show: true,
            position: 'top'
          }
        }]
      })
    }
  }
}
</script>
