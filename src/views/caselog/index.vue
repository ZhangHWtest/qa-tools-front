<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用例管理</el-breadcrumb-item>
      <el-breadcrumb-item>用例日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="interface-top-select">
      </div>
      <div class="interface-top-addbutton">
        <span class="interface-top-addannotation">注：case调试不会记录log！</span>
      </div>
      <el-table :data="resultList"
                ref="multipleTableAll"
                style="width: 100%"
                @expand-change="expandChange">
        <el-table-column type="expand">
          <result-info :caseResultId="caseResultId"
                       :showResultInfo="showResultInfo" />
        </el-table-column>
        <el-table-column label="resultId"
                         width="80px"
                         prop="case_result_id">
        </el-table-column>
        <el-table-column label="类型"
                         width="80px"
                         prop="case_type">
        </el-table-column>
        <el-table-column label="方法"
                         width="80px"
                         prop="method">
          <template scope="scope">clear
            <span class="show-interface-colname"
                  v-if="scope.row.method === 'GET'">
              <el-tag>GET</el-tag>
            </span>
            <span class="show-interface-colname"
                  v-else-if="scope.row.method === 'POST'">
              <el-tag type="success">POST</el-tag>
            </span>
            <span class="show-interface-colname"
                  v-else>
              <el-tag type="warning">{{scope.row.method}}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="路径"
                         width="400px"
                         prop="path">
        </el-table-column>
        <el-table-column label="状态"
                         width="80px">
          <template scope="scope">
            <span class="show-interface-colname"
                  v-if="scope.row.case_result === 1">通过
            </span>
            <span class="show-interface-colname-success"
                  v-else-if="scope.row.case_result === 0">失败
            </span>
            <span class="show-interface-colname-warning"
                  v-else>异常
            </span>
          </template>
        </el-table-column>
        <el-table-column label="执行时间"
                         prop="start_time">
        </el-table-column>
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
  data () {
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
  created () {
    this.getCaseResultList.case_id = Number(this.$route.query.caseId)
    this.getCaseResultListMethod()
  },
  methods: {
    expandChange (row, expandedRows) {
      this.expandedRows = expandedRows
      if (expandedRows.length > 1) {
        this.$refs.multipleTableAll.toggleRowExpansion(this.expandedRows[0])
        console.log(this.$refs.multipleTableAll)
      }
      if (this.expandedRows.length > 0) {
        // let length = this.expandedRows.length - 1
        this.caseResultId = row.case_result_id
        this.showResultInfo = true
      }
      // console.log(row)
      // this.openTable += 1
      // if (this.openTable % 2 === 1) {
      //   this.caseResultId = row.case_result_id
      //   this.expands = row.case_result_id
      //   this.showResultInfo = true
      // }
    },

    async getCaseResultListMethod () {
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
