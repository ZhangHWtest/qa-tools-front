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
        <SearchCaseList />
        <CaseListTable :caseList="caseList" />
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
        project_id: 1,
        model_id: 1,
        interface_id: 1,
        page_num: 1
      },
      caseList: []
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
