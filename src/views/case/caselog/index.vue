<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用例管理</el-breadcrumb-item>
      <el-breadcrumb-item>用例日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="interface-top-select" />
      <el-table
        ref="multipleTableAll"
        :data="resultList"
        style="width: 100%"
        @expand-change="expandChange"
      >
        <el-table-column type="expand">
          <result-info
            :case-result-id="caseResultId"
            :show-result-info="showResultInfo"
          />
        </el-table-column>
        <el-table-column
          label="resultId"
          width="80px"
          prop="case_result_id"
        />
        <el-table-column
          label="类型"
          width="80px"
          prop="case_type"
        />
        <el-table-column
          label="方法"
          width="80px"
          prop="method"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.method === 'GET'"
              class="show-interface-colname"
            >
              <el-tag>GET</el-tag>
            </span>
            <span
              v-else-if="scope.row.method === 'POST'"
              class="show-interface-colname"
            >
              <el-tag type="success">POST</el-tag>
            </span>
            <span
              v-else
              class="show-interface-colname"
            >
              <el-tag type="warning">{{ scope.row.method }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="路径"
          width="400px"
          prop="path"
        />
        <el-table-column
          label="状态"
          width="80px"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.case_result === 1"
              class="show-interface-colname"
            >通过
            </span>
            <span
              v-else-if="scope.row.case_result === 0"
              class="show-interface-colname-success"
            >失败
            </span>
            <span
              v-else
              class="show-interface-colname-warning"
            >异常
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="执行时间"
          prop="start_time"
        />
      </el-table>
    </el-card>
  </div>
</template>
<script>
import ResultInfo from './components/ResultInfo'
export default {
  components: {
    ResultInfo
  },
  data() {
    return {
      getCaseResultList: {
        case_id: ''
      },
      resultList: [],
      getCaseResultInfo: {
        case_result_id: ''
      },
      caseResultId: '',
      showResultInfo: false,
      expands: ''
    }
  },
  created() {
    this.getCaseResultList.case_id = Number(this.$route.query.caseId)
    this.getCaseResultListMethod()
  },
  methods: {
    expandChange(row, expandedRows) {
      this.expandedRows = expandedRows
      if (expandedRows.length > 1) {
        this.$refs.multipleTableAll.toggleRowExpansion(this.expandedRows[0])
        console.log(this.$refs.multipleTableAll)
      }
      if (this.expandedRows.length > 0) {
        this.caseResultId = row.case_result_id
        this.showResultInfo = true
      }
    },

    async getCaseResultListMethod() {
      const { data: responseBody } = await this.$api.testcase.getResultList(
        this.getCaseResultList
      )
      if (responseBody.code === 1) {
        this.resultList = responseBody.data
      } else {
        this.$message.error('请求环境信息失败！')
      }
    }
  }

}
</script>
<style  lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.show-interface-colname {
  color: #67c23a;
}
.show-interface-colname-success {
  color: #f56c6c;
}
.show-interface-colname-warning {
  color: #e6a23c;
}
.interface-top-select {
  margin: 10px 10px 10px 10px;
  padding-left: 10px;
  .interface-top-select-name {
    font-size: 15px;
    color: rgba(39, 56, 72, 0.85);
  }
  .interfacelist-top-select {
    padding-right: 15px;
    width: 190px;
  }
}
.interface-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  // display: flex;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-model-button {
    margin-right: 10px;
    float: right;
  }
}
</style>
