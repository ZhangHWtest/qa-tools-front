<template>
  <div class="main-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>任务日志</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
</style>
