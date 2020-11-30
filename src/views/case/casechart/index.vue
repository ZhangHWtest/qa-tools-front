<template>
  <div class="dashboard-editor-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>接口管理</el-breadcrumb-item>
      <el-breadcrumb-item>接口概况</el-breadcrumb-item>
    </el-breadcrumb>
    <panel-group
      :panel-inter-total="panelInterTotal"
      :panel-case-toal="panelCaseToal"
      :panel-case-success="panelCaseSuccess"
      :panel-case-run-num="panelCaseRunNum"
      @handleSetLineChartData="handleSetLineChartData"
    />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col
        :xs="24"
        :sm="24"
        :lg="16"
      >
        <line-chart :chart-date="lineChartData" />
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart :pie-date="pieDate" />
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
  data() {
    return {
      panelInterTotal: 0,
      panelCaseToal: 0,
      panelCaseSuccess: 0,
      panelCaseRunNum: 0,
      lineChartData: {
        openDate: [],
        suCasenum: [],
        runCasenum: [],
        failCasenum: []
      },
      pieDate: []
    }
  },
  created() {
    this.getIndexNumMethod()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    async getIndexNumMethod() {
      const { data: res } = await this.$api.testcase.getIndexNum()
      if (res.code === 1) {
        this.panelInterTotal = res.data.interface_num
        this.panelCaseToal = res.data.case_num
        this.panelCaseSuccess = res.data.success_case_num
        this.panelCaseRunNum = res.data.run_case_num

        const resMsg = res.data.cs_date_list
        const myList = []
        const myList2 = []
        const myList3 = []
        const myList4 = []
        resMsg.forEach(function(item, index) {
          myList.push(item.open_date)
          myList2.push(item.today_suc_case_num)
          myList3.push(item.today_run_case_num)
          myList4.push(item.today_fail_case_num)
        })
        this.lineChartData.openDate = myList
        this.lineChartData.suCasenum = myList2
        this.lineChartData.runCasenum = myList3
        this.lineChartData.failCasenum = myList4

        this.pieDate.push({ 'value': res.data.run_case_num, 'name': 'RunCaseNum' })
        this.pieDate.push({ 'value': res.data.success_case_num, 'name': 'SucCaseNum' })
        this.pieDate.push({ 'value': res.data.failure_case_num, 'name': 'FalCaseNum' })
        this.pieDate.push({ 'value': res.data.exception_case_num, 'name': 'ExcCaseNum' })
        console.log('this.pieDate', this.pieDate)
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
.el-row {
  margin-left: 25px;
  margin-right: 27px;
}
</style>
