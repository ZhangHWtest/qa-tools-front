<template>
  <div>
    <!-- 面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/interface/list' }">接口列表</el-breadcrumb-item>
      <el-breadcrumb-item>接口详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 基本信息区域-->
    <el-card>
      <h2 class="interface-title-style">基本信息:</h2>
      <div class="interface-info">
        <el-form ref="addFormRef"
                 :model="createInterfaceBody"
                 :rules="addRulesForm"
                 label-width="100px">
          <el-form-item label="项目名称:"
                        v-show="formProjectAndModel"
                        prop="project_name">
            <el-select v-model="projectList.project_id"
                       placeholder="请选择项目"
                       @change="addInterfaceGetModelList(projectList.project_id)">
              <el-option v-for="item in projectList"
                         :key="item.project_id"
                         :label="item.project_name"
                         :value="item.project_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名称:"
                        v-show="formProjectAndModel"
                        prop="model_name">
            <el-select v-model="modelList.model_id"
                       placeholder="请选择模块">
              <el-option v-for="item in modelList.list"
                         :key="item.model_id"
                         :label="item.model_name"
                         :value="item.model_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口名称:"
                        prop="interface_name">
            <el-input class="interface_name"
                      placeholder="请输接口名称"
                      v-model="createInterfaceBody.interface_name"></el-input>
          </el-form-item>

          <el-form-item label="接口类型:"
                        prop="interface_type">
            <el-select v-model="createInterfaceBody.interface_type"
                       placeholder="请选择接口类型">
              <el-option v-for="item in interface_type_options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求类型:"
                        prop="method">
            <el-select v-model="createInterfaceBody.method"
                       placeholder="请选择请求类型">
              <el-option v-for="item in method_options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求路径:"
                        prop="path">
            <el-input class="project_name_input"
                      placeholder="请输入请求路径"
                      v-model="createInterfaceBody.path"></el-input>
          </el-form-item>
          <el-form-item label="接口描述:">
            <el-input class="project_name_input"
                      type="textarea"
                      placeholder="请输入描述信息"
                      v-model="createInterfaceBody.interface_desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="goProject-dialog-footer-info-param">
          <el-tooltip class="item"
                      effect="dark"
                      content="提交"
                      placement="top">
            <el-button type="success"
                       icon="el-icon-plus"
                       size="small"
                       circle
                       v-show="createInterfaceButton"
                       @click="createInterface()"></el-button>
          </el-tooltip>
        </span>
      </div>
    </el-card>
    <el-card>
      <h2 class="interface-title-style">请求参数:</h2>
      <div class="interface-info">
        <el-tabs type="border-card">
          <el-tab-pane label="param">
            <div>
              <el-table border
                        :data="paramsList">
                <el-table-column label="参数id"
                                 prop="param_id"></el-table-column>
                <el-table-column label="参数名称"
                                 prop="param_name"></el-table-column>
                <el-table-column label="是否必填"
                                 prop="is_necessary">
                  <template slot-scope="scope">
                    <font v-if="scope.row.is_necessary === 0"
                          color="#67C23A">必需</font>
                    <font v-else
                          color="#F56C6C">非必需</font>
                  </template>
                </el-table-column>
                <el-table-column label="参数示例"
                                 prop="default"></el-table-column>
                <el-table-column label="备注"
                                 prop="param_desc"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-tooltip class="item"
                                effect="dark"
                                content="修改"
                                placement="top">
                      <el-button type="primary"
                                 icon="el-icon-edit"
                                 size="mini"
                                 ricon="el-icon-edit"
                                 circle
                                 @click="showEditInterfaceParamDialog(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item"
                                effect="dark"
                                content="删除"
                                placement="top">
                      <el-button type="danger"
                                 icon="el-icon-delete"
                                 size="mini"
                                 ricon="el-icon-edit"
                                 circle
                                 @click="removeInterfaceParamById(scope.row.param_id)"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
              <span slot="footer"
                    class="goProject-dialog-footer-info-param">
                <el-tooltip class="item"
                            effect="dark"
                            content="提交"
                            placement="top">
                  <el-button type="success"
                             icon="el-icon-plus"
                             size="small"
                             circle
                             @click="showCreateInterfaceParamDialog()"></el-button>
                </el-tooltip>
              </span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="header">
            <div>
              <el-input class="header_input"
                        type="textarea"
                        placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                        v-model="createHeader.header"></el-input>
              <span slot="footer"
                    class="goProject-dialog-footer-info-param">
                <el-tooltip class="item"
                            effect="dark"
                            content="提交"
                            placement="top">
                  <el-button type="success"
                             icon="el-icon-plus"
                             size="small"
                             circle
                             @click="createInterfaceHeader()"></el-button>
                </el-tooltip>
              </span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-card>
      <h2 class="interface-title-style">返回数据设置:</h2>
      <div class="interface-info">
        <el-tabs type="border-card">
          <el-tab-pane label="JSON">
            <div>
              <el-input class="interfaceinfo-response-json"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        placeholder='示例：{"test":1}'
                        v-model="createResponse.response">
              </el-input>
              <span slot="footer"
                    class="goProject-dialog-footer-info-param">
                <el-tooltip class="item"
                            effect="dark"
                            content="提交"
                            placement="top">
                  <el-button type="success"
                             icon="el-icon-plus"
                             size="small"
                             circle
                             @click="createInterfaceResponse()"></el-button>
                </el-tooltip>
              </span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

    <el-card>
      <el-button class="goInterfaceList-button"
                 @click="goInterfaceList()">返 回</el-button>
    </el-card>
    <!-- 添加接口对话框-->
    <el-dialog title="添加接口参数"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="createParams"
               label-width="70px">
        <el-form-item label="参数名称">
          <el-input v-model="createParams.param_name"></el-input>
        </el-form-item>
        <el-form-item label="是否必需">
          <template>
            <el-radio v-model="createParams.is_necessary"
                      label="0">必需</el-radio>
            <el-radio v-model="createParams.is_necessary"
                      label="1">非必需</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="参数描述">
          <el-input v-model="createParams.param_desc"></el-input>
        </el-form-item>

        <el-form-item label="参数示例">
          <el-input v-model="createParams.default"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="createInterfaceParam ()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑接口对话框-->
    <el-dialog title="添加接口参数"
               :visible.sync="editDialogVisible"
               width="50%">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="editParams"
               label-width="70px">
        <el-form-item label="参数名称">
          <el-input v-model="editParams.param_name"></el-input>
        </el-form-item>
        <el-form-item label="是否必需">
          <template>
            <el-radio v-model="editParams.is_necessary"
                      label="0">必需</el-radio>
            <el-radio v-model="editParams.is_necessary"
                      label="1">非必需</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="参数描述">
          <el-input v-model="editParams.param_desc"></el-input>
        </el-form-item>

        <el-form-item label="参数示例">
          <el-input v-model="editParams.default"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editInterfaceParam ()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //  -------获取数据 参数 -------
      getInterfaceInfobody: {
        interface_id: ''
      },
      getProjectListBody: {},
      getModelListBody: {
        project_id: ''
      },
      //  -------控制显示隐藏 -------
      addDialogVisible: false,
      editDialogVisible: false,
      formProjectAndModel: true,
      createInterfaceButton: true,
      //  -------创建参数 -------
      createInterfaceBody: {
        project_id: '',
        model_id: '',
        interface_name: '',
        interface_desc: '',
        interface_type: '',
        method: '',
        path: ''
      },
      createParams: {
        interface_id: '',
        param_name: '',
        is_necessary: '0',
        param_desc: '',
        default: ''
      },
      editParams: {
        interface_id: '',
        params_id: '',
        param_name: '',
        is_necessary: '',
        param_desc: '',
        default: ''
      },
      createHeader: {
        interface_id: '',
        header: ''
      },
      createResponse: {
        interface_id: '',
        response: ''
      },
      // -------返回数据-------
      projectList: {
        project_id: '',
        project_name: ''
      },
      modelList: {
        model_id: '',
        model_name: '',
        list: []
      },
      paramsList: [],
      delParam: {
        param_id: ''
      },

      interface_type_options: [{
        value: 'http',
        label: 'http'
      }, {
        value: 'https',
        label: 'https'
      }],
      method_options: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }],
      addRulesForm: {
        project_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ],
        interface_name: [
          { required: true, message: '请输入接口名', trigger: 'blur' }
        ],
        interface_type: [
          { required: true, trigger: 'blur' }
        ],
        method: [
          { required: true, trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路径', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem('interface_id')) {
      this.formProjectAndModel = false
      // 修改的话获取当前interface详情
      this.getInterfaceInfo()
    } else {
      // 获取所有project
      this.addInterfaceGetProjectList()
    }
  },
  methods: {
    goInterfaceList () {
      this.$router.push('/interface/list')
    },
    // 获取接口详情
    async getInterfaceInfo () {
      // 从session中获取 interface_id
      this.getInterfaceInfobody.interface_id = window.sessionStorage.getItem('interface_id')
      const { data: res } = await this.$api.myinterface.getInterfaceInfoMethod(
        this.getInterfaceInfobody
      )
      if (res.code !== 1) {
        return this.$message.error('获取接口列表失败！')
      }
      this.createInterfaceBody = res.data
      this.paramsList = res.data.params
      this.createHeader.header = res.data.header
      this.createResponse.response = res.data.response
    },
    // 获取所有项目的id和名称
    async addInterfaceGetProjectList () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.getProjectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    },
    // 根据项目id获取模块
    async addInterfaceGetModelList (id) {
      this.getModelListBody.project_id = id
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取模块列表失败！')
      }
      this.modelList.list = responseBody.data
    },
    // 创建接口
    async createInterface () {
      // 如果this.$store.interface_id 不赋值也就是 undefined
      if (!window.sessionStorage.getItem('interface_id')) {
        this.createInterfaceBody.project_id = this.projectList.project_id
        this.createInterfaceBody.model_id = this.modelList.model_id
        const { data: createModelRes } = await this.$api.myinterface.createInterfaceMethod(
          this.createInterfaceBody
        )
        if (createModelRes.code === 1) {
          this.createInterfaceButton = false
          this.$message.success('添加接口成功！')
          // this.$store.commit('setInterfaceId', createModelRes.data.interface_id)
          window.sessionStorage.setItem('interface_id', createModelRes.data.interface_id)
        } else {
          this.$message.error('添加接口失败！')
        }
      } else {
        this.createInterfaceBody.interface_id = window.sessionStorage.getItem('interface_id')
        const { data: createModelRes } = await this.$api.myinterface.editInterfaceMethod(
          this.createInterfaceBody
        )
        if (createModelRes.code === 1) {
          this.$message.success('修改接口成功！')
        } else {
          this.$message.error('修改接口失败！')
        }
      }
    },
    showCreateInterfaceParamDialog () {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 创建Param
    async createInterfaceParam () {
      this.createParams.interface_id = window.sessionStorage.getItem('interface_id')
      this.createParams.is_necessary = Number(this.createParams.is_necessary)
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceParamMethod(
        this.createParams
      )
      if (createModelRes.code === 1) {
        this.$message.success('添加参数成功！')
        this.addDialogVisible = false
        this.getInterfaceInfo()
      } else {
        this.$message.error('添加参数失败！')
      }
    },
    showEditInterfaceParamDialog (paramInfo) {
      console.log(paramInfo)
      this.editDialogVisible = true
      this.editParams = paramInfo
      this.editParams.is_necessary = paramInfo.is_necessary + ''
      this.editParams.interface_id = Number(sessionStorage.getItem('interface_id'))
      console.log(this.editParams)
    },
    // 修改Param
    async editInterfaceParam () {
      this.editParams.is_necessary = Number(this.editParams.is_necessary)
      const { data: createModelRes } = await this.$api.myinterface.editInterfaceParamMethod(
        this.editParams
      )
      if (createModelRes.code === 1) {
        this.$message.success('修改请求参数成功！')
        this.editDialogVisible = false
        this.getInterfaceInfo()
      } else {
        this.$message.error('修改请求参数失败！')
      }
    },
    // 修改 请求头
    async createInterfaceHeader () {
      this.createHeader.interface_id = window.sessionStorage.getItem('interface_id')
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceHeaderMethod(
        this.createHeader
      )
      if (createModelRes.code === 1) {
        this.$message.success('修改请求头成功！')
        this.getInterfaceInfo()
      } else {
        this.$message.error('修改请求头失败！')
      }
    },
    // 修改 返回信息
    async createInterfaceResponse () {
      this.createResponse.interface_id = window.sessionStorage.getItem('interface_id')
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceResponseMethod(
        this.createResponse
      )
      if (createModelRes.code === 1) {
        this.$message.success('修改返回信息成功！')
        this.getInterfaceInfo()
      } else {
        this.$message.error('修改返回信息失败！')
      }
    },
    // 删除 参数
    async removeInterfaceParamById (id) {
      this.delParam.param_id = id
      const { data: createModelRes } = await this.$api.myinterface.removeInterfaceParamMethod(
        this.delParam
      )
      if (createModelRes.code === 1) {
        this.$message.success('删除请求参数成功！')
        this.getInterfaceInfo()
      } else {
        this.$message.error('删除请求参数失败！')
      }
    }

  }

}

</script>
<style lang="less" scoped>
.goInterfaceList-button {
  float: right;
  margin-bottom: 25px;
  margin-right: 60px;
}
.interface-info {
  width: 65%;
  margin-left: 100px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #eee;
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
.goProject-dialog-footer {
  position: relative;
  top: 50%;
  left: 50%;
  margin: 0 0 0 -100px;
}
.goProject-dialog-footer-info-param {
  position: relative;
  top: 50%;
  left: 45%;
}
.topSteps {
  margin-left: 20px;
  margin-right: 20px;
}
.topStepsCard {
  margin-bottom: 5px;
}
.header_input {
  margin-bottom: 15px;
}
.interfaceinfo-response-json {
  margin-bottom: 15px;
}
</style>
