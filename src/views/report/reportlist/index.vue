<template>
  <div class="dashboard-editor-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>QA工具</el-breadcrumb-item>
      <el-breadcrumb-item>项目统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="report-top-addbutton">
        <span class="report-top-addannotation">注：！</span>
        <el-button class="add-report-button" type="primary" @click="goAddCaseInfo()">
          新增 项目
        </el-button>
      </div>
      <el-table
        class="report-table"
        :data="reportList"
        stripe
      >
        <el-table-column width="70px" label="id" prop="id" />
        <el-table-column label="项目ID" prop="product_id" />
        <el-table-column label="项目名称" prop="product_name" />
        <el-table-column label="模块ID" prop="module_id" />
        <el-table-column label="模块名称" prop="module_name" />
        <el-table-column label="创建时间" prop="create_time" />
        <el-table-column label="最后修改时间" prop="update_time" />
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="报表"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-tickets"
                size="mini"
                circle
                @click="goReportInfo(scope.row.product_id,scope.row.module_id)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="getReportListBody.page_num"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, prev, pager, next, sizes"
        :total="report_total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getReportListBody: {
        page_num: 1,
        page_size: 10
      },
      reportList: [],
      report_total: ''
    }
  },
  created() {
    this.getReportListMethod()
  },
  methods: {
    // 监听 页值改变的事件
    handleCurrentChange(newPage) {
      this.getReportListBody.page_num = newPage
      this.getReportListMethod()
    },
    // 监听 页码改变的事件
    handleSizeChange(newPageSize) {
      this.getReportListBody.page_size = newPageSize
      this.getReportListMethod()
    },
    // 获取列表
    async getReportListMethod() {
      const { data: responseBody } = await this.$api.report.reportList(
        this.getReportListBody
      )
      if (responseBody.code === 1) {
        this.reportList = responseBody.data
        this.report_total = responseBody.total
      } else {
        this.$message.error(responseBody.msg)
      }
    },
    goReportInfo(productId, moduleId) {
      this.$router.push({ path: '/qatools/reportinfo', query: { productId: productId, moduleId: moduleId }}).catch(err => {
        console.log('输出', err)
      })
    }
  }

}
</script>
<style  lang="less" scoped>
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.report-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  // display: flex;
  .report-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
    &:before{
    content: '* ';
    color: red;
    }
  }
  .add-report-button {
    margin-right: 10px;
    float: right;
  }
}

</style>
