<template>
  <div class="top-select">
    <span class="top-select-name">项目/模块：</span>
    <el-cascader class="top-pro-cascader"
                 v-model="myProModelValue"
                 :options="myProModelOptions"
                 :props="{ checkStrictly: true }"
                 @change="handleChange"></el-cascader>
    <span class="top-select-name"
          v-show="isShowInterFaceSelect">接口：</span>
    <el-select class="top-interface-select"
               v-model="interfaceValue"
               v-show="isShowInterFaceSelect"
               placeholder="请选择"
               @change="changeInterfaceValue">
      <el-option v-for="item in interfaceList"
                 :key="item.interface_id"
                 :label="item.interface_name"
                 :value="item.interface_id">
      </el-option>
    </el-select>

    <el-button class="top-select-button"
               v-show="isShowSeachButton"
               type="primary"
               plain
               @click="changeChildValue()">查询</el-button>
    <el-button v-show="isShowSeachButton"
               plain
               @click="clearProjectAndModel()">重置</el-button>

  </div>
</template>
<script>
export default {
  props: ['parentIsShowInterfaceSelect', 'parentIsShowSeachButton'],
  data () {
    return {
      isShowInterFaceSelect: true,
      isShowSeachButton: true,
      myProModelOptions: [],
      myProModelValue: [],
      projectList: [],
      modelList: [],
      // ---分割---
      getProjectListBody: {},
      getModelListBody: {
        project_id: ''
      },
      // -----分割-----
      getInterfaceListBody: {
        project_id: '',
        model_id: ''
      },
      interfaceList: [],
      interfaceValue: '',
      getInterfaceInfo: {
        interface_id: ''
      }
    }
  },
  created () {
    this.getProjectListMethod()
    this.isShowInterFaceSelect = this.parentIsShowInterfaceSelect
    if (this.parentIsShowSeachButton === false) {
      console.log(this.parentIsShowSeachButton)
      this.isShowSeachButton = this.parentIsShowSeachButton
    }

    if (this.isShowInterFaceSelect) {
      this.getInterfaceListMethod()
      if (sessionStorage.getItem('interId')) {
        this.interfaceValue = Number(sessionStorage.getItem('interId'))
        // this.getInterfaceInfo(Number(sessionStorage.getItem('interId')))
      }
    }
    if (sessionStorage.getItem('projectId')) {
      let projectId = Number(sessionStorage.getItem('projectId'))
      this.myProModelValue.push(projectId)
      if (sessionStorage.getItem('modelId')) {
        this.getModelListMethod()
        let modelId = Number(sessionStorage.getItem('modelId'))
        this.myProModelValue.push(modelId)
      }
    }
    // console.log('sessionMPMI', this.myProModelValue)
  },
  mounted () {
    // 点击文本就让它自动点击前面的input就可以触发选择。但是因组件阻止了冒泡，暂时想不到好方法来触发。
    // 这种比较耗性能，暂时想不到其他的，能实现效果了。
    setInterval(function () {
      document.querySelectorAll('.el-cascader-node__label').forEach(el => {
        el.onclick = function () {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
  },
  methods: {
    handleChange (value) {
      console.log('myProModelValue', this.myProModelValue)
      if (value.length === 1) {
        this.projectList.forEach(item => {
          if (item.project_id === value[0]) {
            sessionStorage.setItem('projectId', value[0])
            sessionStorage.setItem('projectName', item.project_name)
            sessionStorage.removeItem('modelId')
            sessionStorage.removeItem('modelName')
          }
        })
        this.getModelListMethod()
      } else {
        this.modelList.forEach(item => {
          if (item.model_id === value[1]) {
            sessionStorage.setItem('modelId', value[1])
            sessionStorage.setItem('modelName', item.model_name)
          }
        })
      }
      this.getInterfaceListMethod()
    },
    changeInterfaceValue (value) {
      // console.log('changeInterfaceValue:', value)
      this.getInterfaceInfoMethod(value)
    },
    changeChildValue () {
      this.$emit('changeChildValueMethod', 'change')
    },
    clearProjectAndModel () {
      sessionStorage.removeItem('modelId')
      sessionStorage.removeItem('modelName')
      sessionStorage.removeItem('projectId')
      sessionStorage.removeItem('projectName')
      sessionStorage.removeItem('interId')
      sessionStorage.removeItem('interName')
      this.$emit('changeChildValueMethod', 'change')
      this.myProModelValue = ''
      this.interfaceValue = ''
      this.getInterfaceListMethod()
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
    async getModelListMethod () {
      let value = Number(sessionStorage.getItem('projectId'))
      this.getModelListBody.project_id = value
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
      let sProjectId = Number(sessionStorage.getItem('projectId'))
      let sModelId = Number(sessionStorage.getItem('modelId'))
      if (!sProjectId) {
        delete this.getInterfaceListBody.project_id
        this.buttonDisabled = true
      } else {
        this.getInterfaceListBody.project_id = sProjectId
        this.projectList.forEach(item => {
          if (item.project_id === this.projectValue) {
            sessionStorage.setItem('projectId', item.project_id)
            sessionStorage.setItem('projectName', item.project_name)
          }
        })
        this.buttonDisabled = false
      }
      if (!sModelId) {
        delete this.getInterfaceListBody.model_id
      } else {
        this.getInterfaceListBody.model_id = sModelId
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
    },
    async getInterfaceInfoMethod (val) {
      this.getInterfaceInfo.interface_id = Number(val)
      const { data: res } = await this.$api.myinterface.getInterfaceInfoMethod(
        this.getInterfaceInfo
      )
      if (res.code !== 1) {
        return this.$message.error('获取接口列表失败！')
      }
      sessionStorage.setItem('interId', val)
      sessionStorage.setItem('interName', res.data.interface_name)
    }
  }

}
</script>
<style lang="less">
.top-select {
  margin: 10px 10px 10px 10px;
  padding-left: 10px;
  .top-select-name {
    margin-left: 10px;
    font-size: 15px;
    color: rgba(39, 56, 72, 0.85);
  }
  .top-pro-cascader {
    width: 270px;
  }
  .top-select-button {
    margin-left: 10px;
  }
}
.el-cascader-panel .el-radio__input {
  visibility: hidden;
}
.el-cascader-node {
  padding: 0 30px 0 0px;
}
</style>
