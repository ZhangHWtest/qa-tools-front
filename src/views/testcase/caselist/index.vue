<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用例列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <div>
        <SearchCaseList :getcaseListBody="getcaseListBody" />
        <CaseListTable :caseList="caseList"
                       @listenToChildRemoveCase="removeCaseById"
                       @listenToChildRunCase="runCaseById" />
        <el-pagination background
                       :current-page="getcaseListBody.page_num"
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next"
                       :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import SearchCaseList from './components/SearchCaesList'
import CaseListTable from './components/CaseListTable'
export default {
  components: {
    SearchCaseList,
    CaseListTable
  },
  created () {
    this.caseListMethod()
  },
  data () {
    return {
      getcaseListBody: {
        page_num: 1
      },
      caseList: [],
      removeAndRunCaseBody: {
        case_id: ''
      }
    }
  },
  methods: {
    async caseListMethod () {
      const { data: responseBody } = await this.$api.testcase.getCaseList(
        this.getcaseListBody
      )
      if (responseBody.code === 1) {
        this.caseList = responseBody.data
      } else {
        this.$message.error('请求用例信息失败！')
      }
    },
    async removeCaseById (id) {
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      this.removeAndRunCaseBody.case_id = id
      const { data: responseBody } = await this.$api.testcase.removeCase(
        this.removeAndRunCaseBody
      )
      if (responseBody.code === 1) {
        this.$message.success('删除成功！')
        this.caseListMethod()
      } else {
        this.$message.error('删除失败！')
      }
    },
    async runCaseById (id) {
      this.removeAndRunCaseBody.case_id = id
      const { data: responseBody } = await this.$api.testcase.runCase(
        this.removeAndRunCaseBody
      )
      if (responseBody.code === 1) {
        this.$message.success('运行成功！')
      } else {
        this.$message.error('运行失败！')
      }
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getcaseListBody.page_num = newPage
      this.caseListMethod()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
