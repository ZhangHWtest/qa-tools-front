<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>环境列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <div>
        <EnvTable />
      </div>
    </el-card>
  </div>
</template>

<script>
import EnvTable from './components/EnvTable'
export default {
  components: {
    EnvTable
  },
  created () {
    this.environmentListMethod()
  },
  data () {
    return {
      getenvBody: {
        page_num: 1
      }
    }
  },
  methods: {
    async environmentListMethod () {
      const { data: responseBody } = await this.$api.environment.getEnvironmentList(
        this.getenvBody
      )
      if (responseBody.code === 1) {
        this.interfaceList = responseBody.data
      } else {
        this.$message.error('请求环境信息失败！')
      }
    }
  }

}
</script>

<style lang="less" scoped>
</style>
