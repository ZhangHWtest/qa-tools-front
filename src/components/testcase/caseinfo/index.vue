<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/case/list' }">用例列表</el-breadcrumb-item>
      <el-breadcrumb-item>用例详情</el-breadcrumb-item>
    </el-breadcrumb>
    <case-project :createCaseBody="createCaseBody"
                  :addRulesForm="addRulesForm"
                  @listenToChildProjectId="getModelListmethod"
                  @listenToChildModelId="getInterfaceListmethod"
                  @listenToChildInterfaceId="getInterfacemethod"
                  @listenToChildEnvId="getEnvmethod" />
    <case-basic :createCaseBody="createCaseBody" />
    <case-result-check :createCaseBody="createCaseBody"
                       :addRulesForm="addRulesForm" />
    <el-card class="footer-card">
      <div class="footer-button">
        <el-button @click="goCaseList()">取 消</el-button>
        <el-button type="success"
                   @click="addCaseMethod ()">提 交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import CaseProject from './components/CaseProject'
import CaseBasic from './components/CaseBasic'
import CaseResultCheck from './components/CaseResultCheck'
export default {
  components: {
    CaseProject,
    CaseBasic,
    CaseResultCheck
  },
  data () {
    return {
      createCaseBody: {
        project_id: '',
        model_id: '',
        interface_id: '',
        env_id: '',
        case_name: '',
        case_desc: '',
        case_type: 'http',
        method: 'GET',
        path: '',
        params: '',
        header: '',
        res_assert: '',
        has_rely: 0,
        rely_info: '',
        save_result: 1,
        use_db: 0,
        sql: '',
        field_value: 0
      },
      getCaseInfoBody: {
        case_id: ''
      },
      addRulesForm: {
        project_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ],
        interface_name: [
          { required: true, message: '请输入接口名', trigger: 'blur' }
        ],
        env_name: [
          { required: true, message: '请输入环境名', trigger: 'blur' }
        ],
        case_name: [
          { required: true, message: '请输入用例', trigger: 'blur' }
        ],
        interface_type: [
          { required: true, trigger: 'blur' }
        ],
        method: [
          { required: true, trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路径', trigger: 'blur' }
        ],
        res_assert: [
          { required: true, message: '请输入结果断言', trigger: 'blur' }
        ],
        save_result: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem('case_id')) {
      this.getCaseInfoBody.case_id = window.sessionStorage.getItem('case_id')
      // 修改的话获取当前interface详情
      this.getcaseInfoMethod()
    }
  },
  methods: {
    getModelListmethod (id) {
      this.createCaseBody.project_id = id
    },
    getInterfaceListmethod (id) {
      this.createCaseBody.model_id = id
    },
    getInterfacemethod (id) {
      this.createCaseBody.interface_id = id
    },
    getEnvmethod (id) {
      this.createCaseBody.env_id = id
    },
    // 获取caseInfo
    async getcaseInfoMethod () {
      const { data: responseBody } = await this.$api.testcase.getCaseInfo(
        this.getCaseInfoBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取接口列表失败！')
      }
      this.createCaseBody = responseBody.data
      // this.createCaseBody.env_id = responseBody.data.env_info.env_id
    },
    async addCaseMethod () {
      if (!window.sessionStorage.getItem('case_id')) {
        const { data: res } = await this.$api.testcase.addCase(
          this.createCaseBody
        )
        if (res.code !== 1) {
          return this.$message.error('添加用例失败！')
        }
        this.$message.success('添加用例成功！')
      } else {
        const { data: res } = await this.$api.testcase.editCase(
          this.createCaseBody
        )
        if (res.code !== 1) {
          return this.$message.error('添修改用例失败！')
        }
        this.$message.success('修改用例成功！')
      }
      this.goCaseList()
    },
    goCaseList () {
      this.$router.push({ path: '/case/list' })
    }
  }
}
</script>
<style lang="less" scoped>
.footer-button {
  position: absolute;
  left: 50%;
  transform: translate(-90%, -15%);
}
.footer-card {
  background-color: #373d41;
  position: fixed;
  z-index: 100;
  bottom: 5px;
  width: 83%;
  height: 50px;
}
</style>
