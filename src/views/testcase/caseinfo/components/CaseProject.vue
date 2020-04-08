<template>
  <!-- 基本信息区域-->
  <el-card>
    <h2 class="case-title-style">基本信息:</h2>
    <div class="case-info">
      <el-form ref="addFormRef"
               :model="createCaseBody"
               :rules="addRulesForm"
               label-width="100px">
        <el-form-item label="项目名称:"
                      prop="project_name"
                      v-show="formProjectAndModel">
          <el-select v-model="projectList.project_id"
                     placeholder="请选择项目"
                     @change="getModelListmethod(projectList.project_id)">
            <el-option v-for="item in projectList"
                       :key="item.project_id"
                       :label="item.project_name"
                       :value="item.project_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块名称:"
                      v-show="formProjectAndModel">
          <el-select v-model="modelList.model_id"
                     placeholder="请选择模块"
                     @change="getInterfaceListmethod(modelList.model_id)">
            <el-option v-for="item in modelList.list"
                       :key="item.model_id"
                       :label="item.model_name"
                       :value="item.model_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口名称:"
                      prop="interface_name"
                      v-show="formProjectAndModel">
          <el-select v-model="interfaceList.interface_id"
                     placeholder="请选择接口"
                     @change="getInterfacemethod(interfaceList.interface_id)">
            <el-option v-for="item in interfaceList"
                       :key="item.interface_id"
                       :label="item.interface_name"
                       :value="item.interface_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择环境:"
                      prop="env_name">
          <el-select v-model="envList.env_id"
                     placeholder="选择环境"
                     @change="getEnvmethod(envList.env_id)">
            <el-option v-for="item in envList"
                       :key="item.env_id"
                       :label="item.env_name"
                       :value="item.env_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用例名称:"
                      prop="case_name">
          <el-input class="project_name_input"
                    placeholder="请输入用例名称"
                    v-model="createCaseBody.case_name"></el-input>
        </el-form-item>
        <el-form-item label="地址:"
                      prop="path">
          <el-input placeholder="路径："
                    v-model="createCaseBody.path"
                    class="input-with-select">
            <el-select class="caseInfo-select"
                       v-model="createCaseBody.case_type"
                       slot="prepend"
                       placeholder="类型">
              <el-option label="http"
                         value="http"></el-option>
              <el-option label="https"
                         value="https"></el-option>
            </el-select>
            <el-select class="caseInfo-select"
                       v-model="createCaseBody.method"
                       slot="prepend"
                       placeholder="方法">
              <el-option label="GET"
                         value="GET"></el-option>
              <el-option label="POST"
                         value="POST"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="结果断言:"
                      prop="res_assert">
          <el-input v-model="createCaseBody.res_assert"
                    placeholder="请输入验证的断言"></el-input>
        </el-form-item>
        <el-form-item label="执行结果:"
                      prop="save_result">
          <el-radio v-model="createCaseBody.save_result"
                    label="1">保存</el-radio>
          <el-radio v-model="createCaseBody.save_result"
                    label="0">不保存</el-radio>
        </el-form-item>
        <el-form-item label="用例描述:">
          <el-input class="project_name_input"
                    type="textarea"
                    placeholder="请输入描述信息"
                    v-model="createCaseBody.case_desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  props: [
    'createCaseBody',
    'addRulesForm'

  ],
  data () {
    return {

      getProjectListBody: {},
      getModelListBody: {
        project_id: ''
      },
      getInterfaceListBody: {
        project_id: '',
        model_id: ''
      },
      getEnvListBody: {
      },
      projectList: {
        project_id: '',
        project_name: ''
      },
      modelList: {
        model_id: '',
        model_name: '',
        list: []
      },
      interfaceList: [],
      envList: {},
      formProjectAndModel: true

    }
  },
  created () {
    if (window.sessionStorage.getItem('case_id')) {
      this.formProjectAndModel = false
    } else {
      // 获取所有project
      this.getProjectListMethod()
      this.getEnvListmethod()
    }
  },
  methods: {
    // 进入页面获取所有项目
    async getProjectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    },
    // 根据项目id获取所有模块
    async getModelListmethod (id) {
      this.$emit('listenToChildProjectId', id)
      this.getModelListBody.project_id = id
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取模块列表失败！')
      }
      this.modelList.list = responseBody.data
    },
    // 根据项目id和模块id获取接口
    async getInterfaceListmethod (id) {
      this.$emit('listenToChildModelId', id)
      this.getInterfaceListBody.project_id = this.getModelListBody.project_id
      this.getInterfaceListBody.model_id = id
      const { data: responseBody } = await this.$api.myinterface.getInterfaceList(
        this.getInterfaceListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取接口列表失败！')
      }
      this.interfaceList = responseBody.data
    },
    getInterfacemethod (id) {
      this.$emit('listenToChildInterfaceId', id)
    },
    getEnvmethod (id) {
      this.$emit('listenToChildEnvId', id)
    },
    // 获取所有环境
    async getEnvListmethod () {
      if (window.sessionStorage.getItem('case_id')) {
        this.envList.push(this.createCaseBody.env_info)
        console.log(this.props)
      } else {
        const { data: responseBody } = await this.$api.environment.getEnvironmentList(
          this.getEnvListBody
        )
        if (responseBody.code !== 1) {
          return this.$message.error('获取接口列表失败！')
        }
        this.envList = responseBody.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
.case-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.case-info {
  width: 65%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
}
.caseInfo-select {
  width: 90px;
  margin-left: 5px;
}
</style>
