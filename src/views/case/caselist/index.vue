<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>接口管理</el-breadcrumb-item>
      <el-breadcrumb-item>用例列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <case-list />
    </el-card>
  </div>
</template>
<script>
import CaseList from './components/CaesList'
export default {
  components: {
    CaseList
  }
}
</script>
<style  lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
