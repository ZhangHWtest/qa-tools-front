<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="welcome-element">
        <img class="welcome-logo"
             src="@/assets/kkblogo.png" />
        <span class="welcome-title">您好！欢迎进入ApiTest后台</span>
      </div>
      <el-avatar class="user-avatar"
                 :size="35"
                 fit="cover"
                 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <el-dropdown class="user-dropdown">
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
    <el-menu class="el-menu-top"
             mode="horizontal"
             :router="true"
             :default-active="activePath">
      <el-menu-item index="/interface"
                    route="/interface"
                    @click="saveNavState('/interface')">
        <i class="iconfont icon-icon_renwujincheng"></i>
        <span slot="title">接 口</span></el-menu-item>
      <el-menu-item index="/user/list"
                    route="/user/list"
                    @click="saveNavState('/user/list')">
        <i class="iconfont icon-icon_signal"></i>
        <span slot="title">用 户</span>
      </el-menu-item>
      <el-menu-item index="/environment/list"
                    route="/environment/list"
                    @click="saveNavState('/environment/list')">
        <i class="iconfont icon-icon_setting"></i>
        <span slot="title">用 户</span>
      </el-menu-item>
    </el-menu>
    <!-- 页面主题区域 -->
    <el-container>
      <el-main>
        <router-view />
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
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data () {
    return {
      activePath: '/interface',
      loginname: {
        name: ''
      },
      updatePasword: false,
      updatePaswordUser: {
        password: [],
        set_password: []
      },
      updatePaswordRulesForm: {
        password: [{ required: true, message: '原始密码', trigger: 'blur' }],
        set_password: [{ required: true, message: '新密码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.loginname.name = window.sessionStorage.getItem('loginName')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
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
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
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
  .welcome-element {
    display: flex;
    align-items: center;
    margin-right: 25px;
    .welcome-title {
      font-size: 20px;
      padding-left: 3px;
      border-left: 0.1px solid #ffffff;
    }
    .welcome-logo {
      width: 120px;
      height: 100%;
      background-color: #373d41;
      margin-left: 40px;
      margin-right: 40px;
    }
  }
  .user-avatar {
    position: absolute;
    left: 85%;
  }
  .user-dropdown {
    position: relative;
    width: 150px;
    height: 30px;
    .el-dropdown-link {
      font-size: 20px;
      cursor: pointer;
      color: #fff;
      position: absolute;
      top: 15%;
      margin: 0 0 0 0;
      .el-icon-arrow-down {
        color: #fff;
        font-size: 20px;
      }
    }
    .el-icon--right {
      margin: 0;
    }
  }
}
.el-menu-top {
  height: 45px;
  padding-left: 45px;
}
.el-menu--horizontal {
  .el-menu-item {
    float: left;
    height: 45px;
    line-height: 45px;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.5em;
  cursor: pointer;
}
.sider-bar-title {
  margin-left: 6px;
}
</style>
