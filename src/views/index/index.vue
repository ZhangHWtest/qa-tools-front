<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="welcome-element">
        <img
          class="welcome-logo"
          src="@/assets/bsy-logo.png"
        >
        <span class="welcome-title"> 欢迎进入BSYQaTools后台</span>
      </div>
      <el-dropdown class="user-dropdown">
        <span class="el-dropdown-link">
          {{ loginname.name }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="updatePasword = true">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout()">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- <el-aside :width="isCollapse ? '50px' : '230px'"> -->
      <!-- <el-aside width="230px">
        <div class="toggle-button"
             @click="toggleCollapse">|||</div>
        <aside-nav-menu />
      </el-aside> -->
      <el-aside :width="isCollapse ? '65px' : '200px'">
        <div
          class="toggle-button"
          @click="toggleCollapse"
        >
          |||
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-icon_compile" />
              <span class="sider-bar-title">API管理</span>
            </template>
            <el-menu-item
              index="/casechart"
              route="/casechart"
              @click="saveNavState('/casechart')"
            >
              <template slot="title">
                <i class="iconfont icon-shujukanban" />
                <span class="sider-bar-title">用例概况</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/interface"
              route="/interface"
              @click="saveNavState('/interface')"
            >
              <template slot="title">
                <i class="iconfont icon-jishufuwu" />
                <span class="sider-bar-title">接口列表</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/caselist"
              route="/caselist"
              @click="saveNavState('/caselist')"
            >
              <template slot="title">
                <i class="iconfont icon-ceshishenqing" />
                <span class="sider-bar-title">用例列表</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/tasklist"
              route="/tasklist"
              @click="saveNavState('/tasklist')"
            >
              <template slot="title">
                <i class="iconfont icon-icon_renwujincheng" />
                <span class="sider-bar-title">任务列表</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/project"
              route="/project"
              @click="saveNavState('/project')"
            >
              <template slot="title">
                <i class="iconfont icon-icon_workfile_line" />
                <span class="sider-bar-title">项目配置</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/environment/list"
              route="/environment/list"
              @click="saveNavState('/environment/list')"
            >
              <template slot="title">
                <i class="iconfont icon-icon_setting" />
                <span class="sider-bar-title">环境配置</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-ruanjiankaifabao" />
              <span class="sider-bar-title">UI管理</span>
            </template>
            <el-menu-item
              index="/ui/caselist"
              route="/ui/caselist"
              @click="saveNavState('/ui/caselist')"
            >
              <template slot="title">
                <i class="iconfont icon-ceshishenqing" />
                <span class="sider-bar-title">用例管理</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/uienv/list"
              route="/uienv/list"
              @click="saveNavState('/uienv/list')"
            >
              <template slot="title">
                <i class="iconfont icon-icon_setting" />
                <span class="sider-bar-title">环境配置</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-icon_yingyongguanli" />
              <span class="sider-bar-title">QA工具</span>
            </template>
            <el-menu-item
              index="/qatools/report"
              route="/qatools/report"
              @click="saveNavState('/qatools/report')"
            >
              <template slot="title">
                <i class="iconfont icon-chaxun" />
                <span class="sider-bar-title">项目统计</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/qatools/livelist"
              route="/qatools/livelist"
              @click="saveNavState('/qatools/livelist')"
            >
              <template slot="title">
                <i class="iconfont icon-chaxun" />
                <span class="sider-bar-title">今日课程</span>
              </template>
            </el-menu-item>
            <el-menu-item
              index="/qatools/liveinfo"
              route="/qatools/liveinfo"
              @click="saveNavState('/qatools/liveinfo')"
            >
              <template slot="title">
                <i class="iconfont icon-chaxun" />
                <span class="sider-bar-title">直播信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="iconfont icon-phone" />
              <span class="sider-bar-title">设备管理</span>
            </template>
            <el-menu-item
              index="/equipmentlist"
              route="/equipmentlist"
              @click="saveNavState('/equipmentlist')"
            >
              <template slot="title">
                <i class="iconfont icon-phone_icon" />
                <span class="sider-bar-title">设备列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="iconfont icon-icon_boss" />
              <span class="sider-bar-title">用户管理</span>
            </template>
            <el-menu-item
              index="/user/list"
              route="/user/list"
              @click="saveNavState('/user/list')"
            >
              <template slot="title">
                <i class="iconfont icon-icon_meeting" />
                <span class="sider-bar-title">用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <!-- <main-top-menu /> -->
        <router-view v-if="isRouterShow" />
        <!-- 修改密码弹框-->
        <el-dialog
          title="修改密码"
          :visible.sync="updatePasword"
          width="50%"
          @close="updatePaswordClose"
        >
          <!-- 内容主体区域-->
          <el-form
            ref="updatePaswordFormRef"
            :model="updatePaswordUser"
            :rules="updatePaswordRulesForm"
            label-width="90px"
          >
            <el-form-item
              label="新密码"
              prop="password"
            >
              <el-input
                v-model="updatePaswordUser.password"
                type="password"
              />
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="set_password"
            >
              <el-input
                v-model="updatePaswordUser.set_password"
                type="password"
              />
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="updatePasword = false">取 消</el-button>
            <el-button
              type="primary"
              @click.native="updatePaswordMethod()"
            >确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterShow: true,
      isCollapse: false,
      activePath: '/casechart',
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
  created() {
    this.loginname.name = window.sessionStorage.getItem('loginName')
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    async reload() {
      this.isRouterShow = false
      await this.$nextTick()
      this.isRouterShow = true
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 退出
    logout() {
      // window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 关闭修改密码弹窗，清空表单
    updatePaswordClose() {
      this.$refs.updatePaswordFormRef.resetFields()
    },
    // 修改密码方法
    updatePaswordMethod() {
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
  // padding-left: 0%;
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
      margin-left: 30px;
      margin-right: 30px;
    }
  }
  .user-avatar {
    position: absolute;
    left: 85%;
  }
  .user-dropdown {
    position: relative;
    width: 130px;
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
.index-main {
  padding: 1px;
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
.sider-bar-title {
  margin-left: 6px;
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
</style>
