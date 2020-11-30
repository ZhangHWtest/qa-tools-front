<template>
  <div class="main-projectlist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user-list-main">
      <!-- 卡片视图区域-->
      <el-card>
        <el-row :gutter="30">
          <el-col :span="5">
            <el-button type="primary" @click="addDialogVisible = true">
              新增用户
            </el-button>
          </el-col>
        </el-row>

        <!-- api列表区域-->
        <el-table stripe :data="userList">
          <el-table-column width="50px" label="uid" prop="uid" />
          <el-table-column
            label="姓名"
            prop="username"
          />
          <el-table-column
            label="角色"
            prop="role"
          />
          <el-table-column
            label="状态"
            width="80px"
          >
            <template slot-scope="scope">
              <div class="apiStatus">
                <font
                  v-if="scope.row.status"
                  color="#67C23A"
                  class="apiActive"
                >
                  启动
                </font>
                <font
                  v-else
                  color="#F56C6C"
                  class="apiNoActive"
                >
                  禁用
                </font>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150px"
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
                  @click="showEditDialog(scope)"
                />
              </el-tooltip>

              <!-- 重置密码-->
              <el-tooltip
                class="item"
                effect="dark"
                content="重置密码"
                placement="top"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  circle
                  @click="resetPassword(scope)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 添加用户对话框-->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区域-->
        <el-form
          ref="addFormRef"
          :model="createUser"
          :rules="addRulesForm"
          label-width="70px"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input v-model="createUser.username" />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input v-model="createUser.email" />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addUser"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户对话框-->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <!-- 内容主体区域-->
        <el-form
          ref="editFormRef"
          :model="editUser"
          :rules="addRulesForm"
          label-width="70px"
        >
          <el-form-item label="角色: ">
            <el-radio-group v-model="editUser.role_id">
              <el-radio :label="1">
                User
              </el-radio>
              <el-radio :label="2">
                Leader
              </el-radio>
              <el-radio :label="3">
                Admin
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态: ">
            <el-radio-group v-model="editUser.status">
              <el-radio :label="1">
                启用
              </el-radio>
              <el-radio :label="0">
                禁用
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="editUserInfo()"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱！'))
    }
    return {
      queryInfo: {
        page_num: 1
      },
      userList: [],
      // 新增用户绑定参数
      createUser: {
        username: '',
        email: ''
      },
      editUser: {
        uid: '',
        role_id: '',
        status: ''
      },
      editUserRoles: {
        uid: '',
        role_id: ''
      },
      editUserStatus: {
        uid: '',
        status: ''
      },
      addRulesForm: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      // 新增用户窗口打开关闭
      addDialogVisible: false,
      // 编辑用户窗口打开关闭
      editDialogVisible: false,
      resetPasswordBody: {
        uid: ''
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击”确认“提交前的预校验
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$api.user.createUser(this.createUser)
        if (res.code !== 1) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 添加成功关闭对话框
        this.addDialogVisible = false
        // 重新获取列表数据
        this.getUserList()
      })
    },
    async getUserList() {
      const { data: userRes } = await this.$api.user.getUserList(this.queryInfo)
      if (userRes.code !== 1) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userList = userRes.data
    },
    async resetPassword(scope) {
      console.log(scope)
      this.resetPasswordBody.uid = scope.row.uid
      const { data: getMGRes } = await this.$api.user.resetPasswordApi(
        this.resetPasswordBody
      )
      if (getMGRes.code === 1) {
        return this.$message.success('修改成功！')
      }
      return this.$message.error('修改失败！')
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 展示编辑用户的对话框
    async showEditDialog(scope) {
      console.log(scope)
      if (scope.row.role === 'User') {
        this.editUser.role_id = 1
      } else if (scope.row.role === 'Leader') {
        this.editUser.role_id = 2
      } else {
        this.editUser.role_id = 3
      }
      this.editUser.status = scope.row.status
      this.editUser.uid = scope.row.uid
      this.editDialogVisible = true
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return

        this.editUserStatus.uid = this.editUser.uid
        this.editUserStatus.status = this.editUser.status
        const { data: statusRes } = await this.$api.user.onOffUserApi(
          this.editUserStatus
        )
        if (statusRes.code !== 1) {
          return this.$message.error('修改用户信息失败！')
        }
        this.editUserRoles.uid = this.editUser.uid
        this.editUserRoles.role_id = this.editUser.role_id
        const { data: roleRes } = await this.$api.user.setRoleApi(
          this.editUserRoles
        )
        if (roleRes.code !== 1) {
          return this.$message.error('修改用户信息失败！')
        }
        this.$message.success('修改用户角色成功！')
        // 关闭对框
        this.editDialogVisible = false
        // 提示信息
        this.$message.success('更新成功！')
        // 刷新数据
        this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-projectlist {
  padding: 15px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.user-list-main {
  margin: 15px;
}
.apiStatus {
  padding-left: 10px;
  .apiActive::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background: #67c23a;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .apiNoActive::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background: #f56c6c;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
