<template>
  <div class="index_container">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="@/assets/kkblogo.png" />
        </div>
        <el-dropdown class="user-dropdown">
          <el-avatar :size="35"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span class="el-dropdown-link">
            {{ loginname.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePasword = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-card class="card-main">
        <!-- 卡片视图区域-->
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-col class="col-project-name">
                <el-col class="defaultProject-name">
                  <span>{{defaultProject}}</span>
                </el-col>
                <el-col class="defaultProject-introduction">
                  <span>简介：</span>
                </el-col>
                <el-col class="defaultProject-addButton">
                  <el-button class="addProject-button"
                             icon="el-icon-plus"> 添加项目</el-button>
                </el-col>
              </el-col>
              <el-col class="col-project-list">
                <el-menu class="projectList-menu">
                  <el-menu-item v-for="item in projectList"
                                :key="item.project_id"
                                :index="item.project_id"
                                @click="saveNavProjectName(item.project_name)">
                    <i class="el-icon-folder-opened"></i>
                    <span slot="title">{{item.project_name}}</span></el-menu-item>
                </el-menu>
              </el-col>
            </div>
          </el-col>
          <el-col :span="18">
            <el-tabs class="model_main_tabs"
                     v-model="activeName"
                     type="border-card"
                     @tab-click="handleClick">
              <el-tab-pane label="模块列表"
                           name="first">
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>

      </el-card>
    </el-container>
    <!-- 修改密码弹框-->
    <el-dialog title="修改密码"
               :visible.sync="updatePasword"
               width="50%"
               @close="updatePaswordClose">
      <!-- 内容主体区域-->
      <el-form ref="updatePaswordFormRef"
               :model="updatePaswordUser"
               :rules="updatePaswordRulesForm"
               label-width="90px">
        <el-form-item label="新密码"
                      prop="password">
          <el-input v-model="updatePaswordUser.password"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="set_password">
          <el-input v-model="updatePaswordUser.set_password"
                    type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="updatePasword = false">取 消</el-button>
        <el-button type="primary"
                   @click.native="updatePaswordMethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginname: {
        name: ''
      },
      activeName: 'first',
      defaultProject: '项目名',
      updatePasword: false,
      updatePaswordUser: {
        password: [],
        set_password: []
      },
      projectList: [],
      projectListBody: {
        page_num: 1
      },
      updatePaswordRulesForm: {
        password: [{ required: true, message: '原始密码', trigger: 'blur' }],
        set_password: [{ required: true, message: '新密码', trigger: 'blur' }]
      }

    }
  },
  created () {
    this.projectListMethod()
    this.activePath = window.sessionStorage.getItem('activePath')
    this.loginname.name = window.sessionStorage.getItem('loginName')
  },
  methods: {
    saveNavProjectName (defaultProject) {
      window.sessionStorage.setItem('defaultProject', defaultProject)
      this.defaultProject = defaultProject
    },
    // 获取所有项目列表
    async projectListMethod () {
      const { data: projectRes } = await this.$api.project.getProjectList(
        this.projectListBody
      )
      if (projectRes.code !== 1) {
        return this.$message.error('获取项目列表失败！')
      }
      this.projectList = projectRes.data
    },
    updatePaswordClose () {
      this.$refs.updatePaswordFormRef.resetFields()
    },
    updatePaswordMethod () {
      this.$refs.updatePaswordFormRef.validate(async valid => {
        if (!valid) return
        this.updatePaswordUser.name = window.sessionStorage.getItem('loginName')
        if (
          this.updatePaswordUser.newPassword !==
          this.updatePaswordUser.checkPassword
        ) {
          return this.$message.error('请检查输入！')
        }
        // 校验通过可以发起添加请求了
        const { data: res } = await this.$api.user.updatepassword(
          this.updatePaswordUser
        )
        if (res.code !== 1) {
          this.$message.error('修改失败！')
        }
        this.$message.success('修改成功，请重新登录！')
        window.sessionStorage.clear()
        this.$router.push('/login')
      })
    },
    saveNavState (activeName) {
      window.sessionStorage.setItem('activeName', activeName)
      this.activeName = activeName
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.index_container {
  background-color: #e5e9f2;
  height: 100%;
}
.card-main {
  background-color: #f5f5f5;
  margin-top: 20px;
  margin-left: 35px;
  margin-right: 35px;
}
.col-project-name {
  padding-top: 15px !important;
  background: #373d41;
  height: 150px;
  .defaultProject-name {
    height: 50px;
    padding-left: 15px;
    font-size: 27px;
    color: #ffffff;
  }
  .defaultProject-introduction {
    height: 50px;
    padding-left: 17px;
    font-size: 12px;
    color: #e5e9f2;
  }
  .defaultProject-addButton {
    padding-top: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
    height: 35px;
    .addProject-button {
      height: 35px;
      width: 100%;
    }
  }
}
.model_main_tabs {
  border-radius: 10px;
}

.col-project-list {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.el-dropdown-link {
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}
.el-header {
  height: 50px !important;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    margin-right: 25px;
    span {
      margin-left: 8px;
    }
    img {
      width: 120px;
      height: 100%;
      background-color: #373d41;
      margin-left: 40px;
      margin-right: 40px;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
