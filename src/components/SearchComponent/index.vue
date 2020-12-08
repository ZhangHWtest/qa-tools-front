<template>
  <div class="top-select">
    <div v-show="isShowInput">
      <span class="top-select-name">名称：</span>
      <el-input
        v-model="inputName"
        class="top-input_name"
        placeholder="请输入"
        @change="changeInputName"
      />
    </div>
    <div v-show="isShowProModCascader">
      <span class="top-select-name">项目/模块：</span>
      <el-cascader
        v-model="myProModelValue"
        class="top-pro-cascader"
        :options="myProModelOptions"
        :props="{ checkStrictly: true }"
        @change="handleChange"
      />
    </div>
    <div v-show="isShowInterFaceSelect">
      <span
        class="top-select-name"
      >接口：</span>
      <el-select
        v-model="interfaceValue"
        class="top-interface-select"
        placeholder="请选择"
        @change="changeInterfaceValue"
      >
        <el-option
          v-for="item in interfaceList"
          :key="item.interface_id"
          :label="item.interface_name"
          :value="item.interface_id"
        />
      </el-select>
    </div>
    <div v-show="isShowProjectSelect">
      <span
        class="top-select-only-project"
      >选择项目：</span>
      <el-select
        v-model="myProModelValue"
        class="top-interface-select"
        placeholder="请选择"
        clearable
        @change="changeProjectValue"
        @clear="clearProjectAndModel()"
      >
        <el-option
          v-for="item in projectList"
          :key="item.project_id"
          :label="item.project_name"
          :value="item.project_id"
        />
      </el-select>
    </div>
    <div v-show="isShowSeachButton">
      <el-button
        class="top-select-button"
        type="primary"
        plain
        @click="changeChildValue()"
      >查询</el-button>
      <el-button plain @click="clearProjectAndModel()">重置</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    subArr: { type: Array, required: true }
  },
  data() {
    return {
      // 是否显示组件
      isShowInput: false,
      inputName: '',
      isShowProModCascader: false,
      isShowInterFaceSelect: false,
      isShowSeachButton: false,
      isShowProjectSelect: false,

      // ---------------------
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
  created() {
    this.getProjectListMethod()
    if (this.subArr.indexOf('inputName') !== -1) {
      this.isShowInput = true
      this.inputName = sessionStorage.getItem('inputName')
    }
    if (this.subArr.indexOf('proModCascader') !== -1) {
      this.isShowProModCascader = true
      const projectId = Number(sessionStorage.getItem('projectId'))
      this.myProModelValue.push(projectId)
      if (sessionStorage.getItem('modelId')) {
        this.getModelListMethod()
        const modelId = Number(sessionStorage.getItem('modelId'))
        this.myProModelValue.push(modelId)
      }
    }
    if (this.subArr.indexOf('interFaceSelect') !== -1) {
      this.isShowInterFaceSelect = true
      this.getInterfaceListMethod()
      if (sessionStorage.getItem('interId')) {
        this.interfaceValue = Number(sessionStorage.getItem('interId'))
        // this.getInterfaceInfo(Number(sessionStorage.getItem('interId')))
      }
    }
    if (this.subArr.indexOf('seachButton') !== -1) {
      this.isShowSeachButton = true
    }
    if (this.subArr.indexOf('projectSelect') !== -1) {
      this.isShowProjectSelect = true
    }
  },
  mounted() {
    // 点击文本就让它自动点击前面的input就可以触发选择。但是因组件阻止了冒泡，暂时想不到好方法来触发。
    // 这种比较耗性能，暂时想不到其他的，能实现效果了。
    setInterval(function() {
      document.querySelectorAll('.el-cascader-node__label').forEach(el => {
        el.onclick = function() {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
  },
  methods: {
    handleChange(value) {
      // console.log('myProModelValue', this.myProModelValue)
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
      if (this.isShowInterFaceSelect) {
        this.getInterfaceListMethod()
      }
    },
    changeInputName() {
      sessionStorage.setItem('inputKey', this.parentInputName)
      sessionStorage.setItem('inputName', this.inputName)
    },
    // 下拉框改变时
    changeInterfaceValue(value) {
      // console.log('changeInterfaceValue:', value)
      this.getInterfaceInfoMethod(value)
    },
    changeProjectValue(value) {
      this.projectList.forEach(item => {
        if (item.project_id === value) {
          sessionStorage.setItem('projectId', value)
          sessionStorage.setItem('projectName', item.project_name)
          sessionStorage.removeItem('modelId')
          sessionStorage.removeItem('modelName')
        }
      })
    },
    changeChildValue() {
      this.$emit('changeChildValueMethod', 'change')
    },
    clearProjectAndModel() {
      sessionStorage.removeItem('modelId')
      sessionStorage.removeItem('modelName')
      sessionStorage.removeItem('projectId')
      sessionStorage.removeItem('projectName')
      sessionStorage.removeItem('interId')
      sessionStorage.removeItem('interName')
      sessionStorage.removeItem('inputKey')
      sessionStorage.removeItem('inputName')
      this.$emit('changeChildValueMethod', 'change')
      this.myProModelValue = ''
      this.interfaceValue = ''
      this.inputName = ''
      if (this.isShowInterFaceSelect) {
        this.getInterfaceListMethod()
      }
    },
    // 获取所有项目列表
    async getProjectListMethod() {
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
    async getModelListMethod() {
      const value = Number(sessionStorage.getItem('projectId'))
      this.getModelListBody.project_id = value
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取模块列表失败！')
      }
      this.modelList = responseBody.data
      const children = []
      this.modelList.forEach(item => {
        // console.log(this.options[value])
        children.push({
          value: item.model_id, label: item.model_name
        })
      })
      this.$set(this.myProModelOptions, value, { ...this.myProModelOptions[value], children })
    },
    // 获取接口列表方法
    async getInterfaceListMethod() {
      const sProjectId = Number(sessionStorage.getItem('projectId'))
      const sModelId = Number(sessionStorage.getItem('modelId'))
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
    async getInterfaceInfoMethod(val) {
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
  display:flex;
  .top-input_name {
    width: 170px;
  }
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
  .top-select-only-project{
   margin-left: 20px;
  }
}
.el-cascader-panel .el-radio__input {
  visibility: hidden;
}
.el-cascader-node {
  padding: 0 30px 0 0px;
}
</style>
