<template>
  <dev>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/project/list'}">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item>项目详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-divider />
      <div>
        <!-- 内容主体区域-->
        <el-form ref="addFormRef"
                 :model="createProjectBody"
                 :rules="addRulesForm"
                 label-width="100px">
          <el-form-item label="项目名称:"
                        prop="project_name">
            <el-input class="project_name_input"
                      placeholder="请输入项目名"
                      v-model="createProjectBody.project_name"></el-input>
            <template>
              <el-tooltip class="item"
                          effect="dark"
                          content="新增/修改"
                          placement="top">
                <el-button class="createProjectButton"
                           type="success"
                           icon="el-icon-plus"
                           size="mini"
                           :disabled="isDisable"
                           circle
                           @click="createProject()"></el-button>
              </el-tooltip>
            </template>

          </el-form-item>
          <el-form-item label="模块名称:">
            <el-input class="project_name_input"
                      placeholder="请输入模块名"
                      v-model="createModelBody.model_name"></el-input>
            <template>
              <el-tooltip class="item"
                          effect="dark"
                          content="新增"
                          placement="top">
                <el-button class="createProjectButton"
                           type="success"
                           icon="el-icon-plus"
                           size="mini"
                           :disabled="createModelIsDisable"
                           circle
                           @click="createModel()"></el-button>
              </el-tooltip>
            </template>
          </el-form-item>
          <!-- 模块列表区域-->
          <el-table class="model_table"
                    border
                    :data="getModelBody"
                    @row-dblclick="showTableInputMethod()">
            <el-table-column width="70px"
                             label="模块id"
                             prop="model_id"></el-table-column>
            <el-table-column label="模块名称"
                             prop="model_name">
            </el-table-column>
            <el-table-column label="创建人"
                             prop="create_user"></el-table-column>
            <el-table-column label="操作"
                             width="120px">
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
                             @click="showEditDialog(scope.row.model_id,scope.row.model_name)"></el-button>
                </el-tooltip>
                <!-- 删除按钮 -->
                <el-tooltip class="item"
                            effect="dark"
                            content="删除"
                            placement="top">
                  <el-button type="danger"
                             icon="el-icon-delete"
                             size="mini"
                             ricon="el-icon-edit"
                             circle
                             @click="removeModelById(scope.row.model_id)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-pagination background
                       small
                       :current-page="getModelListBody.page_num"
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next"
                       :total="500">
        </el-pagination>
        <span slot="footer"
              class="goProject-dialog-footer">
          <el-button @click="goProjectList()">返回</el-button>
        </span>
      </div>
    </el-card>
    <!-- 修改模块对话框-->
    <el-dialog title="修改模块"
               :visible.sync="editDialogVisible"
               width="50%"
               @close="editDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="editFormRef"
               :model="editModelBody"
               :rules="editModelForm"
               label-width="85px">
        <el-form-item label="项目名称"
                      prop="model_name">
          <el-input v-model="editModelBody.model_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editModelById()">确 定</el-button>
      </span>
    </el-dialog>
  </dev>
</template>

<script>
export default {
  created () {
    this.receiveBody.project_name = this.$route.query.name
    this.receiveBody.project_id = this.$route.query.id
    this.modelList()
  },
  data () {
    return {
      // 进入页面初始化的参数
      receiveBody: {
        project_id: '',
        project_name: ''
      },
      getModelListBody: {
        project_id: '',
        page_num: 1
      },
      createProjectBody: {
        project_name: ''
      },
      editProjectBody: {
        project_id: '',
        project_name: ''
      },
      createModelBody: {
        project_id: '',
        model_name: ''
      },
      removeModel: {
        model_id: ''
      },
      editModelBody: {
        model_id: '',
        model_name: ''
      },
      getModelBody: {},
      addRulesForm: {
        project_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ]
      },
      editModelForm: {
        model_name: [
          { required: true, message: '请输入模块名', trigger: 'blur' }
        ]
      },
      // 控制按钮是否可点击
      isDisable: false,
      // 控制按钮是否可点击
      createModelIsDisable: false,
      // 控制对话框的显示与隐藏
      editDialogVisible: false,
      showTableInput: false
    }
  },
  methods: {
    // 确定，返回按钮回到list页面
    goProjectList () {
      this.$router.push('/project/list')
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.getModelListBody.page_num = newPage
      this.modelList()
    },
    showTableInputMethod () {
      console.log('点击事件！！！')
      this.showTableInput = true
    },
    // 获取所有模块列表
    async modelList () {
      this.createProjectBody.project_name = this.receiveBody.project_name
      this.getModelListBody.project_id = this.receiveBody.project_id
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      this.getModelBody = responseBody.data
    },
    // 点击”确认“提交前的预校验
    async createProject () {
      this.isDisable = true
      if (!this.receiveBody.project_id) {
        // 初始project_id没有数据调用 新增
        const { data: res } = await this.$api.project.addProject(
          this.createProjectBody
        )
        if (res.code === 1) {
          this.$message.success('添加项目成功！')
          this.receiveBody.project_id = res.data.project_id
          this.receiveBody.project_name = res.data.project_name
        } else { this.$message.error(res.msg) }
      } else {
        // 初始project_id有数据调用 修改
        this.editProjectBody.project_id = this.receiveBody.project_id
        this.editProjectBody.project_name = this.receiveBody.project_name
        const { data: res } = await this.$api.project.editProject(
          this.editProjectBody
        )
        if (res.code === 1) {
          this.$message.success('修改项目成功！')
        } else { this.$message.error(res.msg) }
      }
      // 防止按钮重复点击， 1000毫秒=1秒
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
    },
    // 创建model
    async createModel () {
      this.createModelIsDisable = true
      this.createModelBody.project_id = this.receiveBody.project_id
      const { data: createModelRes } = await this.$api.project.addModel(
        this.createModelBody
      )
      if (createModelRes.code === 1) {
        this.$message.success('添加模块成功！')
      } else {
        this.$message.error('添加模块失败！')
      }
      this.modelList()
      // 防止按钮重复点击， 1000毫秒=1秒
      setTimeout(() => {
        this.createModelIsDisable = false
      }, 1000)
    },
    // 删除model
    async removeModelById (id) {
      this.removeModel.model_id = id
      const { data: res } = await this.$api.project.delModel(
        this.removeModel
      )
      if (res.code === 1) {
        this.$message.success('删除模块成功！')
      } else {
        this.$message.error('删除模块失败！')
      }

      this.modelList()
    },
    // 展示编辑用户的对话框
    async showEditDialog (id, name) {
      this.editModelBody.model_id = id
      this.editModelBody.model_name = name
      this.editDialogVisible = true
    },
    // 编辑model
    async editModelById () {
      const { data: res } = await this.$api.project.editModel(
        this.editModelBody
      )
      if (res.code !== 1) {
        this.$message.error('编辑模块失败！')
      }
      this.$message.success('编辑模块成功！')
      this.editDialogVisible = false
      this.modelList()
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    }

  }

}
</script>

<style lang="less" scoped>
.project_name_input {
  width: 260px;
}
.model_table {
  margin-bottom: 15px;
}
.goProject-dialog-footer {
  float: right;
  margin-right: 25px;
  margin-bottom: 15px;
  margin-top: 10px;
}
.createProjectButton {
  margin-left: 10px;
}
.itemAddModel {
  position: absolute;
  left: 55%;
}
</style>
