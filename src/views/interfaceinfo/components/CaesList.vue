<template>
  <div v-show="showCaseList">
    <el-tooltip class="item"
                effect="dark"
                content="新增用例"
                placement="top">
      <el-button class="add-model-button"
                 type="primary"
                 icon="el-icon-plus"
                 @click="showAddCaseDialog()">新增 用例</el-button>
    </el-tooltip>
    <el-table class="interface-table"
              :data="caseList"
              stripe
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55px">
      </el-table-column>
      <el-table-column width="70px"
                       label="id"
                       prop="case_id"></el-table-column>
      <el-table-column label="用例名称"
                       prop="case_name"></el-table-column>
      <el-table-column label="接口类型"
                       prop="case_type"></el-table-column>
      <el-table-column label="接口方法"
                       prop="method"></el-table-column>
      <el-table-column label="接口路径"
                       prop="path"></el-table-column>
      <el-table-column label="创建人"
                       prop="create_user"></el-table-column>
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
                       @click="showEditCaseDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="运行"
                      placement="top">
            <el-button type="success"
                       icon="el-icon-caret-right"
                       size="mini"
                       circle
                       @click="runSingleCaseMethod(scope.row.case_id)"></el-button>
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
                       @click="removeCaseById(scope.row.case_id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   :current-page="getcaseListBody.page_num"
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="500">
    </el-pagination>
    <!-- 添加case对话框-->
    <el-dialog title="添加CASE:"
               :visible.sync="addDialogVisible"
               width="65%"
               :close-on-click-modal="false"
               @close="addDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="addCaseBody"
               :rules="addRulesForm"
               label-width="120px">
        <h2 class="interface-title-style">基本信息:</h2>
        <el-form-item label="选择环境："
                      class="addcase-form-envid"
                      prop="env_id">
          <el-select v-model="addCaseBody.env_id"
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
        <el-form-item label="路径："
                      prop="method">
          <el-select v-model="addCaseBody.method"
                     class="env-select-method"
                     placeholder="方法">
            <el-option label="GET"
                       value="GET"></el-option>
            <el-option label="POST"
                       value="POST"></el-option>
          </el-select>
          <el-select v-model="addCaseBody.case_type"
                     class="env-select-method"
                     placeholder="请求">
            <el-option label="HTTP"
                       value="HTTP"></el-option>
            <el-option label="HTTPS"
                       value="HTTPS"></el-option>
          </el-select>

          <el-input class="run-input-interface-path"
                    placeholder="/path"
                    v-model="addCaseBody.path"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="addCaseBody.case_desc"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
        <h2 class="interface-title-style">请求参数:</h2>
        <div class="interface-info">
          <el-tabs type="border-card">
            <el-tab-pane label="param">
              <el-input class="header_input"
                        type="textarea"
                        placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                        v-model="addCaseBody.param"></el-input>
            </el-tab-pane>
            <el-tab-pane label="header">
              <el-input class="header_input"
                        type="textarea"
                        placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                        v-model="addCaseBody.header"></el-input>
            </el-tab-pane>
          </el-tabs>
        </div>
        <h2 class="interface-title-style">响应:</h2>
        <el-form-item label="结果断言:"
                      prop="res_assert">
          <el-input v-model="addCaseBody.res_assert"
                    placeholder="示例：{'code':200}"
                    type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="执行结果:"
                      prop="save_result">
          <el-radio v-model="addCaseBody.save_result"
                    :label="1">保存</el-radio>
          <el-radio v-model="addCaseBody.save_result"
                    :label="0">不保存</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addCaseMethod ()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [
    'interfaceInfo',
    'activeName'
  ],
  data () {
    return {
      showCaseList: false,
      getcaseListBody: {
        interface_id: '',
        page_num: 1
      },
      caseList: [],
      multipleSelection: [],
      runCaseList: {
        case_id: ''
      },
      addCaseBody: {
        project_id: '',
        model_id: '',
        interface_id: '',
        env_id: '',
        case_name: '',
        case_desc: '',
        case_type: '',
        method: '',
        path: '',
        params: '',
        header: '',
        res_assert: '',
        has_rely: 1,
        rely_info: '',
        save_result: 1,
        use_db: 1,
        sql: '',
        field_value: ''
      },
      addRulesForm: {
        env_id: [
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
      },
      addDialogVisible: false,
      envList: [],
      getEnvBody: {
      }
    }
  },
  created () {
    if (this.activeName === 'Tab 4') {
      this.showCaseList = true
      this.getcaseListBody.interface_id = this.interfaceInfo.interface_id
      this.caseListMethod()
    }
  },
  methods: {
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getcaseListBody.page_num = newPage
      this.caseListMethod()
    },
    // table 复选框选中值
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.multipleSelection.forEach(function (e) {
        console.log(e.case_id)
      })
    },
    // 获取所有case
    async caseListMethod () {
      const { data: responseBody } = await this.$api.testcase.getCaseList(
        this.getcaseListBody
      )
      if (responseBody.code === 1) {
        this.caseList = responseBody.data
      } else {
        this.$message.error('请求用例信息失败！')
      }
    },
    // 获取所有case
    async runSingleCaseMethod (id) {
      this.runCaseList.case_id = id
      const { data: responseBody } = await this.$api.testcase.runCase(
        this.runCaseList
      )
      if (responseBody.code === 1) {
        this.caseList = responseBody.data
        this.$message.success('运行成功！')
      } else {
        this.$message.error('运行失败！')
      }
    },
    showAddCaseDialog () {
      this.addDialogVisible = true
      this.addCaseBody.interface_id = this.interfaceInfo.interface_id
      this.getEnvListMethod()
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
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
    async addCaseMethod () {
      const { data: res } = await this.$api.testcase.addCase(
        this.addCaseBody
      )
      if (res.code !== 1) {
        return this.$message.error('添加用例失败！')
      }
      this.$message.success('添加用例成功！')
    }
  }
}
</script>
<style lang="less" scoped>
.el-input {
  width: 350px;
}
.addcase-form-envid {
  width: 500px;
  .el-select {
    width: 350px;
  }
}
.env-select-method {
  margin-right: 0px;
  width: 120px;
}
.run-input-interface-path {
  width: 150px;
  margin-right: 0px;
}
.run-input-interface-path {
  width: 300px;
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
</style>
