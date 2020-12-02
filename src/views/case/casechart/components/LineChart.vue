<template>
  <div
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from 'echarts' // echarts theme
import resize from './mixins/resize'
require('echarts/theme/macarons')

export default {
  mixins: [resize],
  props: {
    className: { type: String, default: 'chart' },
    width: { type: String, default: '100%' },
    height: { type: String, default: '350px' },
    autoResize: { type: Boolean, default: true },
    chartDate: { type: Object, required: true }
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
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
  },
  methods: {
    // 初始化init
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartDate)
      // console.log('chartDate:', this.chartDate)
    },
    // chartDate，mySucasenum，myRuncasenum，myFailcasenum
    setOptions({ openDate, suCasenum, runCasenum, failCasenum } = {}) {
      this.chart.setOption({
        xAxis: {
          data: openDate,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // 鼠标放到折线图上展示的数据展示样式
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },

        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['执行总数', '通过', '未通过']
        },
        series: [
          {
            name: '执行总数',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            smooth: false,
            type: 'line',
            data: runCasenum,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: '通过',
            itemStyle: {
              normal: {
                color: '#67C23A',
                lineStyle: {
                  color: '#67C23A',
                  width: 2
                }
              }
            },
            smooth: false,
            type: 'line',
            data: suCasenum,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '未通过',
            itemStyle: {
              normal: {
                color: '#F56C6C',
                lineStyle: {
                  color: '#F56C6C',
                  width: 2
                }
              }
            },
            smooth: false,
            type: 'line',
            data: failCasenum,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
