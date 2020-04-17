<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-row :gutter="30">
          <el-col :span="5">
            <el-button type="primary"
                       plain
                       @click="goProjectInfo()">新增项目</el-button>
          </el-col>
        </el-row>
        <!-- 用户列表区域-->
        <el-table border
                  :data="projectListResList">
          <el-table-column width="50px"
                           label="uid"
                           prop="project_id"></el-table-column>
          <el-table-column label="项目名称"
                           prop="project_name"></el-table-column>
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
                           @click="goProjectInfo(scope.row.project_id,scope.row.project_name)"></el-button>
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
                           @click="removeProjectById(scope.row.project_id)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background
                       :current-page="projectListBody.page_num"
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next"
                       :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  data () {
    return {
      projectListBody: {
        page_num: 1
      },
      createProjectBody: {
        project_id: '',
        project_name: ''
      },
      enitProjectBody: {
        project_id: '',
        project_name: ''
      },
      delProjectBody: {
        project_id: ''
      },
      projectListResList: {

      },
      addDialogVisible: false,
      editDialogVisible: false,
      addRulesForm: {
        project_name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.projectList()
  },
  methods: {
    // 点击跳转至ProjectInfo页面
    goProjectInfo (_id, _name) {
      this.$router.push({ path: '/project/info', query: { id: _id, name: _name } })
    },
    // 监听 页码值改变的事件
    handleCurrentChange (newPage) {
      this.projectListBody.page_num = newPage
      this.projectList()
    },
    // 获取所有项目列表
    async projectList () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.projectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectListResList = projectRes.data
    },
    // 监听添加对话框关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 展示编辑的对话框
    async showEditDialog (scope) {
      this.enitProjectBody.project_id = scope.row.project_id
      this.enitProjectBody.project_name = scope.row.project_name
      this.editDialogVisible = true
    },
    editDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 修改信息并提交
    editProjectInfo () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$api.project.editProject(
          this.enitProjectBody
        )
        if (res.code !== 1) {
          return this.$message.error('修改信息失败！')
        }
        // 关闭对框
        this.editDialogVisible = false
        // 刷新数据
        this.projectList()
        // 提示信息
        this.$message.success('更新成功！')
      })
    },
    // 根据id删除
    async removeProjectById (_id) {
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
      this.projectList()
    }
  }
}
</script>

<style lang="less" scoped></style>
