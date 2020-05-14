<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用例管理</el-breadcrumb-item>
      <el-breadcrumb-item>用例详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <basic-information :interfaceInfo="interfaceInfo" />
      <case-info :interfaceInfo="interfaceInfo" />
    </el-card>
  </div>
</template>
<script>
import BasicInformation from './components/BasicInformation'
import CaseInfo from './components/CaseInfo'
export default {
  components: {
    BasicInformation,
    CaseInfo
  },
  data () {
    return {
      getInterfaceInfo: {
        interface_id: ''
      },
      interfaceInfo: {}
    }
  },
  created () {
    this.getInterfaceInfo.interface_id = Number(this.$route.query.interId)
    this.getInterfaceInfoMethod()
  },
  methods: {
    async getInterfaceInfoMethod () {
      const { data: res } = await this.$api.myinterface.getInterfaceInfoMethod(
        this.getInterfaceInfo
      )
      if (res.code !== 1) {
        return this.$message.error('获取接口列表失败！')
      }
      this.interfaceInfo = res.data
    }
  }
}
</script>
<style lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
