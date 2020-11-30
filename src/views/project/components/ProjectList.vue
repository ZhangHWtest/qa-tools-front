<template>
  <div v-show="showPAndMListTable">
    <el-table
      class="model_table"
      stripe
      :data="projectList"
    >
      <el-table-column
        width="70px"
        label="id"
        prop="project_id"
      />
      <el-table-column
        label="项目名称"
        prop="project_name"
      />
      <el-table-column
        label="创建人"
        prop="create_user"
      />
      <el-table-column
        label="操作"
        width="120px"
      >
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="修改"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              ricon="el-icon-edit"
              circle
              @click="showEditProjectDialog(scope.row.project_id,scope.row.project_name)"
            />
          </el-tooltip>
          <!-- 删除按钮 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              ricon="el-icon-edit"
              circle
              @click="removeProjectById(scope.row.project_id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改项目对话框-->
    <el-dialog
      title="修改项目"
      :visible.sync="editProjectDialog"
      width="50%"
      :close-on-click-modal="false"
      @close="editProjectDialogClosed"
    >
      <!-- 内容主体区域-->
      <el-form
        ref="addFormRef"
        :model="editProjectBody"
        :rules="addRulesForm"
        label-width="85px"
      >
        <el-form-item
          label="项目名称"
          prop="project_name"
        >
          <el-input v-model="editProjectBody.project_name" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editProjectDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editProjectMethod()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: [
    'showPAndMListTable',
    'projectList'
  ],
  data() {
    return {
      addProjectDialog: false,
      addProjectBody: {
        project_name: ''
      },
      addRulesForm: {
        project_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ]
      },
      editProjectDialog: false,
      editProjectBody: {
        project_id: '',
        project_name: ''
      },
      delProjectBody: {
        project_id: ''
      }
    }
  },
  created() {
    if (this.activeName === 'Tab 1') {
      this.projectListTable = true
      this.getProjectListMethod()
    }
  },
  methods: {
    addProjectDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    editProjectDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    showEditProjectDialog(_id, _projectName) {
      this.editProjectBody.project_id = _id
      this.editProjectBody.project_name = _projectName
      this.editProjectDialog = true
    },
    editProjectMethod() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.project.editProject(
            this.editProjectBody
          )
          if (res.code === 1) {
            this.$message.success('添加项目成功！')
            this.editProjectDialog = false
            this.getProjectListMethod()
          } else { this.$message.error(res.msg) }
        }
      })
    },
    // 根据id删除
    async removeProjectById(_id) {
      this.delProjectBody.project_id = _id
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
      const { data: res } = await this.$api.project.projectDel(
        this.delProjectBody
      )
      if (res.code !== 1) {
        return this.$message.error('删除信息失败！')
      }
      // 提示信息
      this.$message.success('删除成功！')
      // 刷新数据
      this.getProjectListMethod()
    }
    // goModelList (projectId) {
    //   this.$emit('listenChildGoModel', projectId)
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
