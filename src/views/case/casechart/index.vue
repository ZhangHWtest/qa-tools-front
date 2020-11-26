<template>
  <div class="dashboard-editor-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>接口管理</el-breadcrumb-item>
      <el-breadcrumb-item>接口概况</el-breadcrumb-item>
    </el-breadcrumb>
    <panel-group @handleSetLineChartData="handleSetLineChartData"
                 :panelInterTotal="panelInterTotal"
                 :panelCaseToal="panelCaseToal"
                 :panelCaseSuccess="panelCaseSuccess"
                 :panelCaseFailure="panelCaseFailure" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24"
              :sm="24"
              :lg="16">
        <line-chart :chart-date="lineChartData" />
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

export default {
  name: 'MonitorChart',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data () {
    return {
      panelInterTotal: 0,
      panelCaseToal: 0,
      panelCaseSuccess: 0,
      panelCaseFailure: 0,
      lineChartData: {
        openDate: [],
        suCasenum: [],
        runCasenum: [],
        failCasenum: []
      }
    }
  },
  created () {
    this.getIndexNumMethod()
  },
  methods: {
    // handleSetLineChartData (type) {
    //   this.lineChartData = lineChartData[type]
    // },
    async getIndexNumMethod () {
      const { data: res } = await this.$api.testcase.getIndexNum()
      if (res.code === 1) {
        this.panelInterTotal = res.data.interface_num
        this.panelCaseToal = res.data.run_case_num
        this.panelCaseSuccess = res.data.success_case_num
        this.panelCaseFailure = res.data.failure_case_num

        let resMsg = res.data.cs_date_list
        let myList = []
        let myList2 = []
        let myList3 = []
        let myList4 = []
        resMsg.forEach(function (item, index) {
          myList.push(item.open_date)
          myList2.push(item.today_suc_case_num)
          myList3.push(item.today_run_case_num)
          myList4.push(item.today_fail_case_num)
        })
        this.lineChartData.openDate = myList
        this.lineChartData.suCasenum = myList2
        this.lineChartData.runCasenum = myList3
        this.lineChartData.failCasenum = myList4
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
