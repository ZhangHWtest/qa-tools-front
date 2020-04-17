<template>
  <div>
    <el-col class="index-aside-one">
      <h2 class="index-aside-one-title">{{projectName}}</h2>
      <p style="color: #9297A3">简介：</p>
    </el-col>
    <el-col class="index-aside-two">
      <el-menu class="el-menu-vertical-demo"
               :unique-opened="true"
               @open="handleOpen"
               @close="handleClose">
        <el-submenu v-for="(item) in projectList"
                    :key="item.project_name"
                    :index="item.project_id + ''">
          <template slot="title">
            <i class="el-icon-folder-opened"></i>
            <span class="sider-bar-title">{{ item.project_id  + item.project_name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item v-for="subItem in item.subList"
                        :key="subItem.model_name"
                        :index="subItem.model_id + ''"
                        @click="getInterfaceList(item.project_id,subItem.model_id)">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span class="sider-bar-title">{{ subItem.model_name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
  props: [
    'interfaceList'
  ],
  data () {
    return {
      projectName: '项目列表',
      getProjectListBody: {
        page_num: 1
      },
      getModelListBody: {
        project_id: ''
      },
      getInterfaceListBody: {
        project_id: '',
        model_id: ''
      },
      projectList: [],
      modelList: [],
      childInterfaceList: []
    }
  },
  created () {
    this.gePprojectListMethod()
  },
  methods: {
    handleOpen (key) {
      console.log(key)
      this.modelList = []
      this.getModelListBody.project_id = Number(key)
      this.getInterfaceListBody.project_id = Number(key)
      this.getModelListMethod(key)
      this.getInterfaceListMethod()
    },
    handleClose () {
    },
    getInterfaceList (projectId, modelId) {
      this.getInterfaceListBody.project_id = projectId
      this.getInterfaceListBody.model_id = modelId
      this.getInterfaceListMethod()
    },
    // 获取所有项目列表
    async gePprojectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data.map(item => {
        item.subList = []
        return item
      })
      console.log(this.projectList)
    },
    // 获取所有模块列表
    async getModelListMethod (key) {
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      let index = this.projectList.findIndex(item => Number(item.project_id) === Number(key))
      console.log(index, this.projectList, this.projectList[index])
      this.$set(this.projectList, index, { ...this.projectList[index], subList: responseBody.data })
      console.log(this.projectList)
    },
    // 获取接口列表方法
    async getInterfaceListMethod () {
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
        this.childInterfaceList = responseBody.data
        this.$emit('listenChildInterfaceList', this.childInterfaceList)
      }
    }
  }

}
</script>
<style lang="less" scoped>
.index-aside-one {
  height: 130px;
  background-color: #373d41;
  .index-aside-one-title {
    color: #fff;
  }
}
.index-aside-two {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 1px;
}
.el-menu-item.is-active {
  border-right: 2px solid #409eff;
}
</style>
