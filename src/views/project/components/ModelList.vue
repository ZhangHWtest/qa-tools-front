<template>
  <div>
    <div class="interface-top-addbutton">
      <el-button class="add-button"
                 type="primary"
                 @click="openAddModelDialog()">新增 模块</el-button>
      <el-table class="model_table"
                size="mini"
                :data="modelList">
        <el-table-column width="70px"
                         label="id"
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
                         @click="openEditModelDialog(scope.row.model_id,scope.row.model_name)"></el-button>
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
    </div>
    <el-dialog title="新增模块"
               :visible.sync="addModelDialog"
               width="35%"
               :close-on-click-modal="false"
               @close="addModelDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="addModelFormRef"
               :model="addModelBody"
               :rules="addModelRulesForm"
               label-width="85px">
        <el-form-item label="项目名称">
          <el-input v-model="projectName"
                    :disabled="true"
                    placeholder="请输入项目名"></el-input>
        </el-form-item>
        <el-form-item label="模块名称"
                      prop="model_name">
          <el-input v-model="addModelBody.model_name"
                    placeholder="请输入模块名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addModelDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="createModelMethod()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改模块"
               :visible.sync="editModelDialog"
               width="35%"
               :close-on-click-modal="false"
               @close="editModelDialogClosed">
      <!-- 内容主体区域-->
      <el-form ref="editModelFormRef"
               :model="editModelBody"
               :rules="editModelRulesForm"
               label-width="85px">
        <el-form-item label="模块名称"
                      prop="model_name">
          <el-input v-model="editModelBody.model_name"
                    placeholder="请输入模块名"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editModelDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="editModelMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [
    'projectRow',
    'showModelList'
  ],
  data () {
    return {
      addModelDialog: false,
      addModelBody: {
        project_id: '',
        model_name: ''
      },
      projectName: '',
      addModelRulesForm: {
        model_name: [
          { required: true, message: '请输入模块名', trigger: 'blur' }
        ]
      },
      getModelListBody: {
        project_id: ''
      },
      modelList: [],
      editModelBody: {
        project_id: '',
        model_id: '',
        model_name: ''
      },
      editModelRulesForm: {
        model_name: [
          { required: true, message: '请输入模块名', trigger: 'blur' }
        ]
      },
      editModelDialog: false,
      delModelBody: {
        model_id: ''
      }
    }
  },
  created () {
    console.log(this.projectRow)
    if (this.showModelList) {
      this.getModelListMethod()
    }
  },
  methods: {
    // 获取所有模块列表
    async getModelListMethod () {
      this.getModelListBody.project_id = this.projectRow.project_id
      const { data: responseBody } = await this.$api.project.getModelList(
        this.getModelListBody
      )
      if (responseBody.code !== 1) {
        return this.$message.error('获取列表失败！')
      }
      this.modelList = responseBody.data
    },
    openAddModelDialog () {
      this.addModelBody.project_id = this.projectRow.project_id
      this.projectName = this.projectRow.project_name
      this.addModelDialog = true
    },
    addModelDialogClosed () {
      this.$refs.addModelFormRef.resetFields()
    },
    createModelMethod () {
      this.$refs.addModelFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.project.addModel(
            this.addModelBody
          )
          if (res.code === 1) {
            this.$message.success('添加模块成功！')
            this.addModelDialog = false
            this.getModelListMethod()
          } else { this.$message.error(res.msg) }
        }
      })
    },
    // 修改方法
    openEditModelDialog (_id, _modelName) {
      this.editModelBody.project_id = this.projectRow.project_id
      this.editModelBody.model_id = _id
      this.editModelBody.model_name = _modelName
      this.editModelDialog = true
    },
    editModelDialogClosed () {
      this.$refs.editModelFormRef.resetFields()
    },
    editModelMethod () {
      this.$refs.editModelFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.project.editModel(
            this.editModelBody
          )
          if (res.code === 1) {
            this.$message.success('修改成功！')
            this.editModelDialog = false
            this.getModelListMethod()
          } else { this.$message.error(res.msg) }
        }
      })
    },
    // 根据id删除
    async removeModelById (_id) {
      this.delModelBody.model_id = _id
      // 弹窗询问是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该项目, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$api.project.delModel(
        this.delModelBody
      )
      if (res.code !== 1) {
        return this.$message.error('删除信息失败！')
      }
      // 提示信息
      this.$message.success('删除成功！')
      // 刷新数据
      this.getModelListMethod()
    }

  }
}
</script>
<style lang="less" scoped>
.interface-top-addbutton {
  background-color: #eee;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  .add-button {
    margin-bottom: 10px;
    font-size: 13px;
    float: right;
  }
}
</style>
