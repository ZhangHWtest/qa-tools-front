<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用例管理</el-breadcrumb-item>
      <el-breadcrumb-item>用例详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <basic-information :interfaceInfo="interfaceInfo"
                         :key="index" />
      <div>
        <h2 class="interface-title-style">case基本信息:</h2>
        <div class="interface-info">
          <!-- 内容主体区域-->
          <el-form ref="addFormRef"
                   :model="addCaseBody"
                   :rules="addRulesForm"
                   label-width="120px">
            <el-form-item label="选择环境："
                          class="addcase-form-envid"
                          prop="env_id">
              <el-select class="addcase-form-envid"
                         v-model="myEnvId"
                         placeholder="请选择环境：">
                <el-option v-for="item in envList"
                           :key="item.env_id"
                           :label="item.url"
                           :value="item.env_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称："
                          prop="case_name">
              <el-input v-model="addCaseBody.case_name"
                        placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input v-model="addCaseBody.case_desc"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <h2 class="interface-title-style">请求参数:</h2>
        <div class="interface-info-params">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple">Params:</div>
              <json-editor v-model="myParam" />
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">Header:</div>
              <json-editor v-model="myHeader" />
            </el-col>
          </el-row>
        </div>
      </div>
      <div>
        <h2 class="interface-title-style">响应校验:</h2>
        <div class="interface-info">
          <!-- 内容主体区域-->
          <el-form ref="addFormRef"
                   :model="addCaseBody"
                   :rules="addRulesForm"
                   label-width="130px">
            <el-form-item label="匹配字段："
                          prop="res_assert">
              <el-input v-model="addCaseBody.res_assert"
                        placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="是否需要签名:"
                          prop="has_sign">
              <el-radio v-model="addCaseBody.has_sign"
                        :label="0">不需要</el-radio>
              <el-radio v-model="addCaseBody.has_sign"
                        :label="1">需要</el-radio>
            </el-form-item>
            <el-form-item label="ak"
                          v-show="addCaseBody.has_sign==0?false:true">
              <el-input v-model="addCaseBody.ak"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="sk"
                          v-show="addCaseBody.has_sign==0?false:true">
              <el-input v-model="addCaseBody.sk"
                        placeholder="请输入内容">
              </el-input>
            </el-form-item>
            <el-form-item label="是否存在依赖："
                          prop="has_rely">
              <el-radio v-model="addCaseBody.has_rely"
                        :label="0">无</el-radio>
              <el-radio v-model="addCaseBody.has_rely"
                        :label="1">存在</el-radio>
            </el-form-item>
            <el-form-item label="依赖case："
                          v-show="addCaseBody.has_rely==0?false:true">
              <el-input v-model="addCaseBody.rely_info"
                        type="textarea"
                        :rows="2"
                        placeholder='示例：[{"rely_case_id":1,"rely_param":"sso_token"}]'></el-input>
            </el-form-item>
            <el-form-item label="是否使用sql："
                          prop="use_db">
              <el-radio v-model="addCaseBody.use_db"
                        :label="0">不使用</el-radio>
              <el-radio v-model="addCaseBody.use_db"
                        :label="1">使用</el-radio>
            </el-form-item>
            <el-form-item label="sql："
                          v-show="addCaseBody.use_db==0?false:true">
              <el-input v-model="addCaseBody.sql"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="sql比对值："
                          v-show="addCaseBody.use_db==0?false:true">
              <el-input v-model="addCaseBody.field_value"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="是否有输出参数:"
                          prop="has_output">
              <el-radio v-model="addCaseBody.has_output"
                        :label="0">无</el-radio>
              <el-radio v-model="addCaseBody.has_output"
                        :label="1">有</el-radio>
            </el-form-item>
            <el-form-item label="参数名称"
                          v-show="addCaseBody.has_output==0?false:true">
              <el-input v-model="addCaseBody.output_para"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="是否有入参参数:"
                          prop="has_input">
              <el-radio v-model="addCaseBody.has_input"
                        :label="0">无</el-radio>
              <el-radio v-model="addCaseBody.has_input"
                        :label="1">有</el-radio>
            </el-form-item>
            <el-form-item label="入参param名称："
                          v-show="addCaseBody.has_input==0?false:true">
              <el-input v-model="addCaseBody.input_para"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 依赖头-->
            <el-form-item label="入参header名称:"
                          v-show="addCaseBody.has_input==0?false:true">
              <el-input v-model="addCaseBody.input_header"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- <el-form-item label="保存结果：">
              <el-switch class="interface-info-switch"
                         style="display: block"
                         v-model="mySaveResult"
                         active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </el-form-item> -->
          </el-form>
        </div>
      </div>
      <!-- <result-verification /> -->
    </el-card>
    <el-card class="footer-card">
      <div class="footer-button">
        <el-button @click="goCaseList()">取 消</el-button>
        <el-button type="success"
                   @click="selectCaseMethod ()">提 交</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import JsonEditor from '@/components/JsonEditor'
import BasicInformation from './components/BasicInformation'
export default {
  components: {
    BasicInformation,
    JsonEditor
  },
  data () {
    return {
      getInterfaceInfo: {
        interface_id: ''
      },
      interfaceInfo: {},
      addCaseBody: {
        interface_id: '',
        case_type: '',
        method: '',
        path: '',
        env_id: '',
        case_name: '',
        case_desc: '',
        params: {},
        header: {},
        // ---分割---
        has_sign: 1, // 是否需要签名 0需要 1不需要
        ak: '',
        sk: '',
        // ---分割---
        res_assert: '{"code":1}', // 校验  必填
        has_rely: 0, // 是否有依赖 默认0
        rely_info: '', // 依赖用例详情
        save_result: 1, // 保存结果 默认0
        use_db: 0, // 是否使用sql校验 默认0
        sql: '',
        field_value: '', // sql校验的至
        // ---分割---
        has_output: 0, // 是否有输出参数 默认0：无
        output_para: '', // 输出参数名称
        has_input: 0, // 是否有输入参数
        input_para: '', // 输入参数名称
        input_header: '' // 输入头
      },
      getEnvBody: {
      },
      envList: [],
      addRulesForm: {
        env_id: [
          { required: true, message: '请选择运行环境', trigger: 'blur' }
        ],
        case_name: [
          { required: true, message: '请输入用例名', trigger: 'blur' }
        ],
        res_assert: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        has_rely: [
          { required: true }
        ],
        use_db: [
          { required: true }
        ],
        has_output: [
          { required: true }
        ],
        has_input: [
          { required: true }
        ],
        has_sign: [
          { required: true }
        ]
      },
      myParam: {},
      myHeader: {},
      mySaveResult: false,
      myEnvId: '',
      getCaseInfoBody: {
        case_id: ''
      },
      index: 0
    }
  },
  created () {
    this.getEnvListMethod()
    this.getInterfaceInfo.interface_id = Number(this.$route.query.interId)
    if (this.$route.query.interId) {
      this.getInterfaceInfoMethod()
    } else {
      this.getCaseInfoMethod()
    }
  },
  methods: {
    async getEnvListMethod () {
      const { data: responseBody } = await this.$api.environment.getEnvironmentList(
        this.getEnvBody
      )
      if (responseBody.code === 1) {
        this.envList = responseBody.data
      } else {
        this.$message.error('请求环境信息失败！')
      }
    },
    async getInterfaceInfoMethod () {
      const { data: res } = await this.$api.myinterface.getInterfaceInfoMethod(
        this.getInterfaceInfo
      )
      if (res.code !== 1) {
        return this.$message.error('获取接口列表失败！')
      }
      this.interfaceInfo = res.data
      this.interfaceInfo.params.forEach(item => {
        this.$set(this.myParam, item.param_name, item.default)
      })
      // this.myHeader = JSON.stringify(this.interfaceInfo.header)
      this.myHeader = this.interfaceInfo.header
      // console.log(this.myHeader)
    },
    selectCaseMethod () {
      if (this.$route.query.interId) {
        this.addCaseMethod()
      } else {
        this.editCaseMethod()
      }
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addCaseMethod () {
      this.addCaseBody.interface_id = Number(this.$route.query.interId)
      this.addCaseBody.case_type = this.interfaceInfo.interface_type
      this.addCaseBody.method = this.interfaceInfo.method
      this.addCaseBody.path = this.interfaceInfo.path
      // if (this.myParam !== '{}') {
      //   this.addCaseBody.params = JSON.stringify(JSON.parse(this.myParam))
      // }
      // this.addCaseBody.params = '{}'
      this.addCaseBody.params = JSON.stringify(JSON.parse(this.myParam))
      // if (this.myHeader !== '{}') {
      //   this.addCaseBody.header = JSON.stringify(JSON.parse(this.myHeader))
      // }
      // this.addCaseBody.header = '{}'
      console.log('add', this.myHeader)
      this.addCaseBody.header = JSON.stringify(JSON.parse(this.myHeader))
      this.addCaseBody.env_id = this.myEnvId
      if (this.mySaveResult) {
        this.addCaseBody.save_result = 1
      } else {
        this.addCaseBody.save_result = 0
      }
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查填写信息！')
        } else {
          const { data: res } = await this.$api.testcase.addCase(
            this.addCaseBody
          )
          if (res.code !== 1) {
            return this.$message.error('添加用例失败！')
          }
          this.$message.success('添加用例成功！')
          this.goCaseList()
        }
      })
    },
    async getCaseInfoMethod () {
      this.getCaseInfoBody.case_id = Number(this.$route.query.caseId)
      const { data: res } = await this.$api.testcase.getCaseInfo(
        this.getCaseInfoBody
      )
      if (res.code !== 1) {
        return this.$message.error('获取用例详情失败！')
      }
      this.addCaseBody = res.data
      this.interfaceInfo.interface_name = this.addCaseBody.interface_name
      this.interfaceInfo.interface_type = this.addCaseBody.case_type
      this.interfaceInfo.method = this.addCaseBody.method
      this.interfaceInfo.path = this.addCaseBody.path
      this.index += 1
      this.myParam = JSON.parse(this.addCaseBody.params)
      this.myHeader = JSON.parse(this.addCaseBody.header)
      // JSON.parse(this.myHeader) 将jason转换成对象
      // JSON.stringify 将对象转换为 JSON。
      console.log('getCase0', this.addCaseBody.header)
      console.log('getCase', this.myHeader)
      this.myEnvId = this.addCaseBody.env_info.env_id
    },
    async editCaseMethod () {
      this.addCaseBody.params = JSON.stringify(JSON.parse(this.myParam))
      this.addCaseBody.header = JSON.stringify(JSON.parse(this.myHeader))
      console.log('editCase', this.myHeader, '-------', this.addCaseBody.header)
      this.addCaseBody.env_id = this.myEnvId
      delete this.addCaseBody.project_name
      delete this.addCaseBody.model_name
      delete this.addCaseBody.interface_name
      delete this.addCaseBody.is_debug
      delete this.addCaseBody.is_pass
      delete this.addCaseBody.create_user
      delete this.addCaseBody.env_info
      // console.log(this.addCaseBody)
      const { data: res } = await this.$api.testcase.editCase(
        this.addCaseBody
      )
      if (res.code !== 1) {
        return this.$message.error('修改失败！')
      }
      this.$message.success('修改用例成功！')
      this.goCaseList()
    },
    goCaseList () {
      this.$router.push({ path: '/caselist' })
    }
  }
}
</script>
<style lang="less" scoped>
.el-radio {
  margin-right: 20px;
  .el-radio__label {
    padding-left: 5px;
  }
}
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.interface-info {
  width: 75%;
  margin-left: 50px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
  .interface-info-button {
    text-align: center;
  }
}
.interface-info-params {
  width: 85%;
  margin-left: 50px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eee;
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.footer-card {
  background-color: #373d41;
  position: fixed;
  z-index: 100;
  bottom: 5px;
  width: 83%;
  height: 50px;
}
.footer-button {
  position: absolute;
  left: 50%;
  transform: translate(-90%, -15%);
}
.addcase-form-envid {
  width: 350px;
}
.interface-info-switch {
  line-height: 40px;
}
</style>
