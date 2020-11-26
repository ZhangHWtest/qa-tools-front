<template>
  <div :class="className"
       :style="{ height: height, width: width }" />
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
    childChartData: { type: Object, required: true },
    childSucasenum: { type: Object, required: true },
    childRuncasenum: { type: Object, required: true },
    childFailcasenum: { type: Object, required: true }
  },
  data () {
    return {
      chart: null,
      chartVal: {
        chartDate: [],
        sucasenum: [],
        runcasenum: [],
        failcasenum: []
      }
    }
  },
  watch: {
    childChartData: {
      deep: true,
      handler (val) {
        this.chartVal.chartVal = val
        this.setOptions(this.chartVal)
      }
    },
    // childSucasenum: {
    //   deep: true,
    //   handler (val) {
    //     this.setOptions(val)
    //   }
    // },
    // childRuncasenum: {
    //   deep: true,
    //   handler (val) {
    //     this.setOptions(val)
    //   }
    // },
    // childFailcasenum: {
    //   deep: true,
    //   handler (val) {
    //     this.setOptions(val)
    //   }
    // }

  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created () {
  },
  methods: {
    // 初始化init
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartVal)
      console.log(this.chartVal)
    },
    // chartDate，mySucasenum，myRuncasenum，myFailcasenum
    setOptions ({ chartDate, childSucasenum, childRuncasenum, childFailcasenum } = {}) {
      this.chart.setOption({
        xAxis: {
          data: chartDate,
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
          data: ['Sucasenum', 'Runcasenum', 'Failcasenum']
        },
        series: [
          {
            name: 'Sucasenum',
            itemStyle: {
              normal: {
                color: '#67C23A',
                lineStyle: {
                  color: '#67C23A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: childSucasenum,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'Runcasenum',
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
            smooth: true,
            type: 'line',
            data: childRuncasenum,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: 'Failcasenum',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: childFailcasenum,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
        ]
      })
    }
  }
}
</script>
