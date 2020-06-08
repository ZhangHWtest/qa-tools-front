<template>
  <div class="main-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>任务日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="notes-top-addbutton">
        <span class="notes-top-addannotation">注：</span>
      </div>
      <el-table :data="resultList"
                ref="multipleTableAll"
                style="width: 100%"
                @expand-change="expandChange">
        <el-table-column type="expand">
          <result-info :taskResultId="taskResultId"
                       :showResultInfo="showResultInfo" />
        </el-table-column>
        <el-table-column label="resultId"
                         width="80px"
                         prop="task_result_id">
        </el-table-column>
        <el-table-column label="通过数量"
                         prop="pass_num">
        </el-table-column>
        <el-table-column label="失败数量"
                         prop="fail_num">
        </el-table-column>
        <el-table-column label="异常数量"
                         prop="exception_num">
        </el-table-column>
        <el-table-column label="用例总数"
                         prop="case_num">
        </el-table-column>
        <el-table-column label="执行耗时"
                         prop="duration">
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
      getTaskResultList: {
        task_id: ''
      },
      resultList: [],
      getTaskResultInfo: {
        case_result_id: ''
      },
      taskResultId: '',
      showResultInfo: false,
      expands: ''
    }
  },
  created () {
    this.getTaskResultList.task_id = Number(this.$route.query.taskId)
    this.getTaskResultListMethod()
  },
  methods: {
    expandChange (row, expandedRows) {
      this.expandedRows = expandedRows
      if (expandedRows.length > 1) {
        this.$refs.multipleTableAll.toggleRowExpansion(this.expandedRows[0])
        console.log(this.$refs.multipleTableAll)
      }
      if (this.expandedRows.length > 0) {
        this.taskResultId = row.task_result_id
        this.showResultInfo = true
      }
    },
    async getTaskResultListMethod () {
      const { data: res } = await this.$api.task.resultListTask(
        this.getTaskResultList
      )
      if (res.code === 1) {
        this.resultList = res.data
      } else {
        this.$message.error('请求环境信息失败！')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.main-breadcrumb {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.notes-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  .notes-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
}
</style>
