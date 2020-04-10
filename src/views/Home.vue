<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/kkblogo.png" />
        <span>您好！欢迎进入Admin后台</span>
      </div>
      <el-dropdown class="user-dropdown">
        <el-avatar :size="35"
                   fit="cover"
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
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <div class="toggle-button"
             @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409EFF"
                 :unique-opened="true"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-icon_workfile_line"></i>
              <span class="sider-bar-title">项目管理</span>
            </template>
            <el-menu-item index="/project/list"
                          route="/project/list"
                          @click="saveNavState('/project/list')">
              <template slot="title">
                <i class="iconfont icon-icon_compile"></i>
                <span class="sider-bar-title">项目列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/interface/list"
                          route="/interface/list"
                          @click="saveNavState('/interface/list')">
              <template slot="title">
                <i class="iconfont icon-jishufuwu"></i>
                <span class="sider-bar-title">接口列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/environment/list"
                          route="/environment/list"
                          @click="saveNavState('/environment/list')">
              <template slot="title">
                <i class="iconfont icon-icon_setting"></i>
                <span class="sider-bar-title">环境配置</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-changjingguanli"></i>
              <span class="sider-bar-title">用例管理</span>
            </template>
            <el-menu-item index="/case/chart"
                          route="/case/chart"
                          @click="saveNavState('/case/chart')">
              <template slot="title">
                <i class="iconfont icon-tradingvolume"></i>
                <span class="sider-bar-title">用例概况</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/case/list"
                          route="/case/list"
                          @click="saveNavState('/case/list')">
              <template slot="title">
                <i class="iconfont icon-ceshishenqing"></i>
                <span class="sider-bar-title">用例列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="iconfont icon-icon_boss"></i>
              <span class="sider-bar-title">用户管理</span>
            </template>
            <el-menu-item index="/user/list"
                          route="/user/list"
                          @click="saveNavState('/user/list')">
              <template slot="title">
                <i class="iconfont icon-icon_meeting"></i>
                <span class="sider-bar-title">用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span class="sider-bar-title">实验</span>
            </template>
            <el-menu-item index="/demo/demo1"
                          route="/demo/demo1"
                          @click="saveNavState('/demo/demo1')">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span class="sider-bar-title">实验一</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/demo/demo2"
                          route="/demo/demo2"
                          @click="saveNavState('/demo/demo2')">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span class="sider-bar-title">实验二</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/demo/demo3"
                          route="/demo/demo3"
                          @click="saveNavState('/demo/demo4')">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span class="sider-bar-title">实验三</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体区域 -->
      <el-main>
        <!-- 路由占位符-->
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
      menulist: [],
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
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
    this.activePath = window.sessionStorage.getItem('activePath')
    this.loginname.name = window.sessionStorage.getItem('loginName')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
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
  > div {
    display: flex;
    align-items: center;
    margin-right: 25px;
    span {
      margin-left: 15px;
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
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
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
.el-dropdown-link {
  font-size: 20px;
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  color: #fff;
  font-size: 15px;
}
.sider-bar-title {
  margin-left: 6px;
}
</style>
