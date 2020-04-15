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
        <seacha-interface :projectList="projectList"
                          :modelList="modelList"
                          @listenChildSelectProject="changeProjectIdMethod"
                          @listenChildSelectModel="changeModelIdMethod" />
        <el-divider></el-divider>
        <interface-table :interfaceList="interfaceList"
                         @listenChildPageNum="changeInterfacePageNum"
                         @listenChildRemove="interfaceListMethod()" />
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
      projectList: [],
      modelList: [],
      interfaceList: [],
      getProjectListBody: {},
      getModelListBody: {
        project_id: ''
      },
      getInterfaceListBody: {
        project_id: '',
        model_id: '',
        page_num: 1
      }

    }
  },
  created () {
    this.getProjectListMethod()
    this.interfaceListMethod()
  },
  methods: {
    changeProjectIdMethod (projectId) {
      this.getInterfaceListBody.project_id = projectId
      this.getModelListBody.project_id = projectId
      this.getModelListMethod()
      this.interfaceListMethod()
    },
    changeModelIdMethod (projectId, modelId) {
      this.getInterfaceListBody.project_id = projectId
      this.getInterfaceListBody.model_id = modelId
      this.interfaceListMethod()
    },
    changeInterfacePageNum (pageNum) {
      this.getInterfaceListBody.page_num = pageNum
      this.interfaceListMethod()
    },
    // 获取所有项目列表
    async getProjectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    },
    // 获取所有模块列表
    async getModelListMethod () {
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取模块列表失败！')
      }
      this.modelList = responseBody.data
    },
    // 获取接口列表方法
    async interfaceListMethod () {
      if (this.getInterfaceListBody.project_id === '') {
        delete this.getInterfaceListBody.project_id
      }
      if (this.getInterfaceListBody.model_id === '') {
        delete this.getInterfaceListBody.model_id
      }
      const { data: responseBody } = await this.$api.myinterface.getInterfaceList(
        this.getInterfaceListBody
      )
      if (responseBody.code === 1) {
        this.interfaceList = responseBody.data
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
