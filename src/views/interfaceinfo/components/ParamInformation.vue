<template>
  <div v-show="BasicInformation">
    <h2 class="interface-title-style">请求参数:</h2>
    <div class="interface-info">
      <el-tabs type="border-card">
        <el-tab-pane label="param">
          <div>
            <el-table border
                      :data="interfaceInfo.params">
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
                    <el-button v-show="editBasicInformation"
                               type="primary"
                               icon="el-icon-edit"
                               size="mini"
                               circle
                               @click="showEditInterfaceParamDialog(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item"
                              effect="dark"
                              content="删除"
                              placement="top">
                    <el-button v-show="editBasicInformation"
                               type="danger"
                               icon="el-icon-delete"
                               size="mini"
                               circle
                               @click="removeInterfaceParamById(scope.row.param_id)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <span slot="footer"
                  v-show="editBasicInformation"
                  class="goProject-dialog-footer-info-param">
              <el-button type="primary"
                         size="small"
                         icon="el-icon-plus"
                         @click="showCreateInterfaceParamDialog()">新 增</el-button>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="header">
          <div>
            <el-input class="header_input"
                      :disabled="showBasicInformation"
                      type="textarea"
                      placeholder="示例：{'Content-Type':'application/x-www-form-urlencoded'}"
                      v-model="interfaceInfo.header"></el-input>
            <span slot="footer"
                  v-show="editBasicInformation"
                  class="goProject-dialog-footer-info-param">
              <el-button type="success"
                         :disabled="editInterfaceHeaderButton"
                         size="small"
                         @click="editInterfaceHeader()"> 提 交</el-button>
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 添加Params对话框-->
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
  props: [
    'interfaceInfo',
    'activeName'
  ],
  data () {
    return {
      showBasicInformation: false,
      editBasicInformation: false,
      BasicInformation: true,
      addDialogVisible: false,
      editDialogVisible: false,
      editInterfaceHeaderButton: false,

      params: [],
      header: '',
      createParams: {
        interface_id: '',
        param_name: '',
        param_desc: '',
        is_necessary: '0',
        default: ''
      },
      editParams: {
      },
      editHeader: {
        interface_id: '',
        header: ''
      },
      delParam: {
        param_id: ''
      }

    }
  },
  created () {
    if (this.activeName === 'Tab 1') {
      this.showBasicInformation = true
    } else if (this.activeName === 'Tab 2') {
      this.editBasicInformation = true
    } else {
      this.BasicInformation = false
    }
  },
  methods: {
    showCreateInterfaceParamDialog () {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 创建Param
    async createInterfaceParam () {
      this.createParams.interface_id = Number(this.interfaceInfo.interface_id)
      this.createParams.is_necessary = Number(this.createParams.is_necessary)
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceParamMethod(
        this.createParams
      )
      if (createModelRes.code === 1) {
        this.$message.success('添加参数成功！')
        this.addDialogVisible = false
        // 创建成功怎么刷新
        location.reload()
      } else {
        this.$message.error('添加参数失败！')
      }
    },
    showEditInterfaceParamDialog (paramInfo) {
      console.log(paramInfo)
      this.editDialogVisible = true
      this.editParams = paramInfo
      this.editParams.is_necessary = paramInfo.is_necessary + ''
      this.editParams.interface_id = this.interfaceInfo.interface_id
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
        // 修改成功怎么刷新
        // this.getInterfaceInfo()
        location.reload()
      } else {
        this.$message.error('修改请求参数失败！')
      }
    },
    // 修改 请求头
    async editInterfaceHeader () {
      this.editHeader.interface_id = this.interfaceInfo.interface_id
      this.editHeader.header = this.interfaceInfo.header
      const { data: createModelRes } = await this.$api.myinterface.createInterfaceHeaderMethod(
        this.editHeader
      )
      if (createModelRes.code === 1) {
        this.$message.success('修改请求头成功！')
        this.getInterfaceInfo()
      } else {
        this.$message.error('修改请求头失败！')
      }
      this.editInterfaceHeaderButton = true
    },
    // 删除 参数
    async removeInterfaceParamById (id) {
      this.delParam.param_id = id
      const { data: createModelRes } = await this.$api.myinterface.removeInterfaceParamMethod(
        this.delParam
      )
      if (createModelRes.code === 1) {
        this.$message.success('删除请求参数成功！')
        // this.$forceUpdate()
        location.reload()
      } else {
        this.$message.error('删除请求参数失败！')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.interface-title-style {
  border-left: 3px solid #2395f1;
  padding-left: 8px;
  margin-bottom: 20px;
  margin-left: 15px;
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
.header_input {
  margin-bottom: 15px;
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
</style>
