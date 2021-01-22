<template>
  <div class="dashboard-editor-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>QA工具</el-breadcrumb-item>
      <el-breadcrumb-item>项目详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card id="pdfCentent">
      <h2 class="report-title-style">
        {{ product_name }}/{{ module_name }}
      </h2>
      <div class="report-info">
        <span class="report-title">BUG: </span>
        <span class="report-title-dsc">total:{{ total }}, open:{{ open }}, resolve:{{ resolve }}, closed:{{ closed }}</span>
      </div>
      <div class="report-info">
        <div>
          <span class="report-title">风险: </span>
        </div>
        <div class="report-info-risks">
          <span class="report-title-dsc" style="line-height:2;" v-html="risks" />
        </div>
      </div>
      <div class="report-info">
        <span class="report-title">BUG & RD占比统计: </span>
      </div>
      <div class="report-info-barData">

        <bar-chart :chart-date="barData" />
        <div class="report-rd-table">
          <table class="report-table">
            <tr>
              <td style="font-weight:500">姓名</td>
              <td v-for="(item,index) in barData.date" :key="index">{{ item }}</td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; font-weight:500">open</td>
              <td v-for="(item,index) in barData.open" :key="index" style="background-color: #f9f9f9">{{ item }}</td>
            </tr>
            <tr>
              <td style="font-weight:500">resolve</td>
              <td v-for="(item,index) in barData.resolve" :key="index">{{ item }}</td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; font-weight:500">百分比</td>
              <td v-for="(item,index) in barData.rate" :key="index" style="background-color: #f9f9f9">{{ item }}%</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="report-info">
        <span class="report-title">BUG严重/状态统计: </span>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <pie-chart :pie-date="pieGradeDate" />
          </el-col>
          <el-col :span="12">
            <pie-chart :pie-date="pieStatusDate" />
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="download-card">
      <div class="download-button">
        <!-- <el-button
          type="success"
          @click="ExportSavePdf(htmlTitle,nowTime)"
        >
          生成报告
        </el-button> -->
        <el-button
          type="success"
          @click="downloadReportMethod()"
        >
          生成报告
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import BarChart from './BarChart'
import PieChart from './PieChart'
export default {
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      htmlTitle: '',
      nowTime: '',
      // updateLoading: false,
      barData: {
        date: [],
        total: [],
        open: [],
        resolve: [],
        rate: []
      },
      rdTableData: [],
      pieGradeDate: {
        title: 'BUG等级统计:',
        legend: ['崩溃', '阻断', '严重', '一般', '建议'],
        color: ['#9D2933', '#E3170D', '#D2691E', '#303133', '#909399'],
        date: []
      },
      pieStatusDate: {
        title: 'BUG状态统计:',
        legend: ['open', 'resolve', 'closed'],
        color: ['#E3170D', '#303133', '#909399'],
        date: []
      },
      product_name: '',
      module_name: '',
      total: '',
      open: '',
      resolve: '',
      closed: '',
      risks: '',
      getReportInfoBody: {
        product_id: '',
        module_id: '',
        start_day: '',
        end_day: ''
      }
    }
  },
  created() {
    this.getReportInfoBody.product_id = Number(this.$route.query.productId)
    this.getReportInfoBody.module_id = Number(this.$route.query.moduleId)
    this.getReportInfoBody.start_day = this.$route.query.st
    this.getReportInfoBody.end_day = this.$route.query.et
    this.getReportInfoMethod()
  },
  methods: {
    async getReportInfoMethod() {
      const { data: responseBody } = await this.$api.report.reportInfo(
        this.getReportInfoBody
      )
      if (responseBody.code === 1) {
        this.product_name = responseBody.data.product_name
        this.module_name = responseBody.data.module_name
        this.total = responseBody.data.total
        this.open = responseBody.data.open
        this.resolve = responseBody.data.resolve
        this.closed = responseBody.data.closed
        this.risks = responseBody.data.risks
        // this.risks = responseBody.data.risks.replace(' ', '<br />')
        // this.risks = '1 \r\n 2'
        this.barData.date = responseBody.data.rd_user_list
        this.barData.total = responseBody.data.rd_total_list
        this.barData.open = responseBody.data.rd_open_list
        this.barData.resolve = responseBody.data.rd_resolve_list
        this.barData.rate = responseBody.data.rd_rate_list
        console.log('this.risks', this.risks)
        // table
        this.rdTableData = responseBody.data.rd_user

        // BUG 等级
        this.pieGradeDate.date.push({ 'value': responseBody.data.crash, 'name': '崩溃' })
        this.pieGradeDate.date.push({ 'value': responseBody.data.block, 'name': '阻断' })
        this.pieGradeDate.date.push({ 'value': responseBody.data.serious, 'name': '严重' })
        this.pieGradeDate.date.push({ 'value': responseBody.data.sort, 'name': '一般' })
        this.pieGradeDate.date.push({ 'value': responseBody.data.propose, 'name': '建议' })
        // BUG 状态
        this.pieStatusDate.date.push({ 'value': responseBody.data.open, 'name': 'open' })
        this.pieStatusDate.date.push({ 'value': responseBody.data.resolve, 'name': 'resolve' })
        this.pieStatusDate.date.push({ 'value': responseBody.data.closed, 'name': 'closed' })
      } else {
        this.$message.error(responseBody.msg)
      }
    },
    downloadReportMethod() {
      // this.updateLoading = true
      setTimeout(() => {
        this.htmlTitle = this.product_name + '/' + this.module_name
        this.ExportSavePdf(this.htmlTitle, this.nowTime)
      }, 600)
      // this.updateLoading = false
    }
  }
}
</script>
<style>
body{
   margin: 0;
}
</style>
<style lang="less" scoped>
.download-card {
  // background-color: #373d41;
  background: rgba(55, 60, 65, 0.65);
  position: fixed;
  z-index: 100;
  bottom: 5px;
  width: 83%;
  height: 50px;
  .download-button {
  position: absolute;
  left: 50%;
  transform: translate(-90%, -15%);
  }
}
.report-rd-table{
  display:flex;
  .report-table{
    width:100%;
    margin: 15px 90px 15px 90px;
    font-size: 14px;
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
    >tr{
      >td{
      border-top: 1px solid #EBEEF5;
      border-left: 1px solid #EBEEF5;
      }
    }
  }
}
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.report-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.report-info{
  width:100%;
  margin-bottom: 15px;
  .report-info-risks{
    margin-left: 60px;
  }
  .report-title-dsc{
    font-size: 15px;
    // line-height: 10px;
  }
  .report-title{
    font-weight:500;
    font-size: 17px;
    color: rgba(13, 27, 62, 0.85);
    margin: 0;
    text-align: left;
    width: 100px;
    padding-left: 10px;
      &:before{
        content: '· ';
        color:#409EFF;
      }
  }
}
.show-interface {
  margin-left: 30px !important;
  margin-right: 100px !important;
  margin-bottom: 20px;

  .show-interface-colname {
    padding-left: 16px;
    font-size: 14px;
    color: rgba(13, 27, 62, 0.65);
    margin: 0;
    width: 100px;
  }
}
.rd-table {
    border-radius: 5px;
    margin-bottom: 25px;
}
</style>
