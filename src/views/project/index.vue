<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="interface-info-card">
      <div class="interface-top-addbutton">
        <span class="interface-top-addannotation">注：添加模块必须先选中项目！</span>
        <el-button
          class="add-button"
          type="primary"
          @click="addProjectDialog=true"
        >
          新增 项目
        </el-button>
      </div>

      <el-table
        ref="multipleTableAll"
        :data="projectList"
        style="width: 100%"
        @expand-change="expandChange"
      >
        <el-table-column type="expand">
          <model-list :project-row="projectRow" :show-model-list="showModelList" />
        </el-table-column>
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
    </el-card>
    <!-- 新增项目对话框-->
    <el-dialog
      title="新增项目"
      :visible.sync="addProjectDialog"
      width="35%"
      :close-on-click-modal="false"
      @close="addProjectDialogClosed"
    >
      <!-- 内容主体区域-->
      <el-form
        ref="addFormRef"
        :model="addProjectBody"
        :rules="addRulesForm"
        label-width="85px"
      >
        <el-form-item
          label="项目名称"
          prop="project_name"
        >
          <el-input
            v-model="addProjectBody.project_name"
            placeholder="请输入项目名"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addProjectDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="createProjectMethod()"
        >确 定</el-button>
      </span>
    </el-dialog>
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
import ModelList from './components/ModelList'
export default {
  components: {
    ModelList
  },
  data() {
    return {
      projectListBody: {},
      projectList: [],
      getModelListBody: {
        project_id: ''
      },
      modelList: [],
      addProjectDialog: false,
      addProjectBody: {
        project_name: ''
      },
      addRulesForm: {
        project_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ]
      },
      projectRow: '',
      showModelList: false,
      expands: '',
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
    this.getProjectListMethod()
  },
  methods: {
    expandChange(row, expandedRows) {
      this.expandedRows = expandedRows
      if (expandedRows.length > 1) {
        this.$refs.multipleTableAll.toggleRowExpansion(this.expandedRows[0])
        console.log(this.$refs.multipleTableAll)
      }
      if (this.expandedRows.length > 0) {
        // console.log(row)
        this.projectRow = row
        this.showModelList = true
      }
    },
    // 获取所有项目列表
    async getProjectListMethod() {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.projectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    },
    addProjectDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击”确认“提交前的预校验
    createProjectMethod() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error('请检查必填项！')
        } else {
          const { data: res } = await this.$api.project.addProject(
            this.addProjectBody
          )
          if (res.code === 1) {
            this.$message.success('添加项目成功！')
            this.addProjectDialog = false
            this.getProjectListMethod()
          } else { this.$message.error(res.msg) }
        }
      })
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
  }

}
</script>
<style lang="less" scoped>
.interface-top-addbutton {
  background-color: #eee;
  height: 45px;
  padding: 10px 10px 10px 10px;
  border-radius: 4px;
  line-height: 45px;
  .interface-top-addannotation {
    font-size: 13px;
    color: rgba(39, 56, 72, 0.75);
  }
  .add-button {
    font-size: 13px;
    float: right;
  }
}
.project-list-col {
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 10px;
  .project-list-col-tittle {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    border-radius: 4px;
    .project-list-col-tittle-name {
      margin-left: 10px;
      font-size: 15px;
      color: rgba(39, 56, 72, 0.85);
    }
    .project-list-col-tittle-button {
      float: right;
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}
.project-list-col-two {
  height: 650px;
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
