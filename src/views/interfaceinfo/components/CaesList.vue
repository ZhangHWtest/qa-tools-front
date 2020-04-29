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
               @close="addDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="addFormRef"
               :model="addCaseBody"
               label-width="120px">
        <h2 class="interface-title-style">基本信息:</h2>
        <el-form-item label="选择环境：">
          <el-select v-model="addCaseBody.env_id"
                     placeholder="请选择环境：">
            <el-option v-for="item in envList"
                       :key="item.env_id"
                       :label="item.url"
                       :value="item.env_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="addCaseBody.case_name"></el-input>
        </el-form-item>
        <el-form-item label="路径：">
          <el-select v-model="addCaseBody.method"
                     class="env-select-method"
                     placeholder="请选择">
            <el-option label="GET"
                       value="GET"></el-option>
            <el-option label="POST"
                       value="POST"></el-option>
          </el-select>

          <el-input class="run-input-interface-path"
                    v-model="addCaseBody.path"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="addCaseBody.case_desc"></el-input>
        </el-form-item>
        <h2 class="interface-title-style">请求参数:</h2>
        <div class="interface-info">
          <el-tabs type="border-card">
            <el-tab-pane label="param">
              <el-input class="header_input"
                        :disabled="showBasicInformation"
                        type="textarea"
                        placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                        v-model="interfaceInfo.header"></el-input>
            </el-tab-pane>
            <el-tab-pane label="header">
              <el-input class="header_input"
                        :disabled="showBasicInformation"
                        type="textarea"
                        placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                        v-model="interfaceInfo.header"></el-input>
            </el-tab-pane>
          </el-tabs>
        </div>
        <h2 class="interface-title-style">响应:</h2>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="createInterfaceParam ()">确 定</el-button>
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
        has_rely: '',
        rely_info: '',
        save_result: '',
        use_db: '',
        sql: '',
        field_value: ''
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
    }

  }

}
</script>
<style lang="less" scoped>
.env-select-method {
  margin-right: 0px;
}
.run-input-interface-path {
  width: 150px;
  margin-right: 0px;
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
}
</style>
