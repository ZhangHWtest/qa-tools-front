<template>
  <div>
    <div class="interface-top-select">
      <span class="interface-top-select-name">项目/模块：</span>
      <el-cascader v-model="myProModelValue"
                   :options="myProModelOptions"
                   :props="{ checkStrictly: true }"
                   @change="handleChange"></el-cascader>
      <el-button type="primary"
                 plain
                 @click="getInterfaceListMethod()">查询</el-button>
      <el-button plain
                 @click="clearProjectAndModel()">重置</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShowInterFaceSelect: false,
      myProModelOptions: [{
        value: '1',
        label: '1',
        children: [{
          value: '1-1',
          label: '1-1'
        }]
      }],
      myProModelValue: '',
      projectList: [],
      modelList: [],
      // ---分割---
      getProjectListBody: {},
      getModelListBody: {
        project_id: ''
      }

    }
  },
  created () {
    // this.getProjectListMethod()
    // if (this.isShowInterFaceSelect) {
    //   this.getInterfaceListMethod()
    // }
  },
  methods: {
    handleChange (value) {
      console.log(value)
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
      this.projectList.forEach(item => {
        this.$set(this.myProModelOptions, item.project_id, { 'value': item.project_id, 'label': item.project_name, 'children': [] })
      })
    },
    // 获取所有模块列表
    async getModelListMethod (value) {
      if (this.projectValue) {
        this.getModelListBody.project_id = Number(sessionStorage.getItem('projectId'))
      }
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取模块列表失败！')
      }
      this.modelList = responseBody.data
      let children = []
      this.modelList.forEach(item => {
        // console.log(this.options[value])
        children.push({
          value: item.model_id, label: item.model_name
        })
      })
      this.$set(this.myProModelOptions, value, { ...this.myProModelOptions[value], children })
    },
    // 获取接口列表方法
    async getInterfaceListMethod () {
      if (!this.projectValue) {
        delete this.getInterfaceListBody.project_id
        this.buttonDisabled = true
      } else {
        this.getInterfaceListBody.project_id = Number(sessionStorage.getItem('projectId'))
        this.projectList.forEach(item => {
          if (item.project_id === this.projectValue) {
            sessionStorage.setItem('projectId', item.project_id)
            sessionStorage.setItem('projectName', item.project_name)
          }
        })
        this.buttonDisabled = false
      }
      if (!this.modelValue) {
        delete this.getInterfaceListBody.model_id
      } else {
        this.getInterfaceListBody.model_id = Number(sessionStorage.getItem('modelId'))
        this.modelList.forEach(item => {
          if (item.model_id === this.modelValue) {
            sessionStorage.setItem('modelId', this.modelValue)
            sessionStorage.setItem('modelName', item.model_name)
          }
        })
      }
      const { data: responseBody } = await this.$api.myinterface.getInterfaceList(
        this.getInterfaceListBody
      )
      if (responseBody.code === 1) {
        this.interfaceList = responseBody.data
        this.interfaceListTotal = responseBody.page_total_num * 10
      }
    }
  }

}
</script>
<style lang="less" scoped >
.interface-top-select-name {
  font-size: 15px;
  color: rgba(39, 56, 72, 0.85);
}
.interfacelist-top-select {
  padding-right: 15px;
  width: 200px;
}
</style>
