<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>接口列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域-->
    <el-card>
      <div>
        <SeachaInterface />
        <InterfaceTable />
      </div>
    </el-card>
  </div>
</template>

<script>
import InterfaceTable from './components/InterfaceTable'
import SeachaInterface from './components/searchInterface'

export default {
  name: 'MonitorList',
  components: {
    InterfaceTable,
    SeachaInterface
  },
  data () {
    return {

    }
  },
  mounted () { },
  methods: {
  }
}
</script>

<style lang="less" scoped></style>
