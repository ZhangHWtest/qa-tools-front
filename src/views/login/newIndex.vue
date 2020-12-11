<template>
  <div>
    <el-header>
      <div>
        <img src="@/assets/bsy-logo.png">
        <span>BSYQaTools</span>
      </div>
      <div class="header-button">
        <i class="iconfont icon-icon_secret" style="padding:10px" />
        <i class="iconfont icon-github" />
      </div>
    </el-header>
    <el-main class="login-main">
      <div class="login-one">
        <div class="login-div-one">
          <img class="login-img" src="@/assets/images/login-01.png">
        </div>
        <!-- <h2 class="interface-title-style">简介:</h2> -->
        <div class="login-div">
          <div class="login-logo">
            <!-- <img class="login-logo-img-right" src="@/assets/images/meteor-right.png"> -->
            <h1 class="login-logo-title">BSYQaTools</h1>
            <!-- <img class="login-logo-img-left" src="@/assets/images/meteor-left.png"> -->
          </div>
          <h3 class="login-title-des">抱石云 测试工具</h3>
          <span class="login-title-det">为测试人员提供更高效、易用、功能强大的工具平台</span>
          <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                clearable
                prefix-icon="el-icon-user"
                placeholder="用户名"
                @clear="clearLoginForm"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                clearable
                prefix-icon="el-icon-lock"
                placeholder="密码"
                type="password"
                @clear="clearLoginForm"
              />
            </el-form-item>
            <el-form-item>
              <el-button class="login-form-but" type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="login-two">
        <el-row>
          <el-col :span="8" class="login-two-col">
            <div class="login-two-div">
              <i class="iconfont icon-ruanjiankaifabao" />
            </div>
            <h3 class="login-two-h3">接口管理</h3>
            <div class="login-two-span">收录、调试、多人协作、高复用性。</div>
          </el-col>
          <el-col :span="8" class="login-two-col">
            <div class="login-two-div">
              <i class="iconfont icon-icon_yingyongguanli" />
            </div>
            <h3 class="login-two-h3">用例管理</h3>
            <div class="login-two-span">调试、批量运行、依赖运行、定时运行、生成集成报告。</div>
          </el-col>
          <el-col :span="8" class="login-two-col">
            <div class="login-two-div">
              <i class="iconfont icon-chaxun" />
            </div>
            <h3 class="login-two-h3">信息查询</h3>
            <div class="login-two-span">方便、快速、查询出跨表、跨库数据。</div>
          </el-col>
        </el-row>
      </div>
      <div class="login-thr">
        <el-row class="login-thr-row">
          <el-col :span="10" class="login-thr-col-des">
            <h2 class="login-two-h2">数据统计分析</h2>
            <h3 class="login-two-h3">多维度数据分析</h3>
            <p style="color: #9297A3">数据自由刷选自由选择数据</p>
            <p style="color: #9297A3">发掘数据背后的更多秘密</p>
            <p style="color: #9297A3">多图表联动查看对多个图表数据联动查看</p>
            <p style="color: #9297A3">进行多维有效分析</p>
          </el-col>
          <el-col :span="14" class="login-thr-col-img">
            <img class="login-thr-chart-image" src="@/assets/images/login-01.png">
          </el-col>
        </el-row>
        <el-row class="login-thr-row">
          <el-col :span="14" class="login-thr-col-img">
            <img class="login-thr-project-image" src="@/assets/images/login-02.png">
          </el-col>
          <el-col :span="10" class="login-thr-col-des">
            <h2 class="login-two-h2">管理平台</h2>
            <h3 class="login-two-h3">项目管理</h3>
            <p style="color: #9297A3">提供基本的项目分组，项目管理</p>
            <p style="color: #9297A3">接口管理</p>
            <p style="color: #9297A3">让多人协作成倍提升开发效率</p>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer>
      <index-bottom />
    </el-footer>
  </div>
</template>

<script>
import IndexBottom from './components/IndexBottom'
import Cookies from 'js-cookie'
export default {
  components: {
    IndexBottom
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    clearLoginForm() {
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.resetLoginForm()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid);
        const { data: res } = await this.$api.login.login(this.loginForm)
        if (res.code !== 1) {
          return this.$message.error('登录失败！请检查账号信息！')
        }
        window.sessionStorage.setItem('loginName', res.data.user)
        window.sessionStorage.setItem('token', res.data.token)
        Cookies.set('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-main{
  padding: 0 0 0 0;
}
.login-one{
  background-color: #f5f7fc;
  // background-image: url('/Users/zhwtest/VueProjects/apiMonitor/src/assets/images/back-ground.png');
  display: flex;
  align-items: center;
}
.login-two{
  margin: 35px 100px 35px 100px;
  .login-two-div{
    margin: 25px auto;
    width: 90px;
    height: 90px;
    // background-color: #;
    border:#909090 0.1px solid;
    border-radius: 45px;
    text-align: center;
    line-height: 90px;
    >i{
      font-size: 40px;
    }
  }
  .login-two-h3{
    font-family: "Helvetica Neue";
    width: 80px;
    margin: 15px auto;
  }
  .login-two-span{
    width: 180px;
    margin: 0 auto;
    font-family: "Helvetica Neue";
    color: #9297A3;
  }
}
.login-thr{
  background-color: #f5f7fc;
  padding:35px 150px 35px 150px;
  .login-thr-row{
    margin: 35px 0px 35px 0px;
    .login-thr-chart-image {
      height: 350px;
      width: 600px;
    }
    .login-thr-project-image {
      height: 350px;
      width: 600px;
    }
  }
  .login-two-h3{
    font-family: "Helvetica Neue";
  }

}
.login-img{
  width: 640px;
  height: 400px;
  border:#909090 0.1px solid;
  border-radius: 5px;
  box-shadow: 3px 5px 10px rgba(0,0,0,0.43)
}
.interface-title-style {
  border-left: 3px solid #2395f1;
  font-family: "Helvetica Neue";
  color:#333743;
}
.login-div-one{
  height: 450px;
  margin: 45px 50px 0 160px;
}
.login-div{
  height: 400px;
  width: 350px;
  position: relative;
  margin: 55px 160px 15px 50px;
  .login-logo{
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .login-logo-img-right{
      width: 59px;
      height: 6px;
      margin-right: 20px;
    }
    .login-logo-img-left{
      width: 59px;
      height: 6px;
      margin-left: 20px;
    }
    .login-logo-img{
      width: 35px;
      height: 25px;
      margin-right: 15px;
      padding-right: 10px;
    }
    .login-logo-title{
       margin: 0 0 0 0;
    }
  }
  .login-title{
    font-family: "Helvetica Neue";
    color:#333743;
    margin: 10px 0 10px 0;
  }
  .login-title-des{
    font-family: "Helvetica Neue";
    color: #333743;
    margin: 10px 0 10px 0;
  }
  .login-title-det{
    font-family: "Helvetica Neue";
    color: #9297A3;
    margin: 10px 0 10px 0;
  }
  .login-form{
    margin-top: 15px;
    .login-form-but{
      width: 100%;
    }
  }
}

.el-header {
  height: 50px !important;
  background-color:#283443;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #ffffff;
  > div {
    display: flex;
    align-items: center;
    margin-right: 25px;
    img {
      width: 120px;
      height: 100%;
      margin-left: 40px;
      margin-right: 10px;
    }
    span {
      font-family: "Helvetica Neue";
      font-size: 30px;
      padding-left: 10px;
      border-left: 0.1px solid #ffffff;
    }
  }
}
.login_box {
  z-index: 998;
  width: 350px;
  height: 300px;
  background: rgba(0, 0, 0, 0.3) none repeat scroll !important;
  /* rgba(0, 0, 0, 0.2) 前三个确定颜色，最后0.2确定透明度 */
  /*实现FireFox背景透明，文字不透明*/
  background: #ffffff;
  filter: Alpha(opacity=20);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -75%);
  .login_title {
    font-family:  "Helvetica Neue";
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10%);
    font-size: 45px;
    color: #fff;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.el-footer {
  padding: 0 0;
}
</style>
